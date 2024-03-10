const SolicitudRepository = require("../repository/SolicitudRepository");
const security = require("../src/utils/security");
const createError = require("http-errors");
const moment = require('moment'); 
const { convertArrayInObject } = require("../src/utils/convertStringInObject");

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

exports.getSolicitudesByEstado = async (req, res, next) => {
    try {
        let estado = req.params.id
        let entidad = req.params.entidad
        let results = await SolicitudRepository.getSolicitudesByEstado(estado,entidad)
        if (results) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "Unidad no existente",
          });
        }
      } catch (error) {
        next(error);
      }
  };

  exports.getSolicitudById = async (req, res, next) => {
    try {
        let id = req.params.id
        let results = await SolicitudRepository.getSolicitudById(id)
        if (results) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "Unidad no existente",
          });
        }
      } catch (error) {
        next(error);
      }
  };

  exports.updateEstadoSolicitud = async (req, res, next) => {
    try {
        let params =
        {
            id: req.body.id,
            status: req.body.estado
        }
        await SolicitudRepository.updateSolicitudStatus(params)
      
            res.status(202).json({
                success: true,
                message: "Se ha actualizado correctamente el estado de la solicutd",
              });
        
      } catch (error) {
        next(error);
      }
  };

  exports.getClientebyId = async (req, res, next) => {
    try {

          id= req.params.id
        
        let cliente_ = await SolicitudRepository.getClienteEntidadById(id)
        if(cliente_){
          let cliente_1 = await SolicitudRepository.getClienteDetailsDoubleById(id,1)
          let cliente_3= await SolicitudRepository.getClienteDetailsDoubleById(id,3)
          let cliente_4 = await SolicitudRepository.getClienteDetailsDoubleById(id,4)
          let detail = [cliente_,cliente_1, cliente_3, cliente_4];
          if(detail){
            res.json(detail);
          }else{
            res.status(202).json({
              success: true,
              message: "Error al obtener datos double del cliente",
            });
          }
        }else{
          res.status(202).json({
            success: true,
            message: "Error al obtener el cliente",
          });
        }
        
      } catch (error) {
        next(error);
      }
  };