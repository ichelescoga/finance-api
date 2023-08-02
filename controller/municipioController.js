const municipioService = require("../services/municipioService");
exports.listMunicipios = async (req, res, next) => {
    try {
        let results = await municipioService.findMunicipios();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: false,
            message: "No hay Municipios Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };