
exports.pmtCalculate = async (req, res, next) => {
    try {
        let annualI = req.body.annualInterest;
        let monthlyI = annualI / 12;
        let annualPayments = req.body.annualPayments;
        let monthlyPayments = annualPayments * 12;
        let totalValue = req.body.totalCreditValue

        let baseCalculate = Math.pow((1 + (monthlyI/100)), monthlyPayments)

        let paymentCalculator = totalValue * ((monthlyI/100)*baseCalculate)/(baseCalculate - 1)
        let monthlyCapitalPayment = totalValue / monthlyPayments
        let monthlyInterest = paymentCalculator - monthlyCapitalPayment
        let paymentList = []
        let totalValueCalculate = totalValue
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

        res.json(paymentList)
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear usuario, intentelo de nuevo",
      });
    }
  };




