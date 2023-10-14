const descService = require("../services/descuentoService");
const cotizaciones = require("../services/cotizacionesService");
const accountServic = require("../services/accountService");
const moment = require('moment')
// const cotizacionServi = require("../services/cotizacionesService");
// const clienteService = require("../services/clienteService");

exports.createTemporadaDesc = async (req, res, next) => {
  try {
    let params = {
      nombreTemporada: req.body.nombreTemporada,
      fechaInicial: req.body.fechaInicial,
      fechaFinal: req.body.fechaFinal,
      status: req.body.status,
    };

    let temporadaDesc = await descService.creteTemporadaDescuento(params);
    res.status(200).json({
      succes: true,
      message: "Temporada descuento Creada con Exito",
      temporada: temporadaDesc
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear temporada descuento, intentelo de nuevo",
    });
  }
};

exports.createConfigDesc = async (req, res, next) => {
  try {
    let params = {
      idTemporadDesc: req.body.idTemporadDesc,
      idProyecto: req.body.idProyecto,
      meses: req.body.meses,
      porcentaje: req.body.porcentaje,
    };

    let configDesc = await descService.createConfiguracionDesc(params);
    res.status(200).json({
      succes: true,
      message: "Configuracion descuento Creado con Exito",
      temporada: configDesc
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear configuracion descuento, intentelo de nuevo",
    });
  }
};



exports.findDescuentoProyect = async (req, res, next) => {
  try {
    let results = await descService.findDescuentosProyect(req.params.id);
    if (results) {
      res.json(results);
    } else {
      res.status(202).json({
        success: true,
        message: "No hay descuentos disponibles para este proyecto",
      });
    }
  } catch (error) {
    next(error);
  }
};


exports.findAprobDesc = async (req, res, next) => {
  try {
    let results = await descService.findAprodescuento();
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(202).json({
        success: true,
        message: "No hay solicitudes de descuento para aprobar",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.denegarSolicitudDescuento = async (req, res, next) => {
  try {
    let cotizacionUpdate = await descService.denegarSolicitudDesc(req.params.id);
    if (cotizacionUpdate) {
      res.status(200).json({
        succes: true,
        message: "Solicitud descuento denegado con exito",
        cotizacionAct: cotizacionUpdate
      });
    } else {
      res.status(404).json({
        succes: true,
        message: "Numero de cotizacion no existente",
      });
    }

  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
  }
};

exports.aprobacionDescuento = async (req, res, next) => {
  try {

    let results = await cotizaciones.findOneCotizacionpdf(req.params.id);

    if (results.Monto_descuento_soli > 0 && results.Solicitud_descuento == 0) {
      let porcentajeDescuento = parseFloat(results.Monto_descuento_soli);
      let valorTotal = parseFloat(results.Venta_descuento);
      let descuentFinal = (porcentajeDescuento / 100) * valorTotal;
      let nuevoValorTotal = valorTotal - descuentFinal

      let paramsDescuento = {
        descuento: descuentFinal,
        totalDescuento: nuevoValorTotal,
        idCotizacion : req.params.id,
        solicitudDescuento: 1,
        estadoDescuento: 1,
      }

      let actulizacionValues = await cotizaciones.updateDescuento(paramsDescuento);

      res.status(200).json({
        succes: true,
        message: "Descuento Actulizado con exito",
        body: actulizacionValues
      });
    } else {
      let descuento = await cotizaciones.descuentoCotizacion(req.params.id)
      if (descuento) {
        const fechaActual = moment();
        const objetosFiltrados = descuento.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_proyecto_PROYECTO.CONFIGURACION_DESCUENTOs.filter(objeto => {
          return fechaActual.isBetween(objeto.Id_temporada_descuento_TEMPORADA_DESCUENTO.Fecha_incial, objeto.Id_temporada_descuento_TEMPORADA_DESCUENTO.Fecha_final, null, '[]'); // [] incluye los límites
        });

        if (objetosFiltrados.length > 0) {
          let descuentoPreAprob = parseFloat(objetosFiltrados[0].Porcentaje);
          let valorTotal = parseFloat(results.Venta_descuento);
          let descuentFinal = (descuentoPreAprob / 100) * valorTotal;
          let nuevoValorTotal = valorTotal - descuentFinal

          let paramsDescuento = {
            descuento: descuentFinal,
            totalDescuento: nuevoValorTotal,
            idCotizacion : req.params.id,
            solicitudDescuento: 1,
            estadoDescuento: 1,
          }

          let actulizacionValues = await cotizaciones.updateDescuento(paramsDescuento);

          res.status(200).json({
            succes: true,
            message: "Solicitud descuento Actulizado con exito",
            body: actulizacionValues
          });
        } else {
          let notDescuento = await descService.aprobacionSolicitudDescuento(req.params.id);
          res.status(200).json({
            succes: true,
            message: "No hay Descuentos para aplicar en estas Fechas",
            data: notDescuento
          });
        }
        
      } else {
        let notDescuento = await descService.aprobacionSolicitudDescuento(req.params.id);
        res.status(200).json({
          succes: true,
          message: "No hay Descuentos para aplicar en estas Fechas",
          data: notDescuento
        });
      }
    }
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
  }
};




exports.finSolicitudDescuentos = async (req, res, next) => {
  try {
    let params = {
      state: req.params.id,
      // proyecto: req.params.idProyecto
    }
    let results = await descService.findEstadoSolicitudDes(params);
    if (results) {
      res.json(results);
    } else {
      res.status(202).json({
        success: true,
        message: "No hay estados cotizaciones con el estado de solicitud de descuento",
      });
    }
  } catch (error) {
    next(error);
  }
};