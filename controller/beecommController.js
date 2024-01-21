const accountService = require("../services/accountService");
const BeecommRepository = require("../repository/BeecommRepository");

exports.getDMSByExp = async (req, res, next) => {
    try {
        let expId = req.params.expId  
        let dms = await BeecommRepository.getDMSByExp(expId);
        res.status(200).json({
            succes: true,
            response: dms
        });
    } catch (error) {
        res.status(406).json({
        succes: false
        });
    }
}

exports.deactivateDMS = async (req, res, next) => {
    try {
        let detailDMSId = req.params.detailDMSId  
        let dms = await BeecommRepository.deactivateDMS(detailDMSId);
        res.status(200).json({
            succes: true,
            response: dms
        });
    } catch (error) {
        res.status(406).json({
        succes: false
        });
    }
}

exports.activateDMS = async (req, res, next) => {
    try {
        let detailDMSId = req.params.detailDMSId  
        let dms = await BeecommRepository.activateDMS(detailDMSId);
        res.status(200).json({
            succes: true,
            response: dms
        });
    } catch (error) {
        res.status(406).json({
        succes: false
        });
    }
}

exports.updateDMSFreeText = async (req, res, next) => {
    try {
        let params = {
            detailDMSId: req.body.detailDMSId,
            freeText: req.body.freeText
        }
        let dms = await BeecommRepository.updateDMSFreeText(params);
        res.status(200).json({
            succes: true,
            response: dms
        });
    } catch (error) {
        res.status(406).json({
        succes: false
        });
    }
}

exports.createTariffItem = async (req, res, next) => {
    try {
        let params = {

            code: req.body.code,
            description: req.body.description,
            tariff: req.body.dai.toString(),
            section: "11",
            iva: "12",
            observation: "",
            firstUnit: req.body.firstUnit,
            secondUnit: req.body.secondUnit,
            thirdUnit: req.body.thirdUnit

        }
        //Partidas de 10 digitos
        if (params.code.length === 10){
            /*console.log(params.code)
            console.log(params.code.length)
            console.log(params.code.substring(params.code.length - 2))
            console.log(params.code.substring(0,4))
            console.log(params.code.substring(4,6))
            console.log(params.code.substring(6,8))
            console.log(params.code.substring(8,10))*/
            let codeDigits = []
            codeDigits.push(params.code.substring(0,4))
            codeDigits.push(params.code.substring(4,6))
            codeDigits.push(params.code.substring(6,8))
            codeDigits.push(params.code.substring(8,10))

            params.codeDai = codeDigits[0] + "." + codeDigits[1] + "." + codeDigits[2] + "." + codeDigits[3]
            params.codeUnit = codeDigits[0] + codeDigits[1] + codeDigits[2]
            console.log(params)
        }

        let sac = await BeecommRepository.createSAC(params);
        let dai = await BeecommRepository.createSATDai(params);
        let tariffMeasurementUnits = await BeecommRepository.createTariffMeasurementUnits(params);
        res.status(200).json({
            succes: true,
            response: {
                sac: sac,
                dai: dai,
                tariffMeasurementUnits: tariffMeasurementUnits
            }
        });
    } catch (error) {
        console.log(error);
        res.status(406).json({
        succes: false
        });
    }
}

