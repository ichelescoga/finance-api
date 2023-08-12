const asesoresService = require("../services/asesoresService");
exports.listAsesores = async (req, res, next) => {
try {
    let results = await asesoresService.listAsesores();
    const longitud = results.length;

    if (longitud >= 1) {
        res.json(results);
    } else {
        res.status(202).json({
        success: true,
        message: "No hay Asesores Registrados",
        });
    }
    } catch (error) {
    next(error);
    }
};


exports.createAsesor = async (req, res, next) => {
    try {
  
      let paramsEmpleadoAsesor = {
        idUser: req.body.idUser,
        primerNombre: req.body.primerNombre,
        segundoNombre: req.body.segundoNombre,
        otrosNombres: req.body.otrosNombres,
        primerApellido: req.body.primerApellido,
        segundoApellido: req.body.segundoApellido,
        apellidoCasada: req.body.apellidoCasada,
        nit: req.body.nit,
        dpi: req.body.dpi,
        telefono: req.body.telefono,
        correo: req.body.correo,
        foto: req.body.foto,
        idPuesto: req.body.idPuesto,
        interno: req.body.interno,
      };
  
  
      let empleadoAsesor = await asesoresService.createAsesor(paramsEmpleadoAsesor);

      let paramsAsesorDetalle = {
        idEmpleado: empleadoAsesor.Id_empleado,
        comision: req.body.comision,
        metaVenta: req.body.metaVenta,
      };
      await asesoresService.createAsesorDetalle(paramsAsesorDetalle);

      res.status(200).json({
        succes: true,
        message: "Asesor Creado con Exito",
      });
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear Asesor, intentelo de nuevo",
      });
    }
  };
  