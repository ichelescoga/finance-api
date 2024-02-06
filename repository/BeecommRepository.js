const db = require("../src/bModels");
let BeecommRepository = function () {


    let getDMSByExp = async (expId) => {
        return await  db.models.DUA_DM_FRACCION.findAll({
            where: {
                exp_id: expId
            },
        });
    }

    let getDMSDetailByStatus = async (params) => {
        return await  db.models.DUA_DM_FRACCION.findAll({
            where: {
                id: params.detailDMSId,
                status: params.status
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

    let getSAC = async (params) => {
        return await  db.models.sac.findAll({
            where: {
                codigo: params.code,
            },
        });
    }

    let createSATDai = async(params) => {
        return await db.models.sat_dai.create({
            partida: params.codeDai,
            descripcion: params.description,
            arancel:  params.tariff            
        })
    }

    let getSATDai = async (params) => {
        return await  db.models.sat_dai.findAll({
            where: {
                partida: params.codeDai,
            },
        });
    }

    let createTariffMeasurementUnits = async(params) => {
        return await db.models.sat_unidades_medida_arancel.create({
            inciso: params.codeUnit,
            descripcion: params.description,
            unidad_principal:  params.firstUnit,
            unidad_secundaria: params.secondUnit,
            unidad_alterna: params.thirdUnit,
        })
    }

    let getTariffMeasurementUnits = async (params) => {
        return await  db.models.sat_unidades_medida_arancel.findAll({
            where: {
                inciso: params.codeUnit,
            },
        });
    }

    return {
        getDMSByExp,
        getDMSDetailByStatus,
        activateDMS,
        deactivateDMS,
        updateDMSFreeText,
        createSAC,
        createSATDai,
        createTariffMeasurementUnits,
        getSAC,
        getSATDai,
        getTariffMeasurementUnits
    }

}

module.exports = BeecommRepository();