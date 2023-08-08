const tipoCredito = require("../services/tipoCreditoService");
exports.listaTiposCredito = async (req, res, next) => {
    try {
        let results = await tipoCredito.findtipoCreditos();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay Tipos de Creditos Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };