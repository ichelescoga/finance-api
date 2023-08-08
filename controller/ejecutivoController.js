const ejecutivo = require("../services/ejecutivoService");

exports.createEjecutivo = async (req, res, next) => {
    try {
  
      let params = {
        idEntFinanciera: req.body.idEntFinanciera,
        primerNombre: req.body.primerNombre,
        segundoNombre: req.body.segundoNombre,
        otrosNombres: req.body.otrosNombres,
        primerApellido: req.body.primerApellido,
        codigoPostal: req.body.segundoApellido,
        apellidoCasada: req.body.apellidoCasada,
        nit: req.body.nit,
        dpi: req.body.dpi,
        telefono: req.body.telefono,
        correo: req.body.correo,
        foto: req.body.foto,
        idPlanFinanciero: req.body.idPlanFinanciero,
        idPuesto: req.body.idPuesto,
      };

      let ejecutivoData = await ejecutivo.createEjecutivo(params);
      res.status(200).json({
        succes: true,
        message: "Ejecutivo creado con exito",
        body: ejecutivoData
      });
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear Ejecutivo, intentelo de nuevo",
      });
    }
  };



exports.listEjecutivos = async (req, res, next) => {
  try {
      let results = await ejecutivo.findEjecutivos();
      const longitud = results.length;
  
      if (longitud >= 1) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay Ejecutivos Registrados",
        });
      }
    } catch (error) {
      next(error);
    }
};