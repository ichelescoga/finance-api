const SolicitudRepository = require("../repository/SolicitudRepositoryA");
const security = require("../src/utils/security");
const createError = require("http-errors");
const moment = require('moment'); 

exports.addSolicitud = async(req, res, next)=>{
    try {
        
        let params = {
            tasa_comision: req.body.tasa_comision,
            codigo_empleado: req.body.codigo_empleado,
            monto: req.body.monto,
            fecha: moment(req.body.fecha, 'DD/MM/YY').format('YYYY-MM-DD HH:mm:ss'),
            fecha_desembolso: moment(req.body.fecha_desembolso, 'DD/MM/YY').format('YYYY-MM-DD HH:mm:ss'),
            fecha_pago: moment(req.body.fecha_pago, 'DD/MM/YY').format('YYYY-MM-DD HH:mm:ss'),
            comision: req.body.comision,
            monto_a_descontar: req.body.monto_a_descontar,
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

  exports.addRango = async(req, res, next)=>{
    try {

        let params = {
            nombre: req.body.nombre,
            maximo: req.body.maximo,
            tiempo_maximo: req.body.tiempo_maximo,
            tiempo_minimo: req.body.tiempo_minimo,
            empleado: req.body.empleado,
            tasa_comision: req.body.tasa_comision,
            id_entidad: req.body.id_entidad,
            createdby: req.body.createdby,
        }
        let solicitud = await SolicitudRepository.addRango(params)
        if(solicitud){
            res.json({
                succes: true,
                message: "Rango Creado con Exito",
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

exports.getRangosByEntity = async (req, res, next) => {
  try {
      let entidad = req.params.id
      let results = await SolicitudRepository.getRangosByEntity(entidad)
      if (results) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "Rango no existente",
        });
      }
    } catch (error) {
      next(error);
    }
};



exports.getRangoById = async (req, res, next) => {
  try {
      let entidad = req.params.id
      let results = await SolicitudRepository.getRangoById(entidad)
      if (results) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "Rango no existente",
        });
      }
    } catch (error) {
      next(error);
    }
};

exports.getEmpleadoEntidadById = async (req, res, next) => {
  try {

        id= req.params.id
      
      let cliente_ = await SolicitudRepository.getEmpleadoEntidadById(id)
      if(cliente_){
        let cliente_1 = await SolicitudRepository.getClienteDetailsStringById(id,52)
        let cliente_3= await SolicitudRepository.getClienteDetailsIntById(id,15)
        let detail = [cliente_,cliente_1, cliente_3];
        if(detail){
          res.json(detail);
        }else{
          res.status(202).json({
            success: true,
            message: "Error al obtener datos double del empleado",
          });
        }
      }else{
        res.status(202).json({
          success: true,
          message: "Error al obtener el empleado",
        });
      }
      
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