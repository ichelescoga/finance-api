const db = require("../src/modelsA");
const sequelize = require('../components/conn_sqlz');
const { parse } = require("path");
let SolicitudRepositoryA = function () {
    let getSolicitudesByEstado = async (status, entidad) => {
        return await  db.models.SOLICITUD_CREDITO.findAll({
            where: {
                Estado: status,
                Id_entidad: entidad
            },
        });
    }

    let addSolicitudCredito = async (params) => {
        const tasa_comision = params.tasa_comision.replace(/,/g, '');
        const monto = params.monto.replace(/,/g, '');
        const comision = params.comision.replace(/,/g, '');
        const monto_a_descontar = params.monto_a_descontar.replace(/,/g, '');
        return await db.models.SOLICITUD_CREDITO.create({
          Tasa_comision: parseFloat(tasa_comision),
          Codigo_empleado: params.codigo_empleado,
          Monto: parseFloat(monto),
          Fecha: params.fecha,
          Fecha_desembolso: params.fecha_desembolso,
          Fecha_pago: params.fecha_pago, 
          Comision: parseFloat(comision),
          Monto_a_descontar: parseFloat(monto_a_descontar),
          Id_entidad: params.id_entidad,
          Createdby: params.createdby,
          Estado: 1
        })
    }

    let getSolicitudById= async (id) => {
        return await  db.models.SOLICITUD_CREDITO.findOne({
            where: {
                Id: id
            },
        });
    }

    let updateSolicitudStatus= async (params) => {
        await db.models.SOLICITUD_CREDITO.update({
            Estado: params.status
        },{
            where: {
                Id: params.id
            }
        })
    }
  
    let addRango = async (params) => {
        const maximo = params.maximo.replace(/,/g, '');
        const tasa_comision = params.tasa_comision.replace(/,/g, '');
        return await db.models.RANGO.create({
          Nombre: params.nombre,
          Maximo: parseFloat(maximo),
          Tiempo_maximo: params.tiempo_maximo,
          Tiempo_minimo: params.tiempo_minimo,
          Empleado: params.empleado,
          Tasa_comision: parseFloat(tasa_comision),
          Id_entidad: params.id_entidad,
          Createdby: params.createdby,
          Estado: 1
        })
    }
    let getRangosByEntity= async (id) => {
        return await  db.models.RANGO.findAll({
            where: {
                Estado: 1,
                Id_entidad: id
            },
        });
    }
    let getRangoById= async (id) => {
        return await  db.models.RANGO.findOne({
            where: {
                Estado: 1,
                Id: id
            },
        });
    }
    let getClienteEntidadById= async (id) => {
        return await  db.models.ENTIDAD.findOne({
            attributes: [
                "Id",
                "Nombre",
                "Descripcion"
            ],
            where: {
                Id: id,
                Tipo: 8,
                Estado: 1
            },
        });
    }

    let getClienteDetailsDoubleById= async (id_entidad,id_caracteristica) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_DOUBLE.findOne({
            attributes: [
                [sequelize.literal( "(SELECT Nombre FROM CARACTERISTICA_DOUBLE as c WHERE c.Id = ENTIDAD_CARACTERISTICA_DOUBLE.Id_caracteristica )"), 'Caracteristica'],
                "Valor"
            ],
            where: {
                Id_entidad: id_entidad,
                Id_caracteristica: id_caracteristica,
                Estado: 1
            },
        });
    }
    
    let getEmpleadoEntidadById= async (id) => {
        return await  db.models.ENTIDAD.findOne({
            attributes: [
                "Id",
                "Nombre"
            ],
            where: {
                Id: id,
                Tipo: 20,
                Estado: 1
            },
        });
    }

    let getClienteDetailsStringById= async (id_entidad,id_caracteristica) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_STRING.findOne({
            attributes: [
                [sequelize.literal( "(SELECT Nombre FROM CARACTERISTICA_STRING as c WHERE c.Id = ENTIDAD_CARACTERISTICA_STRING.Id_caracteristica )"), 'Caracteristica'],
                "Valor"
            ],
            where: {
                Id_entidad: id_entidad,
                Id_caracteristica: id_caracteristica,
                Estado: 1
            },
        });
    }
    let getClienteDetailsIntById= async (id_entidad,id_caracteristica) => {
        return await  db.models.ENTIDAD_CARACTERISTICA_INT.findOne({
            attributes: [
                [sequelize.literal( "(SELECT Nombre FROM CARACTERISTICA_INT as c WHERE c.Id = ENTIDAD_CARACTERISTICA_INT.Id_caracteristica )"), 'Caracteristica'],
                "Valor"
            ],
            where: {
                Id_entidad: id_entidad,
                Id_caracteristica: id_caracteristica,
                Estado: 1
            },
        });
    }
    return {
        getSolicitudesByEstado,
        addSolicitudCredito,
        getSolicitudById,
        updateSolicitudStatus,
        addRango,
        getRangosByEntity,
        getRangoById,
        getClienteEntidadById,
        getClienteDetailsDoubleById,
        getEmpleadoEntidadById,
        getClienteDetailsStringById,
        getClienteDetailsIntById
    }
}
module.exports = SolicitudRepositoryA();