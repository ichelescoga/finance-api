const empresaService = require("../services/empresaService");
exports.listEmpresas = async (req, res, next) => {
    try {
        let results = await empresaService.findEmpresas();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: false,
            message: "No hay Empresas Registradas",
          });
        }
      } catch (error) {
        next(error);
      }
  };



exports.createEmpresa = async (req, res, next) => {
  try {

    let params = {
      idEmpresa : req.body.idEmpresa,
      razonSocial: req.body.razonSocial,
      nombreComercial: req.body.nombreComercial,
      representanteLegal: req.body.representanteLegal,
      nit: req.body.nit,
      dpi: req.body.dpi,
      direccion: req.body.direccion,
      codigoPostal: req.body.codigoPostal,
      telefono: req.body.telefono,
      nombreContacto: req.body.nombreContacto,
      telefonoContacto: req.body.telefonoContacto,
      gerenteVentas: req.body.gerenteVentas,
      telefonoGerente: req.body.telefonoGerente,
      idPais: req.body.idPais,
      idDepartamento: req.body.idDepartamento,
      idMunicipio:req.body.idMunicipio,
    };


    await empresaService.createEmpresa(params);
    res.status(200).json({
      succes: true,
      message: "Empresa Creada con Exito",
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Empresa, intentelo de nuevo",
    });
  }
};

