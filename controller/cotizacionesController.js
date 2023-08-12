const cotizaciones = require("../services/cotizacionesService");
exports.listCotizaciones = async (req, res, next) => {
  try {
      let results = await cotizaciones.listaCotizaciones();
      const longitud = results.length;
  
      if (longitud >= 1) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay cotizaciones Registrados",
        });
      }
    } catch (error) {
      next(error);
    }
};

exports.creatCotizacion = async (req, res, next) => {
  try {

    let params = {
      idEstado : req.body.idEstado,
      idProyecto: req.body.idProyecto,
      nombreUnidad: req.body.nombreUnidad,
      precioVenta: req.body.precioVenta,
    };

    await unidad.createUnidad(params);
    res.status(200).json({
      succes: true,
      message: "Unidad Creada con Exito",
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Unidad, intentelo de nuevo",
    });
  }
};