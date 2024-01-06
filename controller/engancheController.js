const engancheService = require("../services/engancheService");
const moment = require('moment')
const accountService = require("../services/accountService");
exports.valorTotalEnganche = async (req, res, next) => {
  try {
    let valorEnganche = await engancheService.findOneProyectoDetallePorcentajeEnganche(req.params.id)
    let valorTotalReserva = await engancheService.findOneReservaValor(req.params.id)

    if (valorTotalReserva) {
      let valorTotalReservaArray = []
      valorTotalReserva.CUENTA_CORRIENTEs[0].PAGOs.map(async (ref) => {
        if (ref.Id_tipo_pago_TIPO_PAGO.Name_pago == "Reserva" && ref.Id_status_transaccion_STATUS_TRANSACCION.Name_transaccion == "Vigente") {
          valorTotalReservaArray.push(ref)
        }

      })

      if (valorTotalReservaArray.length > 0) {

        if (valorEnganche) {
          const fechaActual = moment();
          const objetosFiltrados = valorEnganche.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_proyecto_PROYECTO.DETALLE_PORCENTAJE_ENGANCHEs.filter(objeto => {
            return fechaActual.isBetween(objeto.Fecha_inicial, objeto.Fecha_final, null, '[]'); // [] incluye los límites

          });

          if (objetosFiltrados.length > 0) {

            let porcentajeEnganche = parseFloat(objetosFiltrados[0].Porcentaje);
            let valorTotal = parseFloat(valorEnganche.Venta_descuento);
            let valorTotalEnganche = (porcentajeEnganche / 100) * valorTotal;



            let pagoReserva = parseFloat(valorTotalReservaArray[0].Pago);
            let nuevoValor = valorTotalEnganche - pagoReserva
            res.status(202).json({
              success: true,
              message: "La cantidad para Engancher es",
              data: nuevoValor,
              valorPocentaje: objetosFiltrados[0].Porcentaje
            });
          } else {
            res.status(202).json({
              success: true,
              message: "Puede Engancher sin ningun costo",
            });
          }
        } else {
          res.status(202).json({
            success: true,
            message: "Puede Engancher sin ningun costo",
          });
        }

      } else {
        if (valorEnganche) {
          const fechaActual = moment();
          const objetosFiltrados = valorEnganche.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_proyecto_PROYECTO.DETALLE_PORCENTAJE_ENGANCHEs.filter(objeto => {
            return fechaActual.isBetween(objeto.Fecha_inicial, objeto.Fecha_final, null, '[]'); // [] incluye los límites

          });

          if (objetosFiltrados.length > 0) {
            let porcentajeEnganche = parseFloat(objetosFiltrados[0].Porcentaje);
            let valorTotal = parseFloat(valorEnganche.Venta_descuento);
            let valorTotalEnganche = (porcentajeEnganche / 100) * valorTotal;

            res.status(202).json({
              success: true,
              message: "La cantidad para Engancher es",
              data: valorTotalEnganche,
            });
          } else {
            res.status(202).json({
              success: true,
              message: "Puede Engancher sin ningun costo",
            });
          }
        } else {
          res.status(202).json({
            success: true,
            message: "A ocurrido un problema, intentalo de nuevo",
          });
        }


      }



    } else {
      if (valorEnganche) {
        const fechaActual = moment();
        const objetosFiltrados = valorEnganche.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_proyecto_PROYECTO.DETALLE_PORCENTAJE_ENGANCHEs.filter(objeto => {
          return fechaActual.isBetween(objeto.Fecha_inicial, objeto.Fecha_final, null, '[]'); // [] incluye los límites

        });

        if (objetosFiltrados.length > 0) {
          let porcentajeEnganche = parseFloat(objetosFiltrados[0].Porcentaje);
          let valorTotal = parseFloat(valorEnganche.Venta_descuento);
          let valorTotalEnganche = (porcentajeEnganche / 100) * valorTotal;

          res.status(202).json({
            success: true,
            message: "La cantidad para Engancher es",
            data: valorTotalEnganche,
          });
        } else {
          res.status(202).json({
            success: true,
            message: "Puede Engancher sin ningun costo",
          });
        }
      } else {
        res.status(202).json({
          success: true,
          message: "A ocurrido un problema, intentalo de nuevo",
        });
      }
    }

  } catch (error) {
    next(error);
  }
};





exports.createDetallePorcentajeEnganche = async (req, res, next) => {
  try {

    let params = {
      fechaInicial: req.body.fechaInicial,
      fechaFinal: req.body.fechaFinal,
      idProyecto: req.body.idProyecto,
      status: 1,
      porcentaje: req.body.porcentaje,
    };

    let engancheDetalle = await engancheService.createDetallEnganche(params);
    res.status(200).json({
      succes: true,
      message: "Detalle porcentaje Enganche Creada con Exito",
      data: engancheDetalle
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Detalle porcentaje Enganche, intentelo de nuevo",
    });
  }
};


exports.updatePorcentajeEnganche = async (req, res, next) => {
  try {

    let params = {
      idDetallePorcentajeEnganche: req.params.id,
      fechaInicial: req.body.fechaInicial,
      fechaFinal: req.body.fechaFinal,
      idProyecto: req.body.idProyecto,
      status: req.body.status,
      porcentaje: req.body.porcentaje,
    };


    let actualizacionPorcentajeEnganche = await engancheService.updatePorcentajeEnganche(params);

    if (actualizacionPorcentajeEnganche) {
      res.status(200).json({
        succes: true,
        message: "Detalle porcentaje Enganche actualizado con exito",
        body: actualizacionPorcentajeEnganche
      });
    } else {
      res.status(404).json({
        succes: true,
        message: "Detalle porcentaje Enganche",
      });
    }

  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
  }
};

exports.listPorcentajesEnganche = async (req, res, next) => {
  try {
    let results = await engancheService.findPorcentajesEnganche(req.params.id);
    const longitud = results.length;

    if (longitud >= 1) {
      res.json(results);
    } else {
      res.status(202).json({
        success: true,
        message: "No hay Detalles de porcentaje de Enganche para este proyecto Registradas",
      });
    }
  } catch (error) {
    next(error);
  }
};




exports.createEnganche = async (req, res, next) => {
  try {
    let cotizacion = await engancheService.findOneCotizacion(req.params.id);

    if (cotizacion) {
      let cuentaCorriente = await engancheService.findCuentaCorriente(req.params.id);

      if (cuentaCorriente.length > 0) {
        var fechaFormateada = moment().format('YYYY-MM-DD');

        let cuotaEnganche = await engancheService.findOneProyectoDetallePorcentajeEnganche(req.params.id)

        if (cuotaEnganche) {
          const fechaActual = moment();
          const objetosFiltrados = cuotaEnganche.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_proyecto_PROYECTO.DETALLE_PORCENTAJE_ENGANCHEs.filter(objeto => {
            return fechaActual.isBetween(objeto.Fecha_inicial, objeto.Fecha_final, null, '[]'); // [] incluye los límites
          });

          if (objetosFiltrados.length > 0) {


          let porcentajeReserva = parseFloat(objetosFiltrados[0].Porcentaje);
          let valorTotal = parseFloat(cuotaEnganche.Venta_descuento);
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
              idTipoPago: 2,
              idStatusTransaccion: 1,
              idStatusPago: 1,
            }

            let createEnganche =  await engancheService.createEnganche(paramsPagoReserva);

            let paramsCotizacion = {
              id: req.params.id,
              idEstado: 9,
            }

            await engancheService.updateCotizEstado(paramsCotizacion);

            let paramsUnidad = {
              id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
              idEstado: 9,
            }

            await engancheService.updatestateUnidad(paramsUnidad);

            res.status(202).json({
              success: true,
              message: "Enganche Creada Con exito",
              data: createEnganche
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
              idTipoPago: 2,
              idStatusTransaccion: 1,
              idStatusPago: 1,
            }

            let createReserva = await engancheService.createEnganche(paramsPagoReserva);

            let paramsCotizacion = {
              id: req.params.id,
              idEstado: 9,
            }

            await engancheService.updateCotizEstado(paramsCotizacion);

            let paramsUnidad = {
              id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
              idEstado: 9,
            }

            await engancheService.updatestateUnidad(paramsUnidad);

            res.status(202).json({
              success: true,
              message: "Enganche Creada Con exito",
              data: createReserva
            });
          }
        } else {

          let paramsCuentaCorriente = {
            idCliente: cotizacion.Id_cliente,
            idCotizacion: req.params.id,
          }
          let createCuentaCorriente = await engancheService.createCuentaCorriente(paramsCuentaCorriente);

          let paramsPagoEnganche = {
            idCuentaCorriente: createCuentaCorriente.Id_cuenta_corriente,
            fecha: fechaFormateada,
            monto: 0,
            saldo: 0,
            interes: 0,
            fechaLimitePago: fechaFormateada,
            pago: 0,
            referencia: null,
            idTipoPago: 2,
            idStatusTransaccion: 1,
            idStatusPago: 1,
          }

          let createReserva = await engancheService.createEnganche(paramsPagoEnganche);

          let paramsCotizacion = {
            id: req.params.id,
            idEstado: 9,
          }

          await engancheService.updateCotizEstado(paramsCotizacion);

          let paramsUnidad = {
            id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
            idEstado: 9,
          }

          await engancheService.updatestateUnidad(paramsUnidad);

          res.status(202).json({
            success: true,
            message: "Enganche Creada Con exito",
            data: createReserva
          });
        }

      } else {

        const fechaFormateada = moment().format('YYYY-MM-DD');

        let cuotaEnganche = await engancheService.findOneProyectoDetallePorcentajeEnganche(req.params.id)

        if (cuotaEnganche) {
          const fechaActual = moment();
          const objetosFiltrados = cuotaEnganche.UNIDAD_COTIZACIONs[0].Id_unidad_UNIDAD.Id_proyecto_PROYECTO.DETALLE_PORCENTAJE_ENGANCHEs.filter(objeto => {
            return fechaActual.isBetween(objeto.Fecha_inicial, objeto.Fecha_final, null, '[]'); // [] incluye los límites
          });

          if (objetosFiltrados.length > 0) {
            let porcentajeReserva = parseFloat(objetosFiltrados[0].Porcentaje);
            let valorTotal = parseFloat(cuotaEnganche.Venta_descuento);
            let valorTotalReserva = (porcentajeReserva / 100) * valorTotal;

            let paramsCuentaCorriente = {
              idCliente: cotizacion.Id_cliente,
              idCotizacion: req.params.id,
            }
            let createCuentaCorriente = await engancheService.createCuentaCorriente(paramsCuentaCorriente);

            let paramsPagoReserva = {
              idCuentaCorriente: createCuentaCorriente.Id_cuenta_corriente,
              fecha: fechaFormateada,
              monto: valorTotalReserva,
              saldo: 0,
              interes: 0,
              fechaLimitePago: fechaFormateada,
              pago: 0,
              referencia: null,
              idTipoPago: 2,
              idStatusTransaccion: 1,
              idStatusPago: 1,
            }

            let createReserva = await engancheService.createEnganche(paramsPagoReserva);

            let paramsCotizacion = {
              id: req.params.id,
              idEstado: 9,
            }

            await engancheService.updateCotizEstado(paramsCotizacion);

            let paramsUnidad = {
              id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
              idEstado: 9,
            }

            await engancheService.updatestateUnidad(paramsUnidad);

            res.status(202).json({
              success: true,
              message: "Enganche Creada Con exito",
              data: createReserva
            });
          } else {

            let paramsCuentaCorriente = {
              idCliente: cotizacion.Id_cliente,
              idCotizacion: req.params.id,
            }
            let createCuentaCorriente = await engancheService.createCuentaCorriente(paramsCuentaCorriente);

            let paramsPagoReserva = {
              idCuentaCorriente: createCuentaCorriente.Id_cuenta_corriente,
              fecha: fechaFormateada,
              monto: 0,
              saldo: 0,
              interes: 0,
              fechaLimitePago: fechaFormateada,
              pago: 0,
              referencia: null,
              idTipoPago: 2,
              idStatusTransaccion: 1,
              idStatusPago: 1,
            }

            let createReserva = await engancheService.createEnganche(paramsPagoReserva);

            let paramsCotizacion = {
              id: req.params.id,
              idEstado: 9,
            }

            await engancheService.updateCotizEstado(paramsCotizacion);

            let paramsUnidad = {
              id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
              idEstado: 9,
            }

            await engancheService.updatestateUnidad(paramsUnidad);

            res.status(202).json({
              success: true,
              message: "Enganche Creada Con exito",
              data: createReserva
            });
          }
        } else {

          let paramsCuentaCorriente = {
            idCliente: cotizacion.Id_cliente,
            idCotizacion: req.params.id,
          }
          let createCuentaCorriente = await engancheService.createCuentaCorriente(paramsCuentaCorriente);

          let paramsPagoReserva = {
            idCuentaCorriente: createCuentaCorriente.Id_cuenta_corriente,
            fecha: fechaFormateada,
            monto: 0,
            saldo: 0,
            interes: 0,
            fechaLimitePago: fechaFormateada,
            pago: 0,
            referencia: null,
            idTipoPago: 2,
            idStatusTransaccion: 1,
            idStatusPago: 1,
          }

          let createReserva = await engancheService.createEnganche(paramsPagoReserva);

          let paramsCotizacion = {
            id: req.params.id,
            idEstado: 9,
          }

          await engancheService.updateCotizEstado(paramsCotizacion);

          let paramsUnidad = {
            id: cotizacion.UNIDAD_COTIZACIONs[0].Id_unidad,
            idEstado: 9,
          }

          await engancheService.updatestateUnidad(paramsUnidad);

          res.status(202).json({
            success: true,
            message: "Enganche Creada Con exito",
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
      error:error
    });
  }
};