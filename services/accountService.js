const db = require("../src/models");
  
  let accountService = function () {

    let pmtCalculate = (params) => {
        let annualI = params.annualInterest;
        let monthlyI = annualI / 12;
        let annualPayments = params.annualPayments;
        let monthlyPayments = annualPayments * 12;
        let totalValue = params.totalCreditValue
        let cashPrice = params.precioContado;

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
        return paymentList;
    }

    return {
        pmtCalculate
    };
  };
  
  module.exports = accountService();
  