const aplicacionCredito = require("../services/creditoService");
const cotizacionServi = require("../services/cotizacionesService");
const clienteService = require("../services/clienteService");
// const security = require("../src/utils/security");
// const UserService = require("../services/userService");

exports.createAplicacionCredito = async (req, res, next) => {
  try {

    let params = {
      idCotizacion: req.body.idCotizacion,
      idCliente: req.body.idCliente,
      fotoDpiEnfrente: req.body.fotoDpiEnfrente,
      fotoDpiReverso: req.body.fotoDpiReverso,
      estado: req.body.estado,
      idDetalleFiador: req.body.idDetalleFiador,
      empresa: req.body.empresa,
      sueldo: req.body.sueldo,
      fechaIngreso: req.body.fechaIngreso,
      dpi: req.body.dpi,
      nit: req.body.nit,
    };

    await aplicacionCredito.createAplicarCredito(params);
    res.status(200).json({
      succes: true,
      message: "Aplicacion Credito Creado con Exito",
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al aplicar Credito, intentelo de nuevo",
    });
  }
};

exports.updateApliCredito = async (req, res, next) => {
    try {

      let cotizacion = await cotizacionServi.findOneCotizacion(req.body.idCotizacion)
      if (cotizacion.Id_cliente) {
        let paramsUpdate  = {
          id: cotizacion.Id_cliente,
          puesto: req.body.puesto,
          fechaNacimiento: req.body.fechaNacimiento,
        };
        await clienteService.updateCliente(paramsUpdate)
      }


      let params = {
        id: req.params.id,
        idCotizacion: req.body.idCotizacion,
        idCliente: cotizacion.Id_cliente ? cotizacion.Id_cliente : null,
        fotoDpiEnfrente: req.body.fotoDpiEnfrente,
        fotoDpiReverso: req.body.fotoDpiReverso,
        estado: req.body.estado,
        idDetalleFiador: req.body.idDetalleFiador,
        empresa: req.body.empresa,
        sueldo: req.body.sueldo,
        fechaIngreso: req.body.fechaIngreso,
        dpi: req.body.dpi,
        nit: req.body.nit,
      };
  
  
      let cotizacionUpdate  =  await aplicacionCredito.updateAplicacionCredito(params);
      if (cotizacionUpdate) {
        res.status(200).json({
          succes: true,
          message: "Aplicacion Credito actualizado con exito",
          body: cotizacionUpdate
        });
      } else {
        res.status(404).json({
          succes: true,
          message: "Aplicacion Credito No existente",
        });
      }
      
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: error,
      });
    }
  };

  exports.findOneAplicacionCredito = async (req, res, next) => {
    try {
        let results = await aplicacionCredito.findOneCredito(req.params.id);
        if (results) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "Aplicacion credito no existente",
          });
        }
      } catch (error) {
        next(error);
      }
  };