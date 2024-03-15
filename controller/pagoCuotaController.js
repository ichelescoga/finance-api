const cuotaService = require("../services/pagoCuotasService");
const moment = require('moment')
const accountService = require("../services/accountService");
const userService = require("../services/userService");
const clienteService = require("../services/clienteService");


exports.createCuotas = async (req, res, next) => {
  try {

    var fechaFormateada = moment().format('YYYY-MM-DD');

    let cotizacion = await cuotaService.findOneCotizacion(req.params.id);
    let cuentaCorriente = await cuotaService.findCuentaCorriente(req.params.id);


    if (cuentaCorriente.length > 0) {
      let pagoEnganche = await cuotaService.findOnePagoEnganche(cuentaCorriente[0].CUENTA_CORRIENTEs[0].Id_cuenta_corriente);

      if (pagoEnganche) {

        let pagoEngancheValue =  cotizacion.Venta_descuento -  Number(pagoEnganche.Monto)
        let paramsCuotasCalculate = {
          annualInterest: req.body.interes,
          annualPayments: cotizacion.Meses_plazo,
          totalCreditValue: pagoEngancheValue,
          precioContado: false,
        }
        let calculatePaymentList = accountService.pmtCalculateWithInterestMeses(paramsCuotasCalculate);

        for (const elemento of calculatePaymentList) {
          let paramsPagoReserva = {
            idCuentaCorriente: cuentaCorriente[0].CUENTA_CORRIENTEs[0].Id_cuenta_corriente,
            fecha: fechaFormateada,
            monto: elemento.monthlyTotalPayment,
            saldo: elemento.creditTotalBalance,
            interes: elemento.monthlyInterest,
            fechaLimitePago: fechaFormateada,
            pagoCapital: elemento.monthlyCapitalPayment,
            pago: 0,
            referencia: null,
            idTipoPago: 3,
            idStatusTransaccion: 1,
            idStatusPago: 1,
            categoria: "Principal",
            mora: 0
          }

          await cuotaService.createCuotas(paramsPagoReserva);

          const fechaInicial = moment(fechaFormateada);
          const fechaSiguienteMes = fechaInicial.add(1, 'month').endOf('month');
          fechaFormateada = fechaSiguienteMes.format('YYYY-MM-DD')
        }

        const user = await userService.createUserForClientIfNeeded(cuentaCorriente[0]["Id_cliente"])

        res.status(200).json({
          succes: true,
          message: "Cuotas Creada con Exito",
          user
        });

      } else {
        let paramsCuotasCalculate = {
          annualInterest: req.body.interes,
          annualPayments: cotizacion.Meses_plazo,
          totalCreditValue: cotizacion.Venta_descuento,
          precioContado: false,
        }

        
        let calculatePaymentList = accountService.pmtCalculateWithInterestMeses(paramsCuotasCalculate);

        for (const elemento of calculatePaymentList) {

          let paramsPagoReserva = {
            idCuentaCorriente: cuentaCorriente[0].CUENTA_CORRIENTEs[0].Id_cuenta_corriente,
            fecha: fechaFormateada,
            monto: elemento.monthlyTotalPayment,
            saldo: elemento.creditTotalBalance,
            interes: elemento.monthlyInterest,
            fechaLimitePago: fechaFormateada,
            pagoCapital: elemento.monthlyCapitalPayment,
            pago: 0,
            referencia: null,
            idTipoPago: 3,
            idStatusTransaccion: 1,
            idStatusPago: 1,
            categoria: "Principal",
            mora: 0
          }

          await cuotaService.createCuotas(paramsPagoReserva);

          const fechaInicial = moment(fechaFormateada);

          const fechaSiguienteMes = fechaInicial.add(1, 'month').endOf('month');
          fechaFormateada = fechaSiguienteMes.format('YYYY-MM-DD')

        }

        const user = await userService.createUserForClientIfNeeded(cuentaCorriente[0]["Id_cliente"])

        res.status(200).json({
          succes: true,
          message: "Cuotas Creada con Exito",
          user
        });
      }

    } else {
      const PAYMENTS_NOT_CREATED = "PAYMENTS_NOT_CREATED";
      res.status(406).json({
        succes: true,
        message: PAYMENTS_NOT_CREATED,
      });
    }


  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Cuotas, intentelo de nuevo",
    });
  }
};




exports.pagoCuota = async (req, res, next) => {
  try {


    let findOneCuota = await cuotaService.findOneCuota(req.body.idCuotaPago);

    if (findOneCuota) {


      if (findOneCuota.Monto == req.body.pagoCuota) {

        let paramsCuotaPagada = {
          statusPago: 3,
          idCuotaPago: req.body.idCuotaPago
        };


        await cuotaService.pagoRealizado(paramsCuotaPagada);

        var fechaFormateada = moment().format('YYYY-MM-DD');

        let paramsCreatePago = {
          idCuentaCorriente: findOneCuota.Id_cuenta_corriente,
          fecha: fechaFormateada,
          monto: 0,
          saldo: 0,
          interes: findOneCuota.Interes,
          fechaLimitePago: findOneCuota.Fecha_limite_pago,
          pagoCapital: findOneCuota.Pago_capital,
          pago: req.body.pagoCuota,
          referencia: req.body.idCuotaPago,
          idTipoPago: 3,
          idStatusTransaccion: 1,
          idStatusPago: 5,
          mora: 0,
          categoria: 'Secundaria'
        }

        let cuotaPagada = await cuotaService.createCuotas(paramsCreatePago);

        if (cuotaPagada) {
          res.status(200).json({
            succes: true,
            message: "Cuota pagada con exito",
            data: cuotaPagada
          });
        } else {
          res.status(404).json({
            succes: true,
            message: "No existe la Cuota",
          });
        }

      } else {
        res.status(200).json({
          succes: true,
          message: "Cuota pagada no suficiente",
        });
      }
    } else {
      res.status(200).json({
        succes: true,
        message: "Cuota No existente",
      });
    }
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
  }
};


exports.pagoCuotaAdelantado = async (req, res, next) => {
  try {
    let findOneCuota = await cuotaService.findOneCuota(req.body.idCuotaPago);

    if (findOneCuota) {


      if (req.body.pagoCuota > findOneCuota.Pago_capital) {


        let saldoRestante = parseFloat(req.body.pagoCuota) - parseFloat(findOneCuota.Pago_capital)

        let paramsCuotaPagada = {
          statusPago: 3,
          cuotaPago: findOneCuota.pagoCuota,
          idCuotaPago: req.body.idCuotaPago
        };

        await cuotaService.pagoRealizado(paramsCuotaPagada);

        let paramsCuotas = {
          idCuentaCorriente: findOneCuota.Id_cuenta_corriente,
          idPago: req.body.idCuotaPago // Usando el operador "mayor que" de Sequelize
        }

        let findAllCuotas = await cuotaService.findAllCuota(paramsCuotas);

        for (const elemento of findAllCuotas) {
          let paramsPagoReserva = {
            statusPago: 4,
            idStatusTransaccion: 2,
            idCuotaPago: elemento.Id_pago,
          }

          await cuotaService.desabilitarCuota(paramsPagoReserva);
        }


        if (findOneCuota.Saldo == saldoRestante) {
          res.status(200).json({
            succes: true,
            message: "Deuda saldada por completo ",
          });
        } else if (saldoRestante > findOneCuota.Saldo) {
          res.status(200).json({
            succes: true,
            message: "Se le debe devolver esta cantidad",
          });
        } else {
          let saldoIterarDivision = parseFloat(findOneCuota.Saldo) - parseFloat(saldoRestante)

          let divicionNoCuentas = saldoIterarDivision / findOneCuota.Monto

          let numeroEnteroAproximado = Math.ceil(divicionNoCuentas)

          let paramsCuotasCalculate = {
            annualInterest: 7,
            annualPayments: numeroEnteroAproximado,
            totalCreditValue: saldoIterarDivision,
            valorCuota: findOneCuota.Monto,
            precioContado: false,
          }


          let calculatePaymentList = accountService.pmtCalculateWithInterestAdelanto(paramsCuotasCalculate);

          var fechaFormateada = moment().format('YYYY-MM-DD');

          for (const elemento of calculatePaymentList) {

            let paramsPagoReserva = {
              idCuentaCorriente: findOneCuota.Id_cuenta_corriente,
              fecha: fechaFormateada,
              monto: elemento.monthlyTotalPayment,
              saldo: elemento.creditTotalBalance,
              interes: elemento.monthlyInterest,
              fechaLimitePago: fechaFormateada,
              pagoCapital: elemento.monthlyCapitalPayment,
              pago: 0,
              referencia: null,
              idTipoPago: 3,
              idStatusTransaccion: 1,
              idStatusPago: 1,
            }

            await cuotaService.createCuotas(paramsPagoReserva);

            const fechaInicial = moment(fechaFormateada);

            const fechaSiguienteMes = fechaInicial.add(1, 'month').endOf('month');
            fechaFormateada = fechaSiguienteMes.format('YYYY-MM-DD')

          }


          res.status(200).json({
            succes: true,
            message: "Se crearon nuevas cuotas",
            parametros: paramsCuotasCalculate,
            saldo: calculatePaymentList
          });
        }
      } else {
        res.status(200).json({
          succes: true,
          message: "Cuota pagada no suficiente",
        });
      }
    } else {
      res.status(200).json({
        succes: true,
        message: "Cuota No existente",
      });
    }
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
  }
};





exports.pagoAdelantado = async (req, res, next) => {
  try {
    let params = {
      idCuentaCorriente: req.body.idCuentaCorriente
    }


    let findAllCuotas = await cuotaService.findCuotasPagadas(params);

    if (findAllCuotas.length > 0) {

      let paramsCuotas = {
        idCuentaCorriente: req.body.idCuentaCorriente,
        idPago: findAllCuotas[0].Id_pago // Usando el operador "mayor que" de Sequelize
      }


      let findAllCuotasNuevas = await cuotaService.findAllCuota(paramsCuotas);


      for (const elemento of findAllCuotasNuevas) {
        let paramsPagoReserva = {
          statusPago: 4,
          idStatusTransaccion: 2,
          idCuotaPago: elemento.Id_pago,
        }

        await cuotaService.desabilitarCuota(paramsPagoReserva);
      }




      let saldoIterarDivision = parseFloat(findAllCuotas[0].Saldo) - req.body.pagoCuota



      let divicionNoCuentas = saldoIterarDivision / findAllCuotas[0].Monto

      let numeroEnteroAproximado = Math.ceil(divicionNoCuentas)

      let paramsCuotasCalculate = {
        annualInterest: req.body.interest,
        annualPayments: numeroEnteroAproximado,
        totalCreditValue: saldoIterarDivision,
        valorCuota: findAllCuotas[0].Monto,
        precioContado: false,
      }


      let calculatePaymentList = accountService.pmtCalculateWithInterestAdelanto(paramsCuotasCalculate);


      var fechaFormateada = moment(findAllCuotas[0].Fecha_limite_pago).add(1, 'month').endOf('month').format('YYYY-MM-DD');
      let fechaCreacion = moment().format('YYYY-MM-DD');

      for (const elemento of calculatePaymentList) {

        let paramsCuotasNuevas = {
          idCuentaCorriente: req.body.idCuentaCorriente,
          fecha: fechaCreacion,
          monto: elemento.monthlyTotalPayment,
          saldo: elemento.creditTotalBalance,
          interes: elemento.monthlyInterest,
          fechaLimitePago: fechaFormateada,
          pagoCapital: elemento.monthlyCapitalPayment,
          pago: 0,
          referencia: null,
          idTipoPago: 3,
          idStatusTransaccion: 1,
          idStatusPago: 1,
          categoria: "Principal",
          mora: 0
        }

        await cuotaService.createCuotas(paramsCuotasNuevas);

        const fechaInicial = moment(fechaFormateada);

        const fechaSiguienteMes = fechaInicial.add(1, 'month').endOf('month');
        fechaFormateada = fechaSiguienteMes.format('YYYY-MM-DD')

      }

      res.status(200).json({
        succes: true,
        message: "Nuevas cuotas creadas con Exito",
        cuota: calculatePaymentList
      });

    } else {
      res.status(200).json({
        succes: true,
        message: "No tiene ninguna cuenta pagada",
      });
    }
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: error,
    });
  }
};










exports.pagoParcial = async (req, res, next) => {
  try {
    let findOneCuota = await cuotaService.findOneCuota(req.body.idCuotaPago);


    let pagosReferenteCuota = await cuotaService.findOneCuotasReferencia(req.body.idCuotaPago);


    if (findOneCuota != null && pagosReferenteCuota.length > 0) {
      let sumaCuotas = 0;
      for (const elementoCuota of pagosReferenteCuota) {
        sumaCuotas = Number(elementoCuota.Pago) + sumaCuotas
      }

      if (findOneCuota.Monto > sumaCuotas) {

        let sumaFinalCuota = sumaCuotas + Number(req.body.pagoCuota)
        if (sumaFinalCuota >= findOneCuota.Monto) {
          let paramsCuotaPagada = {
            statusPago: 3,
            idCuotaPago: req.body.idCuotaPago
          };
          await cuotaService.pagoRealizado(paramsCuotaPagada);
        }


        // let resta = pagosReferenteCuota[0].Monto - req.body.pagoCuota
        let restaCuotaMora = findOneCuota.Monto - sumaFinalCuota

        var fechaFormateada = moment().format('YYYY-MM-DD');

        let paramsCreatePago = {
          idCuentaCorriente: findOneCuota.Id_cuenta_corriente,
          fecha: fechaFormateada,
          monto: restaCuotaMora,
          saldo: 0,
          interes: 0,
          fechaLimitePago: findOneCuota.Fecha_limite_pago,
          pagoCapital: 0,
          pago: req.body.pagoCuota,
          referencia: req.body.idCuotaPago,
          idTipoPago: 3,
          idStatusTransaccion: 1,
          idStatusPago: 5,
          categoria: 'Secundaria'
        }

        await cuotaService.createCuotas(paramsCreatePago);

        res.status(404).json({
          succes: true,
          message: "Cuota parcial pagada con exito",
        });
      } else {
        let paramsCuotaPagada = {
          statusPago: 3,
          idCuotaPago: req.body.idCuotaPago
        };


        await cuotaService.pagoRealizado(paramsCuotaPagada);

        res.status(404).json({
          succes: true,
          message: "Cuota parcial pagada con exito",
        });
      }




    } else if (findOneCuota != null) {
      let resta = findOneCuota.Monto - req.body.pagoCuota
      if (findOneCuota.Monto == req.body.pagoCuota) {


        let paramsCuotaPagada = {
          statusPago: 3,
          idCuotaPago: req.body.idCuotaPago
        };


        await cuotaService.pagoRealizado(paramsCuotaPagada);
      }

      var fechaFormateada = moment().format('YYYY-MM-DD');

      let paramsCreatePago = {
        idCuentaCorriente: findOneCuota.Id_cuenta_corriente,
        fecha: fechaFormateada,
        monto: resta,
        saldo: 0,
        interes: 0,
        fechaLimitePago: findOneCuota.Fecha_limite_pago,
        pagoCapital: 0,
        pago: req.body.pagoCuota,
        referencia: req.body.idCuotaPago,
        idTipoPago: 3,
        idStatusTransaccion: 1,
        idStatusPago: 5,
        categoria: 'Secundaria'
      }

      await cuotaService.createCuotas(paramsCreatePago);

      res.status(404).json({
        succes: true,
        message: "Cuota pagada con exito",
      });
    } else {
      res.status(404).json({
        succes: true,
        message: "Cuota no existente",
      });
    }

  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Cuotas, intentelo de nuevo",
    });
  }
};







exports.cuotasPorPagar = async (req, res, next) => {
  try {

    let params = {
      idCliente: req.body.idCliente,
      idCuentaCorriente: req.body.idCuentaCorriente,
      fechaCorte: req.body.fechaCorte
    }

    let cuotas = await cuotaService.finCuotasPorPagar(params);

    if (cuotas.length > 0) {
      var sumaMonto = 0;
      var sumaMora = 0;
      var sumaInteres = 0;
      for (const elemento of cuotas) {
        sumaMonto = Number(elemento.Monto) + sumaMonto
        sumaMora = Number(elemento.Mora) + sumaMora
        sumaInteres = Number(elemento.Interes) + sumaInteres
      }

      res.status(406).json({
        succes: false,
        message: "sumas cuotas",
        sumaMonto,
        sumaMora,
        sumaInteres
      });
    } else {
      res.status(406).json({
        succes: false,
        message: "No hay cuotas",
      });
    }
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Cuotas, intentelo de nuevo",
    });
  }
};


exports.cuotasPagadas = async (req, res, next) => {
  try {
    let params = {
      idCliente: req.body.idCliente,
      idCuentaCorriente: req.body.idCuentaCorriente,
      fechaCorte: req.body.fechaCorte
    }
    let pagosReferenteCuota = await cuotaService.findCuotasPagadasVerificacion(params);

    let arrayTotalCuota = []

    if (pagosReferenteCuota.length > 0) {

      for (const elemento of pagosReferenteCuota) {
        let subcuotas = await cuotaService.findOneCuotasVencidas(elemento.Id_pago);


        if (subcuotas.length > 0) {
          var sumaPago = 0;
          var sumaMora = 0;
          for (const elemento of subcuotas) {
            sumaPago = Number(elemento.Pago) + sumaPago
            sumaMora = Number(elemento.Mora) + sumaMora
          }
          let paramsArray = {
            sumaTotalCuota: sumaPago,
            sumaTotalMora: sumaMora
          }
          arrayTotalCuota.push(paramsArray)

        } else {
          let paramsArray = {
            sumaTotalCuota: 0,
            sumaTotalMora: 0
          }
          arrayTotalCuota.push(paramsArray)

        }
      }
      let sumaFinalPago = 0;
      let sumaFinalMora = 0;


      let sumaFinalPagoPrincipal = 0;
      let sumaFinalMoraPrincipal = 0;
      for (const elementoArray of arrayTotalCuota) {
        sumaFinalPago = Number(elementoArray.sumaTotalCuota) + sumaFinalPago
        sumaFinalMora = Number(elementoArray.sumaTotalMora) + sumaFinalMora
      }

      for (const elementoPrincipal of pagosReferenteCuota) {
        sumaFinalPagoPrincipal = Number(elementoPrincipal.Monto) + sumaFinalPagoPrincipal
        sumaFinalMoraPrincipal = Number(elementoPrincipal.Mora) + sumaFinalMoraPrincipal
      }
      let valorDosDigitos = sumaFinalPago.toFixed(2)

      if (valorDosDigitos == sumaFinalPagoPrincipal && sumaFinalMora == sumaFinalMoraPrincipal) {
        res.status(202).json({
          succes: true,
          message: "Esta vigente",
          sumasPagos: Number(valorDosDigitos),
          sumaPagosMoras: sumaFinalMora,
          sumaMonto: sumaFinalPagoPrincipal,
          sumaMora: sumaFinalMoraPrincipal,
        });
      } else {
        res.status(202).json({
          succes: true,
          message: "No esta vigente",
          sumasPagos: Number(valorDosDigitos),
          sumaPagosMoras: sumaFinalMora,
          sumaMonto: sumaFinalPagoPrincipal,
          sumaMora: sumaFinalMoraPrincipal,
        });
      }

    }
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Cuotas, intentelo de nuevo",
    });
  }
};




exports.CreateMora = async (req, res, next) => {
  try {


    let params = {
      idCliente: req.body.idCliente,
      idCuentaCorriente: req.body.idCuentaCorriente,
      fechaCorte: req.body.fechaCorte
    }

    let cuotasVerificar = await cuotaService.finCuotasVencidas(params);


    if (cuotasVerificar.length > 0) {

      for (const elemento of cuotasVerificar) {
        let subcuotas = await cuotaService.findOneCuotasVencidas(elemento.Id_pago);
        if (subcuotas.length > 0) {
          let sumaCuotas = 0;
          for (const elementoCuota of subcuotas) {
            sumaCuotas = Number(elementoCuota.Pago) + sumaCuotas
          }

          if (elemento.Monto > sumaCuotas) {
            let restaCuotaMora = elemento.Monto - sumaCuotas



            const fechaInicial = moment(req.body.fechaCorte);
            const fechaDiaFinal = fechaInicial.add(1, 'month').format('YYYY-MM-DD HH:mm:ss');

            var resultado = (Number(req.body.interesMora) / 100) * Number(restaCuotaMora);

            var fechaActual = moment();

            // Formatea la fecha con el formato deseado
            var fechaFormateada = fechaActual.format('YYYY-MM-DD HH:mm:ss');


            let paramsCuotasNuevas = {
              idCuentaCorriente: req.body.idCuentaCorriente,
              fecha: fechaFormateada,
              monto: resultado,
              saldo: 0,
              interes: 0,
              fechaLimitePago: fechaDiaFinal,
              pagoCapital: 0,
              pago: 0,
              referencia: elemento.Id_pago,
              idTipoPago: 4,
              idStatusTransaccion: 1,
              idStatusPago: 1,
              mora: resultado,
              categoria: 'Principal'
            }
            await cuotaService.createCuotas(paramsCuotasNuevas);
          }

        } else {
          const fechaInicial = moment(req.body.fechaCorte);
          const fechaDiaFinal = fechaInicial.add(1, 'month').format('YYYY-MM-DD HH:mm:ss');

          var resultado = (Number(req.body.interesMora) / 100) * Number(elemento.Monto);

          var fechaActual = moment();

          // Formatea la fecha con el formato deseado
          var fechaFormateada = fechaActual.format('YYYY-MM-DD HH:mm:ss');


          let paramsCuotasNuevas = {
            idCuentaCorriente: req.body.idCuentaCorriente,
            fecha: fechaFormateada,
            monto: resultado,
            saldo: 0,
            interes: 0,
            fechaLimitePago: fechaDiaFinal,
            pagoCapital: 0,
            pago: 0,
            referencia: elemento.Id_pago,
            idTipoPago: 4,
            idStatusTransaccion: 1,
            idStatusPago: 1,
            mora: resultado,
            categoria: 'Principal'
          }
          await cuotaService.createCuotas(paramsCuotasNuevas);
        }
      }

      res.status(406).json({
        succes: false,
        message: "Moras creadas con exito",
      });

    } else {
      res.status(406).json({
        succes: false,
        message: "No hay moras para generar ",
      });
    }


  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Cuotas, intentelo de nuevo",
    });
  }
};
