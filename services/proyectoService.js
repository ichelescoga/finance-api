const db = require("../src/models");

let userRepository = function () {

  let createProyecto = async (params) => {
    const newProyecto = await db.models.PROYECTO.create({
      Nombre_proyecto: params.nombreProyecto,
      Id_empresa: params.idEmpresa,
      Id_pais:params. idPais,
      Id_departamento: params.idDepartamento,
      Id_municipio: params.idMunicipio,
      Direccion: params.direccion,
      Coordenadas: params.coordenadas,
      Id_tipo_proyecto: params.idTipoProyecto,
      Cantidad_unidades: params.cantidadUnidades,
      Fecha_inicio_venta: params.fechaInicioVenta,
      Fecha_fin_venta: params.fechaFinVenta,
      Costo_promedio_unidad: params.costoPromedioUnidad,
      Costo_total_venta: params.costoTotalVenta,
      Logo_proyecto: params.logoProyecto,
      Descripcion: params.descripcion,
    });
    return newProyecto;
  };

  return {
    createProyecto
  };
};

module.exports = userRepository();
