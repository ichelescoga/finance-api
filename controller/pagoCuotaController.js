const cuotaService = require("../services/pagoCuotasService");
const moment = require('moment')
const accountService = require("../services/accountService");


exports.createCuotas = async (req, res, next) => {
  try {
    var fechaFormateada = moment().format('YYYY-MM-DD');

    let cotizacion = await cuotaService.findOneCotizacion(req.params.id);
    let cuentaCorriente = await cuotaService.findCuentaCorriente(req.params.id);


    if (cuentaCorriente.length > 0) {
        
    let paramsCuotasCalculate = {
        annualInterest : 7,
        annualPayments : cotizacion.Meses_plazo,
        totalCreditValue : cotizacion.Venta_descuento,
        precioContado : false,
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
          pagoCapital:  elemento.monthlyCapitalPayment,
          pago: 0,
          referencia: null,
          idTipoPago: 2,
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
        message: "Cuotas Creada con Exito",
      });
    } else {
        res.status(406).json({
            succes: true,
            message: "No se pueden crear las cuotas",
        });
    }


  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Cuotas, intentelo de nuevo",
    });
  }
};
