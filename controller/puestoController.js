const puestoService = require("../services/puestoService");
exports.listPuestos = async (req, res, next) => {
    try {
        let results = await puestoService.listPuestos();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: false,
            message: "No hay Roles Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };