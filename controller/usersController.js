const UserService = require("../services/userService");
const security = require("../src/utils/security");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res, next) => {
    try {
  
      let params = {
        email : req.body.email.toString().toLowerCase(),
        password: req.body.password,
        nombre: req.body.nombre
      };

      await UserService.create(params);
      res.status(200).json({
        succes: true,
        message: "Usuario Creado con exito",
      });
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear usuario, intentelo de nuevo",
      });
    }
  };


exports.UserToken = async (req, res, next) => {
  try {
    let nonce = req.headers["authorization"];
    let results = await security.decodeToken(nonce);
    let findUser = await UserService.getUserByEmailSinPassword(results.email);
    res.status(202).json({
      success: true,
      body: findUser,
    });
  
    } catch (error) {
      next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const params = {
      oldPassword: req.body.oldPassword,
      newPassword: req.body.newPassword,
      email: req.body.email
    }

    if(params.oldPassword == params.newPassword) {
      return res.status(400)
              .json({
                message: "New password should not be the same as old password", //PLEASE DON'T CHANGE, FRONTEND IS VALIDATE TEXT
                success: false
              })}

    const user = await UserService.userLogin(params.email, params.oldPassword)
    
    if(user == null) {
     return res.status(403).json({
        message: "email or password invalid", //PLEASE DON'T CHANGE, FRONTEND IS VALIDATE TEXT
        success: false
      })
    }
    
    const encryptedPassword = await bcrypt.hash(params.newPassword, 10);
    const userId = user.dataValues.Id_user;
    const result = await UserService.resetPassword(userId, encryptedPassword)
    
    if(!result){
      return res.status(400).json({
        message: "Something went wrong updated user",
        success: false
      })
    }

    res.status(200).json({
      message: "User updated successfully",
      success: true
    });

  } catch (error) {
    console.log('error error 🤖', error)
    res.status(500).json({
      message: "Error updating user",
      success: false
    })
    
  }
}

