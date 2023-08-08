const UserService = require("../services/userService");
const security = require("../src/utils/security");

exports.createUser = async (req, res, next) => {
    try {
  
      let params = {
        email : req.body.email,
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
    console.log(results.email);
    let findUser = await UserService.getUserByEmailSinPassword(results.email);
    res.status(202).json({
      success: true,
      body: findUser,
    });
  
    } catch (error) {
      next(error);
    }
};

