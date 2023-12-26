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
        console.log(paymentList)
        return paymentList;
    }

    let pmtCalculateWithInterest = (params) => {
        let annualI = params.annualInterest;
        let monthlyI = annualI / 12;
        let annualPayments = params.annualPayments;
        let monthlyPayments = annualPayments * 12;
        let totalValue = params.totalCreditValue
        let cashPrice = params.precioContado;

        console.log("Capital: " + totalValue)
        console.log("Interes mensual: " + monthlyI)

        let baseCalculate = Math.pow((1 + (monthlyI/100)), monthlyPayments)

        let paymentCalculator = totalValue * ((monthlyI/100)*baseCalculate)/(baseCalculate - 1)
        paymentCalculator = Number(paymentCalculator.toFixed(2))
        console.log("Cuota Mensual: " + paymentCalculator)
        let monthlyCapitalPayment = totalValue / monthlyPayments
        //let monthlyInterest = paymentCalculator - monthlyCapitalPayment
        let monthlyInterest = totalValue * (monthlyI / 100)
        monthlyInterest = Number(monthlyInterest.toFixed(2))
        console.log("Interes: " + monthlyInterest)
        let paymentList = []
        let totalValueCalculate = totalValue

        if (cashPrice){
            paymentCalculator = totalValue / monthlyPayments
            monthlyCapitalPayment = totalValue / monthlyPayments
            monthlyInterest = 0.00
        }
        for (let index = 0; index < monthlyPayments; index++) {
            let month = "Mes " + (index + 1)
            monthlyInterest = totalValueCalculate * (monthlyI / 100)
            monthlyInterest = Number(monthlyInterest.toFixed(2))
            monthlyCapitalPayment = paymentCalculator - monthlyInterest
            monthlyCapitalPayment = Number(monthlyCapitalPayment.toFixed(2))

            totalValueCalculate = totalValueCalculate - monthlyCapitalPayment
            totalValueCalculate = Number (totalValueCalculate.toFixed(2))
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
        //console.log(paymentList)
        return paymentList;
    }

    return {
        pmtCalculate,
        pmtCalculateWithInterest
    };
  };

  
    
  module.exports = accountService();
  