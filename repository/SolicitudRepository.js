const db = require("../src/modelsF");
const sequelize = require('../components/conn_sqlz');
let SolicitudRepository = function () {
    let getSolicitudesByEstado = async (status, entidad) => {
        return await  db.models.SOLICITUD_CREDITO.findAll({
            where: {
                Estado: status,
                Id_entidad: entidad
            },
        });
    }

    let addSolicitudCredito = async (params) => {
        const monto_factura = params.monto_factura.replace(/,/g, '');
        const monto_solicitado = params.monto_solicitado.replace(/,/g, '');
        const intereses = params.intereses.replace(/,/g, '');
        const comision = params.comision.replace(/,/g, '');
        const monto_desembolsar = params.monto_desembolsar.replace(/,/g, '');
        return await db.models.SOLICITUD_CREDITO.create({
          Tasa_interes: parseFloat(params.tasa_interes),
          Tasa_comision: params.tasa_comision,
          NIT: params.nit,
          Empresa: params.empresa,
          No_Factura: params.no_factura ,
          Serie_Factura: params.serie_factura,
          Monto_factura: parseFloat(monto_factura),
          Fecha_factura: params.fecha_factura,
          Monto_solicitado: parseFloat(monto_solicitado),
          Fecha_desembolso: params.fecha_desembolso,
          Fecha_pago: params.fecha_pago, 
          Dias_credito: params.dias_credito,
          Comision: parseFloat(comision),
          Intereses: parseFloat(intereses),
          Monto_desembolsar: parseFloat(monto_desembolsar),
          Factura: params.factura,
          Carta_representante: params.carta_representante,
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
  

    return {
        getSolicitudesByEstado,
        addSolicitudCredito,
        getSolicitudById,
        updateSolicitudStatus
    }
}
module.exports = SolicitudRepository();