const subProyectoService = require("../services/subProyectoService");

exports.createSubProyecto = async (req, res, next) => {
  try {

    let params = {
      idProyecto : req.body.idProyecto,
      cantidadUnidades: req.body.cantidadUnidades,
      fechaInicioVenta: req.body.fechaInicioVenta,
      fechaFinVenta: req.body.fechaFinVenta,
      costoPromedioUnidad: req.body.costoPromedioUnidad,
      costoTotalVenta: req.body.costoTotalVenta,
      logoProyecto: req.body.logoProyecto,
      descripcion: req.body.descripcion,
    };

    await subProyectoService.createSubProyecto(params);
    res.status(200).json({
      succes: true,
      message: "Sub SubProyecto Creado con Exito",
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear SubProyecto, intentelo de nuevo",
    });
  }
};

