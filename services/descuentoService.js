

const db = require("../src/models");
  
  let userRepository = function () {
    
    let creteTemporadaDescuento = async (params) => {
      const newTemporadaDescuento = await db.models.TEMPORADA_DESCUENTO.create({
        Temporada: params.nombreTemporada,
        Fecha_incial: params.fechaInicial,
        Fecha_final: params.fechaFinal,
        Status: params.status,
      });
      return newTemporadaDescuento;
    };

    let createConfiguracionDesc = async (params) => {
        const newConfiguracionDescuento = await db.models.CONFIGURACION_DESCUENTO.create({
        Id_temporada_descuento: params.idTemporadDesc,
        Id_proyecto: params.idProyecto,
        Meses: params.meses,
        Porcentaje: params.porcentaje,
        });
        return newConfiguracionDescuento;
      };
  
    let findDescuentosProyect = async (params) => {
    const descuentos = await db.models.CONFIGURACION_DESCUENTO.findAll({ 
        where: { Id_proyecto : params},
        include: [
            {
                model: db.models.TEMPORADA_DESCUENTO,
                where: { Status : 1},
                as: "Id_temporada_descuento_TEMPORADA_DESCUENTO",
                required: true
            },
        ], 
    });
    return descuentos;
    };

    let findAprodescuento = async (params) => {
        const aprobeDesc = await db.models.COTIZACION.findAll({ 
            where: { Solicitud_descuento : 0},
            // include: [
            //     {
            //         model: db.models.TEMPORADA_DESCUENTO,
            //         where: { Status : 1},
            //         as: "Id_temporada_descuento_TEMPORADA_DESCUENTO",
            //         required: true
            //     },
            // ], 
        });
        return aprobeDesc;
        };

    let denegarSolicitudDesc = async (params) => {
        const cotizacion = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params} });
  
        if(!cotizacion) {
           return
        } else {
            await db.models.COTIZACION.update({
                Solicitud_descuento: 1,
                Estado_descuento: 0,
          },{
            where:{
                Id_cotizacion: params
            }
        });
        }
        const cotizacionActulizada = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params } });
        return cotizacionActulizada
    };

    let aprobacionSolicitudDescuento = async (params) => {
        const cotizacion = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params} });
  
        if(!cotizacion) {
           return
        } else {
            await db.models.COTIZACION.update({
                Solicitud_descuento: 1,
                Estado_descuento: 1,
          },{
            where:{
                Id_cotizacion: params
            }
        });
        }
        const cotizacionActulizada = await db.models.COTIZACION.findOne({ where: { Id_cotizacion: params } });
        return cotizacionActulizada
    };


    let findEstadoSolicitudDes = async (params) => {
        console.log(params);
        const aprobeDesc = await db.models.COTIZACION.findAll({ 
            where: { Estado_descuento: params.state},
            // include: [
            //     {
            //         model: db.models.TEMPORADA_DESCUENTO,
            //         where: { Status : 1},
            //         as: "Id_temporada_descuento_TEMPORADA_DESCUENTO",
            //         required: true
            //     },
            // ], 
        });
        return aprobeDesc;
        };
    return {
        creteTemporadaDescuento,
        createConfiguracionDesc,
        findDescuentosProyect,
        findAprodescuento,
        denegarSolicitudDesc,
        aprobacionSolicitudDescuento,
        findEstadoSolicitudDes
    };
  };
  
  module.exports = userRepository();
  