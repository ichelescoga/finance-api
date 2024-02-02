const db = require("../src/models");
const sequelize = require('../components/conn_sqlz');
let ProyectRepository = function () {


    let getProyectModificadorbyCompany = async (params) => {
        return await  db.models.MODIFICADOR_ENTIDAD.findOne({
            where: {
                Id_modificador: 1,
                Id_entidad: params.entity,
                Estado: 1
            },
        });
    }
    let getGroupModificador = async (entity) => {
        return await  db.models.GRUPO_MODIFICADOR_ENTIDAD.findAll({
            where: {
                Id_modificador_entidad: entity,
                Estado: 1
            },
        });
    }

    let addModif_Entidad = async(params) => {
        return await db.models.MODIFICADOR_ENTIDAD.create({
            Id_modificador: 1,
            Id_entidad: params.entity,
            Estado: 1
        })
    }
    let addGroupModif_Entidad = async(params) => {
        return await db.models.GRUPO_MODIFICADOR_ENTIDAD.create({
            Id_modificador_entidad: params.mod_entity,
            Id_entidad: params.entity,
            Nivel: 1,
            Estado: 1,
            Cretaddby: params.createdby
        })
    }
    let addProyectEntity = async(params) => {
        return await db.models.ENTIDAD.create({
            Nombre: params.nombre,
            Descripcion: params.descripcion,
            Createdby: params.createdby,
            Estado: 1,
            Tipo: params.tipo
        })
    }
    let addProyectDetails = async(params) => {
        //agregando Departamento
        await db.models.ENTIDAD_CARACTERISTICA_INT.create({
            Id_caracteristica: 1,
            Id_entidad: params.entity,
            Valor: params.departamento,
            Createdby: params.createdby,
            Estado: 1
        }) 
         //agregando Municipio
         await db.models.ENTIDAD_CARACTERISTICA_INT.create({
            Id_caracteristica: 2,
            Id_entidad: params.entity,
            Valor: params.departamento,
            Createdby: params.createdby,
            Estado: 1
        }) 
        //agregando DIRECCION
        await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 3,
            Id_entidad: params.entity,
            Valor: params.direccion,
            Createdby: params.createdby,
            Estado:1
        })
        //agregando unidades en venta
        await db.models.ENTIDAD_CARACTERISTICA_INT.create({
            Id_caracteristica: 3,
            Id_entidad: params.entity,
            Valor: params.unidades,
            Createdby: params.createdby,
            Estado: 1
        }) 
        await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 8,
            Id_entidad: params.entity,
            Valor: params.logo,
            Createdby: params.createdby,
            Estado:1
        })
    }
    let getProyect = async (entity) => {
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
    let getProyectDetailsINT = async (entity) => {
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
    let getProyectDetailsSTRING = async (entity) => {
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

    let editProyectEntity = async(params) => {
        await db.models.ENTIDAD.update({
           Nombre: params.nombre,
           Descripcion: params.descripcion,
           Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
           Updatedby: params.updatedby,
           Tipo: params.tipo
       },{
           where: {
               Estado: 1,
               Id: params.entity
           }
       })
   }
   let editCompanyDetails = async(params) => {
        //editando DEPARTAMENTO
        await db.models.ENTIDAD_CARACTERISTICA_INT.update({
            Valor: params.departamento,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 1,
                Id_entidad: params.entity,
            }
        })
        //editando MUNICIPIO
        await db.models.ENTIDAD_CARACTERISTICA_INT.update({
            Valor: params.municipio,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 2,
                Id_entidad: params.entity,
            }
        })
        //editando DIRECCION
        await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
            Valor: params.direccion,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 3,
                Id_entidad: params.entity,
            }
        })
        //editando CANTIDAD DE UNIDADES
        await db.models.ENTIDAD_CARACTERISTICA_INT.update({
            Valor: params.unidades,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 3,
                Id_entidad: params.entity,
            }
        })
         //editando LOGO
         await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
            Valor: params.logo,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
            },{
            where: {
                Estado: 1,
                Id_caracteristica: 8,
                Id_entidad: params.entity,
            }
        })
    }
    let deleteProyectEntity = async(params) => {
        await db.models.ENTIDAD.update({
        Estado:0,
           Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
           Updatedby: params.updatedby
       },{
           where: {
               Id: params.entity
           }
       })
   }

   let deleteProyectDetails = async(params) => {
    //eliminando DEPARTAMENTO
    await db.models.ENTIDAD_CARACTERISTICA_INT.update({
        Estado: 0,
        Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
        Updatedby: params.updatedby
    },{
        where: {
            Id_caracteristica: 1,
            Id_entidad: params.entity,
        }
    })
    //eliminando MUNICIPIO
    await db.models.ENTIDAD_CARACTERISTICA_INT.update({
        Estado: 0,
        Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
        Updatedby: params.updatedby
    },{
        where: {
            Id_caracteristica: 2,
            Id_entidad: params.entity,
        }
    })
    //eliminando DIRECCION
    await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
        Estado: 0,
        Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
        Updatedby: params.updatedby
    },{
        where: {
            Id_caracteristica: 3,
            Id_entidad: params.entity,
        }
    })
    //eliminando CANTIDAD DE UNIDADES
    await db.models.ENTIDAD_CARACTERISTICA_INT.update({
        Estado: 0,
        Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
        Updatedby: params.updatedby
    },{
        where: {
            Id_caracteristica: 3,
            Id_entidad: params.entity,
        }
    })
     //eliminando LOGO
     await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
        Estado: 0,
        Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
        Updatedby: params.updatedby
        },{
        where: {
            Id_caracteristica: 8,
            Id_entidad: params.entity,
        }
    })
    }
    
    let deleteGroupMod_entity = async(params) => {
        await db.models.GRUPO_MODIFICADOR_ENTIDAD.update({
            Estado:0,
           Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
           Updatedby: params.updatedby
       },{
           where: {
               Id_entidad: params.entity
           }
       })
   }

   let addType = async(params) =>{
    return await db.models.TIPO_ENTIDAD.create({
        Nombre: params.nombre,
        Descripcion: params.descripcion,
        Createdby: params.createdby,
        Estado: 1
    })
   }
   let getTypes = async (entity) => {
    return await  db.models.TIPO_ENTIDAD.findAll({
        attributes: [
            "Nombre",
            "Descripcion"
        ],
        where: {
            Estado: 1
        },
    });
}

let getTypesByEntity = async (modificador) => {
    return await  db.models.GRUPO_MODIFICADOR_ENTIDAD.findAll({
        attributes: [
            "Id"
            [sequelize.literal( "(SELECT Nombre FROM ENTIDAD as e WHERE e.Id = GRUPO_MODIFICADOR_ENTIDAD.Id_entidad )"), 'Nombre'],
            [sequelize.literal( "(SELECT Descripcion FROM ENTIDAD as e WHERE e.Id = GRUPO_MODIFICADOR_ENTIDAD.Id_entidad )"), 'Descripcion'],
            [sequelize.literal("(SELECT te.Nombre FROM ENTIDAD as e INNER JOIN TIPO_ENTIDAD as te ON e.Tipo = te.Id WHERE e.Id = GRUPO_MODIFICADOR_ENTIDAD.Id_entidad)"), 'tipo unidad']
        ],
        where: {
            Id_modificador_entidad: modificador ,
            Estado: 1
        },
    });
}


    return {
        getProyectModificadorbyCompany,
        getGroupModificador,
        addModif_Entidad,
        addGroupModif_Entidad,
        addProyectEntity,
        addProyectDetails,
        getProyect,
        getProyectDetailsINT,
        getProyectDetailsSTRING,
        editProyectEntity,
        editCompanyDetails,
        deleteProyectEntity,
        deleteProyectDetails,
        deleteGroupMod_entity,
        addType,
        getTypes,
        getTypesByEntity
    }

}

module.exports = ProyectRepository();