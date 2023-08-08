const entidadesFinanciera = require("../services/entidadesFinancierasService");
exports.listEntidadesFinancieras = async (req, res, next) => {
    try {
        let results = await entidadesFinanciera.findEntidadesFinancieras();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay Entidades Financieras Registradas",
          });
        }
      } catch (error) {
        next(error);
      }
  };