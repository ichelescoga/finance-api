const municipioService = require("../services/municipioService");
exports.listMunicipios = async (req, res, next) => {
    try {
        let id = req.params.id_departamento
        let results = await municipioService.findMunicipios(id);
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay Municipios Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };