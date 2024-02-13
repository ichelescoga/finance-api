const intereseService = require("../services/interesesService");

exports.listPorcentajesInteres = async (req, res, next) => {
    try {
      let results = await intereseService.findPorcentajesInterese(req.params.id);
      const longitud = results.length;
  
      if (longitud >= 1) {
        res.status(200).json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay Detalles de porcentaje de Intereses para este proyecto Registradas",
        });
      }
    } catch (error) {
      console.log("EROROR 🤖🤖", error)
      next(error);
    }
  };

  exports.createDetallePorcentajeInteres = async (req, res, next) => {
    try {
  
      let params = {
        fechaInicial: req.body.fechaInicial,
        fechaFinal: req.body.fechaFinal,
        idProyecto: req.body.idProyecto,
        status: 1,
        porcentaje: req.body.porcentaje,
      };
  
      let reservaDetalle = await intereseService.createDetallInteres(params);
      res.status(200).json({
        succes: true,
        message: "Detalle porcentaje Interes Creado con Exito",
        data: reservaDetalle
      });
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear Detalle porcentaje Interes, intentelo de nuevo",
      });
    }
  };



  exports.updatePorcentajeInteres = async (req, res, next) => {
    try {
  
      let params = {
        idDetallePorcentajeInteres: req.params.id,
        fechaInicial: req.body.fechaInicial,
        fechaFinal: req.body.fechaFinal,
        idProyecto: req.body.idProyecto,
        status: req.body.status,
        porcentaje: req.body.porcentaje,
      };
  
  
      let actualizacionPorcentajeInteres = await intereseService.updatePorcentajeInteres(params);
  
      if (actualizacionPorcentajeInteres) {
        res.status(200).json({
          succes: true,
          message: "Detalle porcentaje Interes actualizado con exito",
          body: actualizacionPorcentajeInteres
        });
      } else {
        res.status(404).json({
          succes: true,
          message: "Detalle porcentaje Interes",
        });
      }
  
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: error,
      });
    }
  };