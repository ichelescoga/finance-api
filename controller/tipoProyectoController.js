const tipoProyectoService = require("../services/tipoProyectoService");
exports.listTiposProyecto = async (req, res, next) => {
    try {
        let results = await tipoProyectoService.listTipoProyectos();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: false,
            message: "No hay tipos de Proyectos Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };