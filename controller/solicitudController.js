const SolicitudRepository = require("../repository/SolicitudRepository");
const security = require("../src/utils/security");
const createError = require("http-errors");
const moment = require('moment'); 

exports.addSolicitud = async(req, res, next)=>{
    try {
        
        let params = {
            tasa_interes: parseFloat(req.body.tasa_interes),
            tasa_comision: parseFloat(req.body.tasa_comision),
            nit: req.body.nit,
            empresa: req.body.empresa,
            no_factura: req.body.no_factura ,
            serie_factura: req.body.serie_factura,
            monto_factura: req.body.monto_factura,
            monto_solicitado: req.body.monto_solicitado,
            fecha_factura: moment(req.body.fecha_factura, 'DD/MM/YY').format('YYYY-MM-DD HH:mm:ss'),
            fecha_desembolso: moment(req.body.fecha_desembolso, 'DD/MM/YY').format('YYYY-MM-DD HH:mm:ss'),
            fecha_pago: moment(req.body.fecha_pago, 'DD/MM/YY').format('YYYY-MM-DD HH:mm:ss'), 
            dias_credito: req.body.dias_credito,
            comision: req.body.comision,
            intereses: req.body.intereses,
            monto_desembolsar: req.body.monto_desembolsar,
            factura: req.body.factura,
            carta_representante: req.body.carta_representante,
            id_entidad: req.body.id_entidad,
            createdby: req.body.createdby,
        }
        let solicitud = await SolicitudRepository.addSolicitudCredito(params)
        if(solicitud){
            res.json({
                succes: true,
                message: "Solicitud Creada con Exito",
              });
        }else{
            res.json({
                succes: true,
                message: "Solicitud No ha sido creada",
              });
        }
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}
