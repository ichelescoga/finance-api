const cotizaciones = require("../services/cotizacionesService");
const security = require("../src/utils/security");
const UserService = require("../services/userService");
exports.listCotizaciones = async (req, res, next) => {
  try {
      let results = await cotizaciones.listaCotizaciones();
      const longitud = results.length;
  
      if (longitud >= 1) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay cotizaciones Registrados",
        });
      }
    } catch (error) {
      next(error);
    }
};

exports.listCotizacionUnidad = async (req, res, next) => {
  try {
    let nonce = req.headers["authorization"];
    let resultsToken = await security.decodeToken(nonce);
    let findUser = await UserService.getUserByEmailSinPassword(resultsToken.email);

    let params = {
      idUnidad : req.params.id,
      idEmpleadoAsesor: findUser[0].EMPLEADO_ASESORs[0].Id_empleado ? findUser[0].EMPLEADO_ASESORs[0].Id_empleado : null,
    };
    
      let results = await cotizaciones.finCotizacionUnidad(params);
      const longitud = results.length;
  
      if (longitud >= 1) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay cotizaciones para esta Unidad",
        });
      }
    } catch (error) {
      next(error);
    }
};


exports.creatCotizacion = async (req, res, next) => {
  try {

    let params = {
      idDetalleAsesor : req.body.idDetalleAsesor,
      idEstado: req.body.idEstado,
      idPlanFinanciero: req.body.idPlanFinanciero,
      idCliente: req.body.idCliente,
      fecha : req.body.fecha,
      fechaHora: req.body.fechaHora,
      ingresoMensual: req.body.ingresoMensual,
      enganche: req.body.enganche,
      mesesPlazo : req.body.mesesPlazo,
      mesInicio: req.body.mesInicio,
      anioInicio: req.body.anioInicio,
      mesFin: req.body.mesFin,
      anioFin : req.body.anioFin,
      descuento: req.body.descuento,
      ventaDescuento: req.body.ventaDescuento,
      precioContado: req.body.precioContado,
      aguinaldo : req.body.aguinaldo,
      bonoCatorce: req.body.bonoCatorce,
    };


    let cotizacion = await cotizaciones.creatCotizacion(params);
    let paramscotizacion_Unidad = {
      idCotizacion : cotizacion.Id_cotizacion,
      idUnidad: req.body.idUnidad
    };

    await cotizaciones.createCotizacion_Unidad(paramscotizacion_Unidad)
    res.status(200).json({
      succes: true,
      message: "Cotizacion Creada cont exito",
      idCotizacion: cotizacion.Id_cotizacion
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
  }
};


exports.findOneCotizacion = async (req, res, next) => {
  try {
      let results = await cotizaciones.findOneCotizacion(req.params.id);
      if (results) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "Cotizacion no existente",
        });
      }
    } catch (error) {
      next(error);
    }
};

exports.updateCotizacion = async (req, res, next) => {
  try {

    let params = {
      id: req.params.id,
      idDetalleAsesor : req.body.idDetalleAsesor,
      idEstado: req.body.idEstado,
      idPlanFinanciero: req.body.idPlanFinanciero,
      idCliente: req.body.idCliente,
      fecha : req.body.fecha,
      fechaHora: req.body.fechaHora,
      ingresoMensual: req.body.ingresoMensual,
      enganche: req.body.enganche,
      mesesPlazo : req.body.mesesPlazo,
      mesInicio: req.body.mesInicio,
      anioInicio: req.body.anioInicio,
      mesFin: req.body.mesFin,
      anioFin : req.body.anioFin,
      descuento: req.body.descuento,
      ventaDescuento: req.body.ventaDescuento,
      precioContado: req.body.precioContado,
      aguinaldo : req.body.aguinaldo,
      bonoCatorce: req.body.bonoCatorce,
    };


    let cotizacionUpdate  =  await cotizaciones.updateCotizacion(params);
    if (cotizacionUpdate) {
      res.status(200).json({
        succes: true,
        message: "Cotizacion actualiza con exito",
        body: cotizacionUpdate
      });
    } else {
      res.status(404).json({
        succes: true,
        message: "Cotizacion No existente",
      });
    }
    
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
  }
};