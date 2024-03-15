
const db = require("../src/modelsA");
const sequelize = require('../components/conn_sqlz');
let RangoRepository = function () {
    let getRangos = async () => {
        return await  db.models.RANGO.findAll({
            where: {
                Estado: 1
            },
        });
    }
    let getRangoById = async (id) => {
        return await  db.models.RANGO.findAll({
            where: {
                Estado: 1,
                Id: id
            },
        });
    }

    let addRango = async (params) => {
        return await db.models.RANGO.create({
            Nombre: params.nombre,
            Maximo: params.maximo,
            Tiempo_maximo: params.tiempo_maximo,
            Tiempo_minimo: params.tiempo_minimo,
            Empleado: params.empleado,
            Tasa_comision: params.tasa_comision,
            Id_entidad: params.id_entidad,
            Createdby: params.createdby,
            Estado: 1
        })
    }
    let getRangoByCliente = async (id) => {
        return await  db.models.RANGO.findAll({
            where: {
                Estado: 1,
                Id_entidad: id
            },
        });
    }
    
return {
    getRangos,
    getRangoById,
    addRango,
    getRangoByCliente

}
}
module.exports = RangoRepository();