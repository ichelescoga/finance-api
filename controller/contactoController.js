const contactoService = require("../services/contactoService");
const clienteService = require("../services/clienteService");
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



  exports.revicionCredenciales  = async (req, res, next) => {
    try {
      const authorizationHeader = req.headers.authorization
      const valuesFromToken = await security.decodeToken(authorizationHeader)
      let params = {
        telefono: req.body.telefono,
        correo: req.body.correo,
        nombre: req.body.nombre,
        userInfo: valuesFromToken
      };

      let contacto = await contactoService.revisionCredenciales(params);
      if (contacto) {
        res.status(200).json({
          success: true,
          message: "Credenciales ya existentes",
          body: contacto,
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Credenciales no existentes",
        });
      }
        
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear contacto, intentelo de nuevo",
      });
    }
  };





  exports.createClienteController  = async (req, res, next) => {
    try {

      let paramsCliente = {
        primerNombre: req.body.primerNombre,
        segundoNombre: req.body.segundoNombre,
        otrosNombres: req.body.otrosNombres,
        primerApellido: req.body.primerApellido,
        segundoApellido: req.body.segundoApellido,
        apellidoCasada: req.body.apellidoCasada,
        estadoCivil: req.body.estadoCivil,
        idGenero : req.body.idGenero,
        fechaNacimiento: req.body.fechaNacimiento,
        oficio: req.body.oficio,
        nivelEstudio: req.body.nivelEstudio,
        direccionResidencia : req.body.direccionResidencia,
        telefonoResidencia: req.body.telefonoResidencia,
        lugarTrabajo: req.body.lugarTrabajo,
        direccionTrabajo: req.body.direccionTrabajo,
        telefonoTrabajo : req.body.telefonoTrabajo,
        nit: req.body.nit,
        dpi: req.body.dpi,
        telefono: req.body.telefono,
        correo: req.body.correo,
        idNacionalidad: req.body.idNacionalidad,
      } 
    
      let clienteId = await clienteService.createCliente(paramsCliente);

      res.status(200).json({
        succes: true,
        message: "Cliente creado con exito",
        body: clienteId
      });
        
        
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear cliente, intentelo de nuevo",
      });
    }
  };



  exports.finClientByKeyword = async (req, res, next) => {
    try {
      const searchKeyword = req.query.searchKeyword;
      console.log("searchKeyword searchKeyword searchKeyword", searchKeyword);

      if(!searchKeyword) return res.status(404).json({ success: false, message: "Keyword is required" });

      const result = await contactoService.findClientByPhoneEmailNameKeywords(searchKeyword)
      console.log(result);
      res.status(200).json({
        success: true,
        result
      })

    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Something went wrong"
      })
    }
  }

  exports.coincidenciasEmaiTelCorreo  = async (req, res, next) => {
    try {
      let correoBody = req.body.correo.length
      let nombreBody = req.body.nombre.length

      if (nombreBody > 0) {

      let coincidencias =  await contactoService.coincidenciasNombre(req.body.nombre);
      // let coincidenciasclinte =  await contactoService.coincidenciasNombreCliete(req.body.nombre);
      res.status(200).json({
        succes: true,
        bodyContactos: coincidencias,
        // bodyClientes: coincidenciasclinte,
      });

      } else if(correoBody > 0) {
        
      let coincidencias =  await contactoService.coincidenciasCorreo(req.body.correo);
      res.status(200).json({
        succes: true,
        body: coincidencias,
      });

      } else if (req.body.telefono > 0) {
        let coincidencias =  await contactoService.coincidenciasTelefono(req.body.telefono);
        res.status(200).json({
          succes: true,
          body: coincidencias,
        });
      }else  {
        res.status(406).json({
          succes: true,
          message: "Necesitas un parametro valido",
        });
      }
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas vuelva a intentarlo",
      });
    }
  };