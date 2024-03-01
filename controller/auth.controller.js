const UserService = require("../services/userService");

const security = require("../src/utils/security");


const crypto = require("crypto");
var secret_key = process.env.SECRET_KEY;
const iv = new Buffer(16);
iv.fill(0);
const algorithm = process.env.ALGORITHM;

// reusable function to decrypt
function decrypt(text) {
  let decipher = crypto.createDecipheriv(algorithm, secret_key, iv);
  let dec = decipher.update(text, "base64", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

exports.encript = async (req, res, next) => {
  try {
    const text = req.body.password;
    var cipher = crypto.createCipheriv(algorithm, secret_key, iv);
    var crypted = cipher.update(text, "utf8", "base64");
    crypted += cipher.final("base64");
    res.json(crypted);
  } catch (error) {
    console.log(error);
  }
};



// Controllers for login
exports.signIn = async (req, res, next) => {
  try {
    let userCredential = {};
    userCredential.email = req.body.email.toString().toLowerCase();
    userCredential.password = req.body.password;

    let results = await UserService.listlogin(userCredential);
    if (results == null || results == undefined) {
      res.status(400).json({
        success: false,
        message: "Incorrect username and/or password.",
        errorType: 1,
      });
    } else if (results == "HourLimit") {
      res.status(300).json({
        success: false,
        message:
          "A password change request was received, the code to log in has expired, request another one to log in.",
      });
    } else {
      let resultsUser = await UserService.listUser(userCredential);
      let usuarioLog = resultsUser.USER_PROFILEs.length > 0 ? resultsUser.USER_PROFILEs[0] : null;

      if(usuarioLog == null) return res.status(404).json("User not has role assigned");
      const idRole = usuarioLog["dataValues"].Id_rol;

      const actualDate = new Date();
      const resetPasswordDate = resultsUser.reset_password;
      const needUpdatePassword = actualDate >= resetPasswordDate;
      
      if( idRole == 3 ) {

        const email = resultsUser["dataValues"].Correo;
        const name = resultsUser["dataValues"].Nombre;
        //TODO:  ID USER PROFILE IS NEEDED
        let accessTokenClient = await security.genericToken({
          email,
          name,
          roleId: idRole,
        });
        
        return res.status(200).json({
          success: true,
          token: accessTokenClient,
          roleId: idRole,
          email,
          name,
          needUpdatePassword,
          idUserProfile: usuarioLog["Id_user_profile"]
        })
      }

      let usuarioLog1 = usuarioLog.Id_empleado_EMPLEADO_ASESOR.EMPLEADO_EMPRESAs.length > 0 ? usuarioLog.Id_empleado_EMPLEADO_ASESOR.EMPLEADO_EMPRESAs[0] : null;
      let proyectoId = usuarioLog1 ? await UserService.findProyectoEmpresa(usuarioLog1.Id_empresa) : null;
      let acccesToken = await security.generateToken({
        user: resultsUser,
        project: proyectoId,
      });


      const user = resultsUser.dataValues;
      delete user.reset_password;

      res.json({
        message: "Successful authentication.",
        token: acccesToken,
        usuario: { needUpdatePassword, ...user, },
        proyecto: proyectoId,
      });
    }
  } catch (error) {
    console.log("error, createUserClientProfile ", error);
    res.status(400).json({
      success: false,
      error: "Incorrect parameters.",
      errorType: 2,
    });
  }
};