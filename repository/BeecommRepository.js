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

    let createSAC = async(params) => {
        return await db.models.sac.create({
            codigo: params.code,
            descripcion: params.description,
            tarifa:  params.tariff,
            seccion: params.section,
            observacion: params.observation,
            iva: params.iva
        })
    }

    let createSATDai = async(params) => {
        return await db.models.sac.create({
            partida: params.codeDai,
            descripcion: params.description,
            arancel:  params.tariff            
        })
    }

    let createTariffMeasurementUnits = async(params) => {
        return await db.models.sac.create({
            inciso: params.codeUnit,
            descripcion: params.description,
            unidad_principal:  params.firstUnit,
            unidad_secundaria: params.secondUnit,
            unidad_alterna: params.thirdUnit,
        })
    }

    return {
        getDMSByExp,
        activateDMS,
        deactivateDMS,
        updateDMSFreeText,
        createSAC,
        createSATDai,
        createTariffMeasurementUnits
    }

}

module.exports = BeecommRepository();