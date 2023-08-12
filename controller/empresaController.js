const empresaService = require("../services/empresaService");
const proyectoService = require("../services/proyectoService");
exports.listEmpresas = async (req, res, next) => {
    try {
        let results = await empresaService.findEmpresas();
        const longitud = results.length;
    
        if (longitud >= 1) {
          res.json(results);
        } else {
          res.status(202).json({
            success: true,
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
      razonSocial: req.body.empresa.razonSocial,
      nombreComercial: req.body.empresa.nombreComercial,
      representanteLegal: req.body.empresa.representanteLegal,
      nit: req.body.empresa.nit,
      dpi: req.body.empresa.dpi,
      direccion: req.body.empresa.direccion,
      codigoPostal: req.body.empresa.codigoPostal,
      telefono: req.body.empresa.telefono,
      nombreContacto: req.body.empresa.nombreContacto,
      telefonoContacto: req.body.empresa.telefonoContacto,
      gerenteVentas: req.body.empresa.gerenteVentas,
      telefonoGerente: req.body.empresa.telefonoGerente,
      idPais: req.body.empresa.idPais,
      idDepartamento: req.body.empresa.idDepartamento,
      idMunicipio:req.body.empresa.idMunicipio,
    };


    let empresaPost = await empresaService.createEmpresa(params);

    let paramsProyecto = {
        nombreProyecto : req.body.proyecto.nombreProyecto,
        idEmpresa : empresaPost.Id_empresa,
        idPais: req.body.proyecto.idPais,
        idDepartamento: req.body.proyecto.idDepartamento,
        idMunicipio:req.body.proyecto.idMunicipio,
        direccion: req.body.proyecto.direccion,
        coordenadas: req.body.proyecto.coordenadas,
        idTipoProyecto: req.body.proyecto.idTipoProyecto,
        cantidadUnidades: req.body.proyecto.cantidadUnidades,
        fechaInicioVenta: req.body.proyecto.fechaInicioVenta,
        fechaFinVenta: req.body.proyecto.fechaFinVenta,
        costoPromedioUnidad: req.body.proyecto.costoPromedioUnidad,
        costoTotalVenta: req.body.proyecto.costoTotalVenta,
        logoProyecto: req.body.proyecto.logoProyecto,
        descripcion: req.body.proyecto.descripcion,
    }
    await proyectoService.createProyecto(paramsProyecto);
    res.status(200).json({
      succes: true,
      message: "Solicitud procesada con èxito",
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear su solicitud, intentelo de nuevo",
    });
  }
};

