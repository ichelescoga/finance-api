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
    return {
        getSolicitudesByEstado,
        addSolicitudCredito,
        getSolicitudById,
        updateSolicitudStatus,
        addRango,
        getRangosByEntity,
        getRangoById
    }
}
module.exports = SolicitudRepositoryA();