const unidad = require("../services/unidadService");
const security = require("../src/utils/security");
const UserService = require("../services/userService");

exports.createUnidad = async (req, res, next) => {
  try {

    let params = {
      idEstado : 4,
      idProyecto: req.body.idProyecto,
      nombreUnidad: req.body.nombreUnidad,
      precioVenta: req.body.precioVenta,
    };

    await unidad.createUnidad(params);
    res.status(200).json({
      succes: true,
      message: "Unidad Creada con Exito",
    });
  } catch (error) {
    res.status(406).json({
      succes: false,
      message: "Problemas al crear Unidad, intentelo de nuevo",
    });
  }
};

exports.listUnidadProyecto = async (req, res, next) => {
  try {
    // let nonce = req.headers["authorization"];
    // let resultsToken = await security.decodeToken(nonce);
    // let findUser = await UserService.getUserByEmailSinPasswordBackend(resultsToken.email);

    let params = {
      idProyecto : req.params.id,
      // idEmpleadoAsesor: findUser[0].EMPLEADO_ASESORs[0].Id_empleado ? findUser[0].EMPLEADO_ASESORs[0].Id_empleado : null,
    };
    
      let results = await unidad.findUnidadesProyecto(params);
      const longitud = results.length;
  
      if (longitud >= 1) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay unidades Registrados",
        });
      }
    } catch (error) {
      next(error);
    }
};

exports.findOneUnidad = async (req, res, next) => {
  try {
      let results = await unidad.findOneUnidad(req.params.id);
      if (results) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "Unidad no existente",
        });
      }
    } catch (error) {
      next(error);
    }
};