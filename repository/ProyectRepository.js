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
    let getCompanyDetailsINT = async (entity) => {
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

    let getCompanyDetailsSTRING = async (entity) => {
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

    let addCompanyEntity = async(params) => {
        return await db.models.ENTIDAD.create({
            Nombre: params.nombre,
            Descripcion: params.descripcion,
            Createdby: params.createdby,
            Estado: 1,
            Tipo: 1
        })
    }
    let addCompanyDetails = async(params) => {
        //agregando Desarrollador
        await db.models.ENTIDAD_CARACTERISTICA_INT.create({
            Id_caracteristica: 1,
            Id_entidad: params.entity,
            Valor: params.desarrollador,
            Createdby: params.createdby,
            Estado: 1
        })
        // agregando NIT
        await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 1,
            Id_entidad: params.entity,
            Valor: params.nit,
            Createdby: params.createdby,
            Estado:1
        })
        //agregando DIRECCION
        await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 2,
            Id_entidad: params.entity,
            Valor: params.direccion,
            Createdby: params.createdby,
            Estado:1
        })
        //agregando CONTACTO
        await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 3,
            Id_entidad: params.entity,
            Valor: params.contacto,
            Createdby: params.createdby,
            Estado:1
        })
        //agregando TELEFONO CONTACTO
        await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 4,
            Id_entidad: params.entity,
            Valor: params.telefonocontacto,
            Createdby: params.createdby,
            Estado:1
        })
         //agregando GERENTE VENTAS
         await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 5,
            Id_entidad: params.entity,
            Valor: params.gerenteventas,
            Createdby: params.createdby,
            Estado:1
        })
        //agregando TELEFONO GERENTE VENTAS
        await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 6,
            Id_entidad: params.entity,
            Valor: params.telefonogerenteventas,
            Createdby: params.createdby,
            Estado:1
        })
        //agregando LOGO
        await db.models.ENTIDAD_CARACTERISTICA_STRING.create({
            Id_caracteristica: 7,
            Id_entidad: params.entity,
            Valor: params.logo,
            Createdby: params.createdby,
            Estado:1
        })
    }

    let editCompanyDetails = async(params) => {
        //editando desarrollador
        await db.models.ENTIDAD_CARACTERISTICA_INT.update({
            Valor: params.desarrollador,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 1,
                Id_entidad: params.entity,
            }
        })

        // editando NIT
        await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
            Valor: params.nit,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 1,
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
                Id_caracteristica: 2,
                Id_entidad: params.entity,
            }
        })
        //editando CONTACTO
        await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
            Valor: params.contacto,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 3,
                Id_entidad: params.entity,
            }
        })
        //editando TELEFONO CONTACTO
        await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
            Valor: params.telefonocontacto,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 4 ,
                Id_entidad: params.entity,
            }
        })
         //editando GERENTE VENTAS
         await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
            Valor: params.gerenteventas,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 5,
                Id_entidad: params.entity,
            }
        })
        //editando TELEFONO GERENTE VENTAS
        await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
            Valor: params.telefonogerenteventas,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Id_caracteristica: 6,
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
                Id_caracteristica: 7,
                Id_entidad: params.entity,
            }
        })
    }

    let editCompanyEntity = async(params) => {
         await db.models.ENTIDAD.update({
            Nombre: params.nombre,
            Descripcion: params.descripcion,
            Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
            Updatedby: params.updatedby
        },{
            where: {
                Estado: 1,
                Tipo: 1,
                Id: params.entity
            }
        })
    }
    let deleteCompanyEntity = async(params) => {
        await db.models.ENTIDAD.update({
        Estado:0,
           Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
           Updatedby: params.updatedby
       },{
           where: {
               Tipo: 1,
               Id: params.entity
           }
       })
   }
   let deleteCompanyDetails = async(params) => {
    //eliminando desarrollador
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

    // eliminando NIT
    await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
        Estado: 0,
        Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
        Updatedby: params.updatedby
    },{
        where: {
            Id_caracteristica: 1,
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
            Id_caracteristica: 2,
            Id_entidad: params.entity,
        }
    })
    //eliminando CONTACTO
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
    //eeliminando TELEFONO CONTACTO
    await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
        Estado: 0,
        Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
        Updatedby: params.updatedby
    },{
        where: {
            Id_caracteristica: 4 ,
            Id_entidad: params.entity,
        }
    })
     //eliminando GERENTE VENTAS
     await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
        Estado: 0,
        Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
        Updatedby: params.updatedby
    },{
        where: {
            Id_caracteristica: 5,
            Id_entidad: params.entity,
        }
    })
    //eliminando TELEFONO GERENTE VENTAS
    await db.models.ENTIDAD_CARACTERISTICA_STRING.update({
        Estado: 0,
        Updated_at: sequelize.literal('CURRENT_TIMESTAMP'),
        Updatedby: params.updatedby
    },{
        where: {
            Id_caracteristica: 6,
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
            Id_caracteristica: 7,
            Id_entidad: params.entity,
        }
    })
}
    return {
        getProyectModificadorbyCompany,
        getGroupModificador
    }

}

module.exports = ProyectRepository();