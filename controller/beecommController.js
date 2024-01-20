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

