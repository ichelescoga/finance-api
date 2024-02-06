const db = require("../src/models");
const sequelize = require('../components/conn_sqlz');
let UnidadRepository = function () {

    let addUnityEntity = async(params) => {
        return await db.models.ENTIDAD.create({
            Nombre: params.nombre,
            Descripcion: params.descripcion,
            Createdby: params.createdby,
            Estado: 1,
            Tipo: params.tipo
        })
    }
    let addUnityDetails = async(params) => {
        await db.models.ENTIDAD_CARACTERISTICA_INT.create({
            Id_caracteristica: 4,
            Id_entidad: params.entity,
            Valor: params.metrost,
            Createdby: params.createdby,
            Estado: 1
        }
        ) 
        await db.models.ENTIDAD_CARACTERISTICA_INT.create({
            Id_caracteristica: 5,
            Id_entidad: params.entity,
            Valor: params.metrosc,
            Createdby: params.createdby,
            Estado: 1
        }
        ) 
        if(params.tipo != 5){
            await db.models.ENTIDAD_CARACTERISTICA_INT.create({
                Id_caracteristica: 6,
                Id_entidad: params.entity,
                Valor: params.habitaciones,
                Createdby: params.createdby,
                Estado: 1
            }
            ) 
        }
        await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 22,
            Id_entidad: params.entity,
            Valor: params.direccion,
            Createdby: params.createdby,
            Estado:1
        })
       
    }

    let getUnity = async (entity) => {
        return await  db.models.ENTIDAD.findOne({
            attributes: [
                [sequelize.literal( "(SELECT Nombre FROM TIPO_ENTIDAD as t WHERE t.Id = ENTIDAD.Tipo )"), 'Tipo'],
                "Nombre",
                "Descripcion"
            ],
            where: {
                Id: entity,
                Estado: 1
            },
        });
    }

    let getUnityDetailsINT = async (entity) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_INT.findAll({
            attributes: [
                [sequelize.literal( "(SELECT Nombre FROM CARACTERISTICA_INT as c WHERE c.Id = ENTIDAD_CARACTERISTICA_INT.Id_caracteristica )"), 'Caracteristica'],
                "Valor"
            ],
            where: {
                Id_entidad: entity,
                Estado: 1
            },
        });
    }

    let getUnityDetailsSTRING = async (entity) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_STRING.findAll({
            attributes: [
                [sequelize.literal( "(SELECT Nombre FROM CARACTERISTICA_STRING as c WHERE c.Id = ENTIDAD_CARACTERISTICA_STRING.Id_caracteristica )"), 'Caracteristica'],
                "Valor"
            ],
            where: {
                Id_entidad: entity,
                Estado: 1
            },
        });
    }
    return {
        addUnityEntity,
        addUnityDetails,
        getUnity,
        getUnityDetailsINT,
        getUnityDetailsSTRING
    }
}

module.exports = UnidadRepository();