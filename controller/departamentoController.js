const departamentoService = require("../services/departamentoService");
exports.listDepartamentos = async (req, res, next) => {
    try {
        let results = await departamentoService.findDepartamentos();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay Departamentos Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };