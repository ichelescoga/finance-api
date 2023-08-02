const proyectoService = require("../services/proyectoService");

exports.createProyecto = async (req, res, next) => {
    try {
  
      let params = {
        id: req.body.idProyecto,
        nombreProyecto : req.body.nombreProyecto,
        idEmpresa : req.body.idEmpresa,
        idPais: req.body.idPais,
        idDepartamento: req.body.idDepartamento,
        idMunicipio:req.body.idMunicipio,
        direccion: req.body.direccion,
        coordenadas: req.body.coordenadas,
        idTipoProyecto: req.body.idTipoProyecto,
      };

  
      await proyectoService.createProyecto(params);
      res.status(200).json({
        succes: true,
        message: "Proyecto Creado con Exito",
      });
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear Proyecto, intentelo de nuevo",
      });
    }
  };