const accountService = require("../services/accountService");

exports.pmtCalculate = async (req, res, next) => {
    try {
        let annualI = req.body.annualInterest;
        let monthlyI = annualI / 12;
        let annualPayments = req.body.annualPayments;
        let monthlyPayments = annualPayments * 12;
        let totalValue = req.body.totalCreditValue
        let cashPrice = req.body.precioContado;
        let params = {}
        params.annualInterest = req.body.annualInterest
        params.annualPayments = req.body.annualPayments
        params.totalCreditValue = req.body.totalCreditValue
        params.precioContado = req.body.precioContado

        let calculatePaymentList = accountService.pmtCalculate(params);

        let baseCalculate = Math.pow((1 + (monthlyI/100)), monthlyPayments)

        let paymentCalculator = totalValue * ((monthlyI/100)*baseCalculate)/(baseCalculate - 1)
        let monthlyCapitalPayment = totalValue / monthlyPayments
        let monthlyInterest = paymentCalculator - monthlyCapitalPayment
        let paymentList = []
        let totalValueCalculate = totalValue

        if (cashPrice){
            paymentCalculator = totalValue / monthlyPayments
            monthlyCapitalPayment = totalValue / monthlyPayments
            monthlyInterest = 0.00
        }
        for (let index = 0; index < monthlyPayments; index++) {
            let month = "Mes " + (index + 1)
            totalValueCalculate = totalValueCalculate - monthlyCapitalPayment
            let paymentItem = {
                iteration: index + 1,
                month: month,
                monthlyInterest: monthlyInterest,
                monthlyCapitalPayment: monthlyCapitalPayment,
                monthlyTotalPayment: paymentCalculator,
                creditTotalBalance: totalValueCalculate
            }
            paymentList.push(paymentItem)
        }

        res.json(calculatePaymentList)
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Payments list generation error.",
      });
    }
  };

  exports.pmtCalculateWithInterest = async (req, res, next) => {
    try {
      
        let params = {}
        params.annualInterest = req.body.annualInterest
        params.annualPayments = req.body.annualPayments
        params.totalCreditValue = req.body.totalCreditValue
        params.precioContado = req.body.precioContado

        let calculatePaymentList = accountService.pmtCalculateWithInterest(params);

        res.json(calculatePaymentList)
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Payments list generation error.",
      });
    }
  };


  exports.pmtCalculateWithInterest = async (req, res, next) => {
    try {
      
        let params = {}
        params.annualInterest = req.body.annualInterest
        params.annualPayments = req.body.annualPayments
        params.totalCreditValue = req.body.totalCreditValue
        params.precioContado = req.body.precioContado

        let calculatePaymentList = accountService.pmtCalculateWithInterestMeses(params);

        res.json(calculatePaymentList)
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Payments list generation error.",
      });
    }
  };
