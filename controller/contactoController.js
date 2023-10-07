const contactoService = require("../services/contactoService");
const security = require("../src/utils/security");
const UserService = require("../services/userService");

exports.createContact = async (req, res, next) => {
  try {
    let nonce = req.headers["authorization"];
    let resultsToken = await security.decodeToken(nonce);
    let findUser = await UserService.getUserByEmailWithoutPassword(resultsToken.email);
    if (findUser.USER_PROFILEs.length > 0) {
      
      let params = {
        idProyecto: req.body.idProyecto,
        state: req.body.state,
        nombreCompleto: req.body.nombreCompleto,
        telefono: req.body.telefono,
        correo: req.body.correo,
        direccion: req.body.direccion,
        userProfile: findUser.USER_PROFILEs[0].Id_user_profile
      };
  
      await contactoService.createContacto(params);
      res.status(200).json({
        succes: true,
        message: "Contacto Creado con Exito",
      });
    }else{
      res.status(200).json({
        succes: true,
        message: "A ocurrido un problema verifica tu usuario",
        body: findUser
      });
    }

    
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear contacto, intentelo de nuevo",
    });
  }
};



  exports.findContacts = async (req, res, next) => {
    try {
        let results = await contactoService.findContactos(req.params.id);
        if (results) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay contactos existentes para este proyecto",
          });
        }
      } catch (error) {
        next(error);
      }
  };



exports.updateContacto = async (req, res, next) => {
    try {

      let params = {
        idContacto: req.params.id,
        idProyecto: req.params.idProyecto,
        nombreCompleto: req.body.nombreCompleto,
        telefono: req.body.telefono,
        correo: req.body.correo,
        direccion: req.body.direccion
      };
  
  
      let cotizacionUpdate  =  await contactoService.updateContacto(params);

      if (cotizacionUpdate) {
        res.status(200).json({
          succes: true,
          message: "Contacto actualizado con exito",
          body: cotizacionUpdate
        });
      } else {
        res.status(404).json({
          succes: true,
          message: "Contacto No existente",
        });
      }
      
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: error,
      });
    }
  };



  exports.updateContactoState = async (req, res, next) => {
    try {

      let params = {
        idContacto: req.params.id,
        state: req.body.state,
      };
  
  
      let cotizacionUpdate  =  await contactoService.updateContactoState(params);

      if (cotizacionUpdate) {
        res.status(200).json({
          succes: true,
          message: "Estado del contacto actualizado con exito",
          body: cotizacionUpdate
        });
      } else {
        res.status(404).json({
          succes: true,
          message: "Contacto No existente",
        });
      }
      
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: error,
      });
    }
  };