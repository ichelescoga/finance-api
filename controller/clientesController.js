const cliente = require("../services/clienteService");
exports.listClientes = async (req, res, next) => {
    try {
        let results = await cliente.listClientes();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
            message: "No hay clientes Registrados",
          });
        }
      } catch (error) {
        next(error);
      }
  };