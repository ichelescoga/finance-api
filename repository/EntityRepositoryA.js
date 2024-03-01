const db = require("../src/modelsA");
const sequelize = require('../components/conn_sqlz');
let EntityRepositoryA = function () {
    let getComponentByEntity = async (entity) => {
        
        return await  db.models.COMPONENTE_ENTIDAD.findAll({
            where: {
                Id_tipo_entidad: entity,
                Estado: 1
            },
        });
    }

    let getComponent = async (componente) => {
        return await  db.models.COMPONENTE.findAll({
            attributes: [
                [sequelize.literal( "(SELECT Nombre FROM TIPO_COMPONENTE as t WHERE t.Id = COMPONENTE.Type )"), 'Type'],
                "label",
                "Place_holder",
                [sequelize.literal( "(SELECT Nombre FROM TIPO_CARACTERISTICA as t WHERE t.Id = COMPONENTE.InputType )"), 'InputType'],
                [sequelize.literal( "(SELECT Name FROM ICON as i WHERE i.Id = COMPONENTE.Id_icon )"), 'Icon'],
                "HintText",
                "ShowInList",
                [sequelize.literal( "(SELECT nombre FROM VALIDACION as v WHERE v.Id = COMPONENTE.Id_validacion )"), 'Validador'],
                "bodyKey",
                "columnNumber",
                "url",
                "listKeys",
                "show"
            ],
            where: {
                Id: componente,
                Estado: 1
            },
            order: [
                ['columnNumber', 'ASC']
            ]
        });
    }
    let getComponentById = async (tipo_entidad,id_componente) => {
        console.log(tipo_entidad)
        console.log(id_componente)
        return await  db.models.COMPONENTE_ENTIDAD.findOne({
            where: {
                Id_tipo_entidad: tipo_entidad,
                Estado: 1,
                Id_componente: id_componente
            },
        });
    }
    let addEntity = async (params) => {
        return await db.models.ENTIDAD.create({
            Nombre: params.nombre,
            Descripcion: params.descripcion,
            Createdby: params.createdby,
            Estado: 1,
            Tipo: params.tipo
        })
    }
    let getComponentByEntityNotNull = async (entity) => {
        return await  db.models.COMPONENTE_ENTIDAD.findAll({
            where: {
                Id_tipo_entidad: entity,
                Estado: 1, 
                Id_tipo_caracteristica: {
                    [db.Sequelize.Op.not]: null
                }
            },
        });
    }

   
    let addEntityDetailDouble = async (params) => {
        let valor = params.valor.replace(/,/g, '');
        return await db.models.ENTIDAD_CARACTERISTICA_DOUBLE.create({
            Id_caracteristica: params.id_caracteristica,
            Id_entidad: params.id_entidad,
            Valor: parseFloat(valor),
            Createdby: params.createdby,
            Estado: 1
        })
    }
    let addEntityDetailBoolean = async (params) => {
        return await db.models.ENTIDAD_CARACTERISTICA_BOOLEAN.create({
            Id_caracteristica: params.id_caracteristica,
            Id_entidad: params.id_entidad,
            Valor: params.valor,
            Createdby: params.createdby,
            Estado: 1
        })
    }
    let addEntityDetailDate = async (params) => {
        return await db.models.ENTIDAD_CARACTERISTICA_DATE.create({
            Id_caracteristica: params.id_caracteristica,
            Id_entidad: params.id_entidad,
            Valor: params.valor,
            Createdby: params.createdby,
            Estado: 1
        })
    }
    let addEntityDetailInt = async (params) => {
        return await db.models.ENTIDAD_CARACTERISTICA_INT.create({
            Id_caracteristica: params.id_caracteristica,
            Id_entidad: params.id_entidad,
            Valor: params.valor,
            Createdby: params.createdby,
            Estado: 1
        })
    }
    let addEntityDetailString = async (params) => {
        return await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: params.id_caracteristica,
            Id_entidad: params.id_entidad,
            Valor: params.valor,
            Createdby: params.createdby,
            Estado: 1
        })
    }
    let getTypeEntity = async (entity) => {
        return await  db.models.TIPO_ENTIDAD.findOne({
            where: {
                Id: entity
            },
        });
    }
    let getMod = async (entity) => {
        return await  db.models.MODIFICADOR.findOne({
            where: {
                Nombre: entity,
                Estado: 1
            },
        });
    }
    let getMod_Entity = async (params) => {
        return await  db.models.MODIFICADOR_ENTIDAD.findOne({
            where: {
                Id_modificador: params.id_modificador,
                Id_entidad: params.id_entidad,
                Estado: 1
            },
        });
    }
    let addMod_Entity = async (params) => {
        return await db.models.MODIFICADOR_ENTIDAD.create({
            Id_modificador: params.id_modificador,
            Id_entidad: params.id_entidad,
            Createdby: params.createdby,
            Estado: 1,
        })
    }
    let getEntity = async (id) => {
        return await  db.models.ENTIDAD.findOne({
            where: {
                Id: id,
                Estado: 1
            },
        });
    }
    let addGroupModifEntidad = async (params) => {
        return await db.models.GRUPO_MODIFICADOR_ENTIDAD.create({
            Id_modificador_entidad: params.id_modificador_entidad,
            Id_entidad: params.id_entidad,
            Nivel : 1,
            Createdby: params.createdby,
            Estado: 1,
        })
    }
    let getEntities = async (tipo) => {
        return await  db.models.ENTIDAD.findAll({
            where: {
                Tipo: tipo,
                Estado: 1
            },
        });
    }
    let getCaracteristicaString = async (id_caracteristica,id_entidad) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_STRING.findOne({
            where: {
                Id_caracteristica: id_caracteristica,
                Id_entidad: id_entidad,
                Estado: 1
            },
        });
    }   
     let getCaracteristicaBoolean = async (id_caracteristica,id_entidad) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_BOOLEAN.findOne({
            where: {
                Id_caracteristica: id_caracteristica,
                Id_entidad: id_entidad,
                Estado: 1
            },
        });
    }
    let getCaracteristicaDate = async (id_caracteristica,id_entidad) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_DATE.findOne({
            where: {
                Id_caracteristica: id_caracteristica,
                Id_entidad: id_entidad,
                Estado: 1
            },
        });
    }
    let getCaracteristicaDouble = async (id_caracteristica,id_entidad) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_DOUBLE.findOne({
            where: {
                Id_caracteristica: id_caracteristica,
                Id_entidad: id_entidad,
                Estado: 1
            },
        });
    }
    let getCaracteristicaInt= async (id_caracteristica,id_entidad) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_INT.findOne({
            where: {
                Id_caracteristica: id_caracteristica,
                Id_entidad: id_entidad,
                Estado: 1
            },
        });
    }
    let getGroupModById= async (id) => {
        return await  db.models.GRUPO_MODIFICADOR_ENTIDAD.findAll({
            where: {
                Id_modificador_entidad: id,
                Estado: 1
            },
        });
    }
    let getModById = async (entity) => {
        return await  db.models.MODIFICADOR.findOne({
            where: {
                Id: entity,
                Estado: 1
            },
        });
    }
    let getEntityTypeByName = async (entity) => {
        return await  db.models.TIPO_ENTIDAD.findOne({
            where: {
                Nombre: entity,
                Estado: 1
            },
        });
    }
    let getEntityDetailsById= async (entity) => {
        return await  db.models.ENTIDAD.findOne({
            where: {
                Id:entity,
                Estado: 1
            },
        });
    }
return {
    getComponentByEntity,
    getComponent,
    getComponentByEntityNotNull,
    addEntity,
    getComponentById,
    addEntityDetailDouble,
    addEntityDetailBoolean,
    addEntityDetailDate,
    addEntityDetailInt,
    addEntityDetailString,
    getTypeEntity,
    getMod,
    getMod_Entity,
    addMod_Entity,
    getEntity,
    addGroupModifEntidad,
    getEntities,
    getCaracteristicaString,
    getCaracteristicaBoolean,
    getCaracteristicaDate,
    getCaracteristicaDouble,
    getCaracteristicaInt,
    getGroupModById,
    getModById,
    getEntityTypeByName,
    getEntityDetailsById
    }   

}
module.exports = EntityRepositoryA();