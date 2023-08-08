const planFinanProyect = require("../services/planFinanProyService");

exports.createPlanFinancieroProyecto = async (req, res, next) => {
    try {
  
      let params = {
        idEntFinanciera : req.body.idEntFinanciera,
        idTipoCredito: req.body.idTipoCredito,
        tasaInteres: req.body.tasaInteres,
        mesesMaximo : req.body.mesesMaximo,
        pagosEspeciales: req.body.pagosEspeciales,
        engancheMinimo: req.body.engancheMinimo,
        idProyecto : req.body.idProyecto,
        idEmpresa: req.body.idEmpresa,
      };

      let planFinanProy = await planFinanProyect.createPlanFinancieroProy(params);
      res.status(200).json({
        succes: true,
        message: "Plan finaciero creado con exito",
        body: planFinanProy
      });
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear Plan finaciero, intentelo de nuevo",
      });
    }
  };