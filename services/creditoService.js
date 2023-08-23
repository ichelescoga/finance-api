

const db = require("../src/models");
  
  let userRepository = function () {
    
    let createAplicarCredito = async (params) => {
      const newCredito = await db.models.APLICACION.create({
        Id_cotizacion: params.idCotizacion,
        Id_cliente: params.idCliente,
        Foto_DPI_enfrente: params.fotoDpiEnfrente,
        Foto_DPI_reverso: params.fotoDpiReverso,
        Estado: params.estado,
        Id_dtalle_fiador: params.idDetalleFiador,
        Empresa: params.empresa,
        Sueldo: params.sueldo,
        Fecha_ingreso: params.fechaIngreso,
        DPI: params.dpi,
        NIT: params.nit,
      });
      return newCredito;
    };

    let updateAplicacionCredito = async (params) => {
        const aplicacionCredito = await db.models.APLICACION.findOne({ where: { Id_aplicacion: params.id } });
  
        if(!aplicacionCredito) {
           return
        } else {
            await db.models.APLICACION.update({
                Id_cotizacion: params.idCotizacion,
                Id_cliente: params.idCliente,
                Foto_DPI_enfrente: params.fotoDpiEnfrente,
                Foto_DPI_reverso: params.fotoDpiReverso,
                Estado: params.estado,
                Id_dtalle_fiador: params.idDetalleFiador,
                Empresa: params.empresa,
                Sueldo: params.sueldo,
                Fecha_ingreso: params.fechaIngreso,
                DPI: params.dpi,
                NIT: params.nit,
          },{
            where:{
                Id_aplicacion: params.id
            }
        });
        }
        const aplicacionCreditoActualizado = await db.models.APLICACION.findOne({ where: { Id_aplicacion: params.id } });
        return aplicacionCreditoActualizado
      };
  

      let findOneCredito = async (params) => {
        const credito = await db.models.APLICACION.findOne({ 
          where: { Id_cotizacion: params },
          include: [
            {
              model: db.models.CLIENTE,
              as: "Id_cliente_CLIENTE",
              requerid: false
            },
          ], 
        });
        return credito;
      };
  
    return {
        updateAplicacionCredito,
        createAplicarCredito,
        findOneCredito
    };
  };
  
  module.exports = userRepository();
  