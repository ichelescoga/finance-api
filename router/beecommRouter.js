const express = require('express');
const router = express.Router();
const auth = require("./../services/auth-middleware")
const accountController = require('../controller/accountController')
const beecommController = require('../controller/beecommController')

/**router.post("/pmtCalculate", auth.verifyToken, accountController.pmtCalculate)
router.post("/pmtCalculateWithInterest", accountController.pmtCalculateWithInterest)
router.post("/pmtCalculateWithInterestMeses", accountController.pmtCalculateWithInterest)*/

router.get("/getDMSByExp/:expId", beecommController.getDMSByExp)
router.post("/deactivateDMS/:detailDMSId", beecommController.deactivateDMS)
router.post("/activateDMS/:detailDMSId", beecommController.activateDMS)
router.post("/updateDMSFreeText", beecommController.updateDMSFreeText)
router.post("/createTariffItem", beecommController.createTariffItem)

module.exports = router