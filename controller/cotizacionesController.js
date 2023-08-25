const cotizaciones = require("../services/cotizacionesService");
const security = require("../src/utils/security");
const UserService = require("../services/userService");
const clienteService = require("../services/clienteService");
const moment = require('moment')

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



exports.listaCotizacionesCotizaRechazada = async (req, res, next) => {
  try {
      let results = await cotizaciones.listCotizCotizadasRechazada();
      const longitud = results.length;
  
      if (longitud >= 1) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay cotizaciones Registradas",
        });
      }
    } catch (error) {
      next(error);
    }
};

exports.listCotizEjecAprovadoReservado = async (req, res, next) => {
  try {
    let nonce = req.headers["authorization"];
    let resultsToken = await security.decodeToken(nonce);
    let findUser = await UserService.getUserByEmailSinPasswordBackend(resultsToken.email);
    if (findUser) {
      let params = {
        idEmpleadoAsesor: findUser.USER_PROFILEs[0].Id_empleado_EMPLEADO_ASESOR.ASESOR_DETALLEs[0].Id_detalle_asesor ? findUser.USER_PROFILEs[0].Id_empleado_EMPLEADO_ASESOR.ASESOR_DETALLEs[0].Id_detalle_asesor : null,
      };
      
        let results = await cotizaciones.listCotizAprovadoReservado(params);
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay cotizaciones Aprovadas o Reservadas",
          });
        }
      
    } else {
      res.status(202).json({
        success: true,
        message: "Perfil no valido para esta opcion",
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
    let findUser = await UserService.getUserByEmailSinPasswordBackend(resultsToken.email);
    if (findUser) {
      let params = {
        idUnidad : req.params.id,
        idEmpleadoAsesor: findUser.USER_PROFILEs[0].Id_empleado_EMPLEADO_ASESOR.ASESOR_DETALLEs[0].Id_detalle_asesor ? findUser.USER_PROFILEs[0].Id_empleado_EMPLEADO_ASESOR.ASESOR_DETALLEs[0].Id_detalle_asesor : null,
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
      
    } else {
      res.status(202).json({
        success: true,
        message: "Perfil no valido para esta opcion",
      });
    }

    } catch (error) {
      next(error);
    }
};


exports.creatCotizacion = async (req, res, next) => {
  let nonce = req.headers["authorization"];
  let resultsToken = await security.decodeToken(nonce);
  let findUser = await UserService.getUserByEmailSinPasswordBackend(resultsToken.email);
  let fechaActual = new Date()
  if (findUser) {
    try {


      let paramsCliente = {
        primerNombre: req.body.cliente.primerNombre,
        segundoNombre: req.body.cliente.segundoNombre,
        otrosNombres: req.body.cliente.otrosNombres,
        primerApellido: req.body.cliente.primerApellido,
        segundoApellido: req.body.cliente.segundoApellido,
        apellidoCasada: req.body.cliente.apellidoCasada,
        estadoCivil: req.body.cliente.estadoCivil,
        idGenero : req.body.cliente.idGenero,
        fechaNacimiento: req.body.cliente.fechaNacimiento,
        oficio: req.body.cliente.oficio,
        nivelEstudio: req.body.cliente.nivelEstudio,
        direccionResidencia : req.body.cliente.direccionResidencia,
        telefonoResidencia: req.body.cliente.telefonoResidencia,
        lugarTrabajo: req.body.cliente.lugarTrabajo,
        direccionTrabajo: req.body.cliente.direccionTrabajo,
        telefonoTrabajo : req.body.cliente.telefonoTrabajo,
        nit: req.body.cliente.nit,
        dpi: req.body.cliente.dpi,
        telefono: req.body.cliente.telefono,
        correo: req.body.cliente.correo,
        idNacionalidad: req.body.cliente.idNacionalidad,
      } 
  
      let clienteId = await clienteService.createCliente(paramsCliente);
  
      let params = {
        idDetalleAsesor : findUser.USER_PROFILEs[0].Id_empleado_EMPLEADO_ASESOR.ASESOR_DETALLEs[0].Id_detalle_asesor ? findUser.USER_PROFILEs[0].Id_empleado_EMPLEADO_ASESOR.ASESOR_DETALLEs[0].Id_detalle_asesor : null,
        idEstado: 1,
        idPlanFinanciero: req.body.idPlanFinanciero,
        idCliente: clienteId.Id_cliente,
        fecha : moment(fechaActual).format("YYYY/MM/DD"),
        fechaHora:  moment(fechaActual).format("YYYY/MM/DD hh:mm:ss"),
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
        urlCotizacion: req.body.urlCotizacion,
        comentario: req.body.comentario
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
  } else {
    res.status(404).json({
      succes: true,
      message: "Verifica tu Rol no puedes crear una cotizacion",
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

exports.updateCotizacionEstado = async (req, res, next) => {
  try {

    let params = {
      id: req.params.id,
      idEstado: 3,
    };


    let cotizacionUpdate  =  await cotizaciones.updateCotizacionVendida(params);
    if (cotizacionUpdate) {
      res.status(200).json({
        succes: true,
        message: "Venta realizada con exito",
        body: cotizacionUpdate
      });
    } else {
      res.status(404).json({
        succes: true,
        message: "Unidad ya vendida",
      });
    }
    
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
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
      urlCotizacion: req.body.urlCotizacion,
      comentario: req.body.comentario
    };


    let cotizacionUpdate  =  await cotizaciones.updateCotizacion(params);
    if (cotizacionUpdate) {
      res.status(200).json({
        succes: true,
        message: "Cotizacion actualizado con exito",
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