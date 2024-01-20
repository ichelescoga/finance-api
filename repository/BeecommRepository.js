const db = require("../src/bModels");
let BeecommRepository = function () {


    let getDMSByExp = async (expId) => {
        return await  db.models.DUA_DM_FRACCION.findAll({
            where: {
                exp_id: expId
            },
        });
    }

    let deactivateDMS = async(detailDMSId) => {
        return await db.models.DUA_DM_FRACCION.update({status: 0}, {
            where: {
                id: detailDMSId
            }
        })
    }

    let activateDMS = async(detailDMSId) => {
        return await db.models.DUA_DM_FRACCION.update({status: 1}, {
            where: {
                id: detailDMSId
            }
        })
    }

    let updateDMSFreeText = async(params) => {
        return await db.models.DUA_DM_FRACCION.update({TEXTO_LIBRE: params.freeText}, {
            where: {
                id: params.detailDMSId
            }
        })
    }

    return {
        getDMSByExp,
        activateDMS,
        deactivateDMS,
        updateDMSFreeText
    }

}

module.exports = BeecommRepository();