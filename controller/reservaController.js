const reservaService = require("../services/reservaService");
const moment = require('moment')
// const cotizaciones = require("../services/cotizacionesService");
exports.valorTotalReserva = async (req, res, next) => {
  try {
    let descuento = await reservaService.findOneProyectoDetallePorcentajeReserva(req.params.id)
    if (descuento) {
      const fechaActual = moment();
      const objetosFiltrados = descuento.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_proyecto_PROYECTO.DETALLE_PORCENTAJE_RESERVAs.filter(objeto => {
        return fechaActual.isBetween(objeto.Fecha_inicial, objeto.Fecha_final, null, '[]'); // [] incluye los límites

      });

      if (objetosFiltrados.length > 0) {
        let porcentajeReserva = parseFloat(objetosFiltrados[0].Porcentaje);
        let valorTotal = parseFloat(descuento.Venta_descuento);
        let valorTotalReserva = (porcentajeReserva / 100) * valorTotal;

        res.status(202).json({
          success: true,
          message: "La cantidad para reservar es",
          data: valorTotalReserva,
        });
      } else {
        res.status(202).json({
          success: true,
          message: "Puede reservar sin ningun costo",
        });
      }
    } else {
      res.status(202).json({
        success: true,
        message: "A ocurrido un problema, intentalo de nuevo",
      });
    }
  } catch (error) {
    next(error);
  }
};





exports.createDetallePorcentajeReserva = async (req, res, next) => {
  try {

    let params = {
      fechaInicial: req.body.fechaInicial,
      fechaFinal: req.body.fechaFinal,
      idProyecto: req.body.idProyecto,
      status: 1,
      porcentaje: req.body.porcentaje,
    };

    let reservaDetalle = await reservaService.createDetallReserva(params);
    res.status(200).json({
      succes: true,
      message: "Detalle porcentaje Reserva Creada con Exito",
      data: reservaDetalle
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Detalle porcentaje Reserva, intentelo de nuevo",
    });
  }
};


exports.updatePorcentajeReserva = async (req, res, next) => {
  try {

    let params = {
      idDetallePorcentajeReserva: req.params.id,
      fechaInicial: req.body.fechaInicial,
      fechaFinal: req.body.fechaFinal,
      idProyecto: req.body.idProyecto,
      status: req.body.status,
      porcentaje: req.body.porcentaje,
    };


    let actualizacionPorcentajeReserva = await reservaService.updatePorcentajeReserva(params);

    if (actualizacionPorcentajeReserva) {
      res.status(200).json({
        succes: true,
        message: "Detalle porcentaje Reserva actualizado con exito",
        body: actualizacionPorcentajeReserva
      });
    } else {
      res.status(404).json({
        succes: true,
        message: "Detalle porcentaje Reserva",
      });
    }

  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
  }
};

exports.listPorcentajesReserva = async (req, res, next) => {
  try {
    let results = await reservaService.findPorcentajesReserva(req.params.id);
    const longitud = results.length;

    if (longitud >= 1) {
      res.json(results);
    } else {
      res.status(202).json({
        success: true,
        message: "No hay Detalles de porcentaje de reserva para este proyecto Registradas",
      });
    }
  } catch (error) {
    next(error);
  }
};



exports.createReserva = async (req, res, next) => {
  try {
    let cotizacion = await reservaService.findOneCotizacion(req.params.id);

    if (cotizacion) {
      let cuentaCorriente = await reservaService.findCuentaCorriente(req.params.id);

      if (cuentaCorriente.length > 0) {
        
       
        

        const fechaFormateada = moment().format('YYYY-MM-DD');

        let cuotaReserva = await reservaService.findOneProyectoDetallePorcentajeReserva(req.params.id)

        if (cuotaReserva) {
          const fechaActual = moment();
          const objetosFiltrados = cuotaReserva.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_proyecto_PROYECTO.DETALLE_PORCENTAJE_RESERVAs.filter(objeto => {
            return fechaActual.isBetween(objeto.Fecha_inicial, objeto.Fecha_final, null, '[]'); // [] incluye los límites

          });

          if (objetosFiltrados.length > 0) {
            let porcentajeReserva = parseFloat(objetosFiltrados[0].Porcentaje);
            let valorTotal = parseFloat(cuotaReserva.Venta_descuento);
            let valorTotalReserva = (porcentajeReserva / 100) * valorTotal;



            let paramsPagoReserva = {
              idCuentaCorriente: cuentaCorriente[0].CUENTA_CORRIENTEs[0].Id_cuenta_corriente,
              fecha: fechaFormateada,
              monto: valorTotalReserva,
              saldo: 0,
              interes: 0,
              fechaLimitePago: fechaFormateada,
              pago: 0,
              referencia: null,
              idTipoPago: 1,
              idStatusTransaccion: 1,
              idStatusPago: 1,
            }

            let createReserva = await reservaService.createReserva(paramsPagoReserva);

            let paramsCotizacion = {
              id: req.params.id,
              idEstado: 5,
            }

            await reservaService.updateCotizEstado(paramsCotizacion);

            let paramsUnidad = {
              id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
              idEstado: 5,
            }

            await reservaService.updatestateUnidad(paramsUnidad);

            res.status(202).json({
              success: true,
              message: "Reserva Creada Con exito",
              data: createReserva
            });
          } else {

            let paramsPagoReserva = {
              idCuentaCorriente: cuentaCorriente[0].CUENTA_CORRIENTEs[0].Id_cuenta_corriente,
              fecha: fechaFormateada,
              monto: 0,
              saldo: 0,
              interes: 0,
              fechaLimitePago: fechaFormateada,
              pago: 0,
              referencia: null,
              idTipoPago: 1,
              idStatusTransaccion: 1,
              idStatusPago: 1,
            }

            let createReserva = await reservaService.createReserva(paramsPagoReserva);

            let paramsCotizacion = {
              id: req.params.id,
              idEstado: 5,
            }

            await reservaService.updateCotizEstado(paramsCotizacion);

            let paramsUnidad = {
              id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
              idEstado: 5,
            }

            await reservaService.updatestateUnidad(paramsUnidad);

            res.status(202).json({
              success: true,
              message: "Reserva Creada Con exito",
              data: createReserva
            });
          }
        } else {

          let paramsCuentaCorriente = {
            idCliente: cotizacion.Id_cliente,
            idCotizacion: req.params.id,
          }
          let createCuentaCorriente = await reservaService.createCuentaCorriente(paramsCuentaCorriente);

          let paramsPagoReserva = {
            idCuentaCorriente: createCuentaCorriente.Id_cuenta_corriente,
            fecha: fechaFormateada,
            monto: 0,
            saldo: 0,
            interes: 0,
            fechaLimitePago: fechaFormateada,
            pago: 0,
            referencia: null,
            idTipoPago: 1,
            idStatusTransaccion: 1,
            idStatusPago: 1,
          }

          let createReserva = await reservaService.createReserva(paramsPagoReserva);

          let paramsCotizacion = {
            id: req.params.id,
            idEstado: 5,
          }

          await reservaService.updateCotizEstado(paramsCotizacion);

          let paramsUnidad = {
            id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
            idEstado: 5,
          }

          await reservaService.updatestateUnidad(paramsUnidad);

          res.status(202).json({
            success: true,
            message: "Reserva Creada Con exito",
            data: createReserva
          });
        }

      } else {

        const fechaFormateada = moment().format('YYYY-MM-DD');

        let cuotaReserva = await reservaService.findOneProyectoDetallePorcentajeReserva(req.params.id)

        if (cuotaReserva) {
          const fechaActual = moment();
          const objetosFiltrados = cuotaReserva.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_proyecto_PROYECTO.DETALLE_PORCENTAJE_RESERVAs.filter(objeto => {
            return fechaActual.isBetween(objeto.Fecha_inicial, objeto.Fecha_final, null, '[]'); // [] incluye los límites

          });

          if (objetosFiltrados.length > 0) {
            let porcentajeReserva = parseFloat(objetosFiltrados[0].Porcentaje);
            let valorTotal = parseFloat(cuotaReserva.Venta_descuento);
            let valorTotalReserva = (porcentajeReserva / 100) * valorTotal;

            let paramsCuentaCorriente = {
              idCliente: cotizacion.Id_cliente,
              idCotizacion: req.params.id,
            }
            let createCuentaCorriente = await reservaService.createCuentaCorriente(paramsCuentaCorriente);

            let paramsPagoReserva = {
              idCuentaCorriente: createCuentaCorriente.Id_cuenta_corriente,
              fecha: fechaFormateada,
              monto: valorTotalReserva,
              saldo: 0,
              interes: 0,
              fechaLimitePago: fechaFormateada,
              pago: 0,
              referencia: null,
              idTipoPago: 1,
              idStatusTransaccion: 1,
              idStatusPago: 1,
            }

            let createReserva = await reservaService.createReserva(paramsPagoReserva);

            let paramsCotizacion = {
              id: req.params.id,
              idEstado: 5,
            }

            await reservaService.updateCotizEstado(paramsCotizacion);

            let paramsUnidad = {
              id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
              idEstado: 5,
            }

            await reservaService.updatestateUnidad(paramsUnidad);

            res.status(202).json({
              success: true,
              message: "Reserva Creada Con exito",
              data: createReserva
            });
          } else {

            let paramsCuentaCorriente = {
              idCliente: cotizacion.Id_cliente,
              idCotizacion: req.params.id,
            }
            let createCuentaCorriente = await reservaService.createCuentaCorriente(paramsCuentaCorriente);

            let paramsPagoReserva = {
              idCuentaCorriente: createCuentaCorriente.Id_cuenta_corriente,
              fecha: fechaFormateada,
              monto: 0,
              saldo: 0,
              interes: 0,
              fechaLimitePago: fechaFormateada,
              pago: 0,
              referencia: null,
              idTipoPago: 1,
              idStatusTransaccion: 1,
              idStatusPago: 1,
            }

            let createReserva = await reservaService.createReserva(paramsPagoReserva);

            let paramsCotizacion = {
              id: req.params.id,
              idEstado: 5,
            }

            await reservaService.updateCotizEstado(paramsCotizacion);

            let paramsUnidad = {
              id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
              idEstado: 5,
            }

            await reservaService.updatestateUnidad(paramsUnidad);

            res.status(202).json({
              success: true,
              message: "Reserva Creada Con exito",
              data: createReserva
            });
          }
        } else {

          let paramsCuentaCorriente = {
            idCliente: cotizacion.Id_cliente,
            idCotizacion: req.params.id,
          }
          let createCuentaCorriente = await reservaService.createCuentaCorriente(paramsCuentaCorriente);

          let paramsPagoReserva = {
            idCuentaCorriente: createCuentaCorriente.Id_cuenta_corriente,
            fecha: fechaFormateada,
            monto: 0,
            saldo: 0,
            interes: 0,
            fechaLimitePago: fechaFormateada,
            pago: 0,
            referencia: null,
            idTipoPago: 1,
            idStatusTransaccion: 1,
            idStatusPago: 1,
          }

          let createReserva = await reservaService.createReserva(paramsPagoReserva);

          let paramsCotizacion = {
            id: req.params.id,
            idEstado: 5,
          }

          await reservaService.updateCotizEstado(paramsCotizacion);

          let paramsUnidad = {
            id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
            idEstado: 5,
          }

          await reservaService.updatestateUnidad(paramsUnidad);

          res.status(202).json({
            success: true,
            message: "Reserva Creada Con exito",
            data: createReserva
          });
        }
      }
    } else {
      res.status(404).json({
        succes: true,
        message: "No existe la cotizacion",
      });
    }


  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Unidad, intentelo de nuevo",
    });
  }
};