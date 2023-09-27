const contactoService = require("../services/contactoService");


exports.createContact = async (req, res, next) => {
  try {
    let params = {
      idProyecto: req.body.idProyecto,
      state: req.body.state,
      nombreCompleto: req.body.nombreCompleto,
      telefono: req.body.telefono,
      correo: req.body.correo,
      direccion: req.body.direccion,
    };

    await contactoService.createContacto(params);
    res.status(200).json({
      succes: true,
      message: "Contacto Creado con Exito",
    });
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