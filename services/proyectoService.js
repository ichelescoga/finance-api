const db = require("../src/models");

let userRepository = function () {

  let createProyecto = async (params) => {
    const newProyecto = await db.models.PROYECTO.create({
      Id_proyecto: params.id,
      Nombre_proyecto: params.nombreProyecto,
      Id_empresa: params.idEmpresa,
      Id_pais:params. idPais,
      Id_departamento: params.idDepartamento,
      Id_municipio: params.idMunicipio,
      Direccion: params.direccion,
      Coordenadas: params.coordenadas,
      Id_tipo_proyecto: params.idTipoProyecto
    });
    return newProyecto;
  };

  return {
    createProyecto
  };
};

module.exports = userRepository();
