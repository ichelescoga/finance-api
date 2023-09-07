var DataTypes = require("sequelize").DataTypes;
var _APLICACION = require("./APLICACION");
var _ASESOR_DETALLE = require("./ASESOR_DETALLE");
var _CLIENTE = require("./CLIENTE");
var _COMPRA_VENTA = require("./COMPRA_VENTA");
var _COTIZACION = require("./COTIZACION");
var _DEPARTAMENTO = require("./DEPARTAMENTO");
var _DETALLE_COTIZACION = require("./DETALLE_COTIZACION");
var _DETALLE_EJECUTIVO = require("./DETALLE_EJECUTIVO");
var _DETALLE_FIADOR = require("./DETALLE_FIADOR");
var _EJECUTIVO = require("./EJECUTIVO");
var _EMPLEADO_ASESOR = require("./EMPLEADO_ASESOR");
var _EMPLEADO_EMPRESA = require("./EMPLEADO_EMPRESA");
var _EMPRESA = require("./EMPRESA");
var _ENTIDAD_FINANCIERA = require("./ENTIDAD_FINANCIERA");
var _ESTADO = require("./ESTADO");
var _FAMILIA = require("./FAMILIA");
var _GENERO = require("./GENERO");
var _MUNICIPIO = require("./MUNICIPIO");
var _PAIS = require("./PAIS");
var _PARENTESCO = require("./PARENTESCO");
var _PLAN_FINANCIERO_PROY = require("./PLAN_FINANCIERO_PROY");
var _PROYECTO = require("./PROYECTO");
var _PUESTO = require("./PUESTO");
var _REFERENCIA = require("./REFERENCIA");
var _ROL = require("./ROL");
var _TIPO_CREDITO = require("./TIPO_CREDITO");
var _TIPO_PROYECTO = require("./TIPO_PROYECTO");
var _UNIDAD = require("./UNIDAD");
var _UNIDAD_COTIZACION = require("./UNIDAD_COTIZACION");
var _USER_PROFILE = require("./USER_PROFILE");
var _User = require("./User");

function initModels(sequelize) {
  var APLICACION = _APLICACION(sequelize, DataTypes);
  var ASESOR_DETALLE = _ASESOR_DETALLE(sequelize, DataTypes);
  var CLIENTE = _CLIENTE(sequelize, DataTypes);
  var COMPRA_VENTA = _COMPRA_VENTA(sequelize, DataTypes);
  var COTIZACION = _COTIZACION(sequelize, DataTypes);
  var DEPARTAMENTO = _DEPARTAMENTO(sequelize, DataTypes);
  var DETALLE_COTIZACION = _DETALLE_COTIZACION(sequelize, DataTypes);
  var DETALLE_EJECUTIVO = _DETALLE_EJECUTIVO(sequelize, DataTypes);
  var DETALLE_FIADOR = _DETALLE_FIADOR(sequelize, DataTypes);
  var EJECUTIVO = _EJECUTIVO(sequelize, DataTypes);
  var EMPLEADO_ASESOR = _EMPLEADO_ASESOR(sequelize, DataTypes);
  var EMPLEADO_EMPRESA = _EMPLEADO_EMPRESA(sequelize, DataTypes);
  var EMPRESA = _EMPRESA(sequelize, DataTypes);
  var ENTIDAD_FINANCIERA = _ENTIDAD_FINANCIERA(sequelize, DataTypes);
  var ESTADO = _ESTADO(sequelize, DataTypes);
  var FAMILIA = _FAMILIA(sequelize, DataTypes);
  var GENERO = _GENERO(sequelize, DataTypes);
  var MUNICIPIO = _MUNICIPIO(sequelize, DataTypes);
  var PAIS = _PAIS(sequelize, DataTypes);
  var PARENTESCO = _PARENTESCO(sequelize, DataTypes);
  var PLAN_FINANCIERO_PROY = _PLAN_FINANCIERO_PROY(sequelize, DataTypes);
  var PROYECTO = _PROYECTO(sequelize, DataTypes);
  var PUESTO = _PUESTO(sequelize, DataTypes);
  var REFERENCIA = _REFERENCIA(sequelize, DataTypes);
  var ROL = _ROL(sequelize, DataTypes);
  var TIPO_CREDITO = _TIPO_CREDITO(sequelize, DataTypes);
  var TIPO_PROYECTO = _TIPO_PROYECTO(sequelize, DataTypes);
  var UNIDAD = _UNIDAD(sequelize, DataTypes);
  var UNIDAD_COTIZACION = _UNIDAD_COTIZACION(sequelize, DataTypes);
  var USER_PROFILE = _USER_PROFILE(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);

  COTIZACION.belongsToMany(UNIDAD, { as: 'Id_unidad_UNIDADs', through: UNIDAD_COTIZACION, foreignKey: "Id_cotizacion", otherKey: "Id_unidad" });
  EMPLEADO_ASESOR.belongsToMany(EMPRESA, { as: 'Id_empresa_EMPRESAs', through: EMPLEADO_EMPRESA, foreignKey: "Id_empleado", otherKey: "Id_empresa" });
  EMPRESA.belongsToMany(EMPLEADO_ASESOR, { as: 'Id_empleado_EMPLEADO_ASESORs', through: EMPLEADO_EMPRESA, foreignKey: "Id_empresa", otherKey: "Id_empleado" });
  EMPRESA.belongsToMany(PROYECTO, { as: 'Id_proyecto_PROYECTOs', through: PLAN_FINANCIERO_PROY, foreignKey: "Id_empresa", otherKey: "Id_proyecto" });
  ESTADO.belongsToMany(PROYECTO, { as: 'Id_proyecto_PROYECTO_UNIDADs', through: UNIDAD, foreignKey: "Id_estado", otherKey: "Id_proyecto" });
  PLAN_FINANCIERO_PROY.belongsToMany(PUESTO, { as: 'Id_puesto_PUESTOs', through: EJECUTIVO, foreignKey: "Id_plan_financiero", otherKey: "Id_puesto" });
  PROYECTO.belongsToMany(EMPRESA, { as: 'Id_empresa_EMPRESA_PLAN_FINANCIERO_PROYs', through: PLAN_FINANCIERO_PROY, foreignKey: "Id_proyecto", otherKey: "Id_empresa" });
  PROYECTO.belongsToMany(ESTADO, { as: 'Id_estado_ESTADOs', through: UNIDAD, foreignKey: "Id_proyecto", otherKey: "Id_estado" });
  PUESTO.belongsToMany(PLAN_FINANCIERO_PROY, { as: 'Id_plan_financiero_PLAN_FINANCIERO_PROYs', through: EJECUTIVO, foreignKey: "Id_puesto", otherKey: "Id_plan_financiero" });
  UNIDAD.belongsToMany(COTIZACION, { as: 'Id_cotizacion_COTIZACIONs', through: UNIDAD_COTIZACION, foreignKey: "Id_unidad", otherKey: "Id_cotizacion" });
  DETALLE_FIADOR.belongsTo(APLICACION, { as: "Id_aplicacion_APLICACION", foreignKey: "Id_aplicacion"});
  APLICACION.hasMany(DETALLE_FIADOR, { as: "DETALLE_FIADORs", foreignKey: "Id_aplicacion"});
  COTIZACION.belongsTo(ASESOR_DETALLE, { as: "Id_detalle_asesor_ASESOR_DETALLE", foreignKey: "Id_detalle_asesor"});
  ASESOR_DETALLE.hasMany(COTIZACION, { as: "COTIZACIONs", foreignKey: "Id_detalle_asesor"});
  APLICACION.belongsTo(CLIENTE, { as: "Id_cliente_CLIENTE", foreignKey: "Id_cliente"});
  CLIENTE.hasMany(APLICACION, { as: "APLICACIONs", foreignKey: "Id_cliente"});
  COTIZACION.belongsTo(CLIENTE, { as: "Id_cliente_CLIENTE", foreignKey: "Id_cliente"});
  CLIENTE.hasMany(COTIZACION, { as: "COTIZACIONs", foreignKey: "Id_cliente"});
  DETALLE_FIADOR.belongsTo(CLIENTE, { as: "Id_cliente_CLIENTE", foreignKey: "Id_cliente"});
  CLIENTE.hasMany(DETALLE_FIADOR, { as: "DETALLE_FIADORs", foreignKey: "Id_cliente"});
  FAMILIA.belongsTo(CLIENTE, { as: "Id_clinete_CLIENTE", foreignKey: "Id_clinete"});
  CLIENTE.hasMany(FAMILIA, { as: "FAMILIa", foreignKey: "Id_clinete"});
  USER_PROFILE.belongsTo(CLIENTE, { as: "Id_cliente_CLIENTE", foreignKey: "Id_cliente"});
  CLIENTE.hasMany(USER_PROFILE, { as: "USER_PROFILEs", foreignKey: "Id_cliente"});
  REFERENCIA.belongsTo(COMPRA_VENTA, { as: "Id_compraventa_COMPRA_VENTum", foreignKey: "Id_compraventa"});
  COMPRA_VENTA.hasMany(REFERENCIA, { as: "REFERENCIa", foreignKey: "Id_compraventa"});
  APLICACION.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(APLICACION, { as: "APLICACIONs", foreignKey: "Id_cotizacion"});
  COMPRA_VENTA.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(COMPRA_VENTA, { as: "COMPRA_VENTa", foreignKey: "Id_cotizacion"});
  DETALLE_COTIZACION.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(DETALLE_COTIZACION, { as: "DETALLE_COTIZACIONs", foreignKey: "Id_cotizacion"});
  UNIDAD_COTIZACION.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(UNIDAD_COTIZACION, { as: "UNIDAD_COTIZACIONs", foreignKey: "Id_cotizacion"});
  EMPRESA.belongsTo(DEPARTAMENTO, { as: "Id_departamento_DEPARTAMENTO", foreignKey: "Id_departamento"});
  DEPARTAMENTO.hasMany(EMPRESA, { as: "EMPRESAs", foreignKey: "Id_departamento"});
  APLICACION.belongsTo(DETALLE_FIADOR, { as: "Id_dtalle_fiador_DETALLE_FIADOR", foreignKey: "Id_dtalle_fiador"});
  DETALLE_FIADOR.hasMany(APLICACION, { as: "APLICACIONs", foreignKey: "Id_dtalle_fiador"});
  APLICACION.belongsTo(EJECUTIVO, { as: "Id_ejecutivo_EJECUTIVO", foreignKey: "Id_ejecutivo"});
  EJECUTIVO.hasMany(APLICACION, { as: "APLICACIONs", foreignKey: "Id_ejecutivo"});
  USER_PROFILE.belongsTo(EJECUTIVO, { as: "Id_ejecutivo_EJECUTIVO", foreignKey: "Id_ejecutivo"});
  EJECUTIVO.hasMany(USER_PROFILE, { as: "USER_PROFILEs", foreignKey: "Id_ejecutivo"});
  ASESOR_DETALLE.belongsTo(EMPLEADO_ASESOR, { as: "Id_empleado_EMPLEADO_ASESOR", foreignKey: "Id_empleado"});
  EMPLEADO_ASESOR.hasMany(ASESOR_DETALLE, { as: "ASESOR_DETALLEs", foreignKey: "Id_empleado"});
  EMPLEADO_EMPRESA.belongsTo(EMPLEADO_ASESOR, { as: "Id_empleado_EMPLEADO_ASESOR", foreignKey: "Id_empleado"});
  EMPLEADO_ASESOR.hasMany(EMPLEADO_EMPRESA, { as: "EMPLEADO_EMPRESAs", foreignKey: "Id_empleado"});
  USER_PROFILE.belongsTo(EMPLEADO_ASESOR, { as: "Id_empleado_EMPLEADO_ASESOR", foreignKey: "Id_empleado"});
  EMPLEADO_ASESOR.hasMany(USER_PROFILE, { as: "USER_PROFILEs", foreignKey: "Id_empleado"});
  EMPLEADO_EMPRESA.belongsTo(EMPRESA, { as: "Id_empresa_EMPRESA", foreignKey: "Id_empresa"});
  EMPRESA.hasMany(EMPLEADO_EMPRESA, { as: "EMPLEADO_EMPRESAs", foreignKey: "Id_empresa"});
  PLAN_FINANCIERO_PROY.belongsTo(EMPRESA, { as: "Id_empresa_EMPRESA", foreignKey: "Id_empresa"});
  EMPRESA.hasMany(PLAN_FINANCIERO_PROY, { as: "PLAN_FINANCIERO_PROYs", foreignKey: "Id_empresa"});
  PROYECTO.belongsTo(EMPRESA, { as: "Id_empresa_EMPRESA", foreignKey: "Id_empresa"});
  EMPRESA.hasMany(PROYECTO, { as: "PROYECTOs", foreignKey: "Id_empresa"});
  EJECUTIVO.belongsTo(ENTIDAD_FINANCIERA, { as: "Id_ent_financiera_ENTIDAD_FINANCIERA", foreignKey: "Id_ent_financiera"});
  ENTIDAD_FINANCIERA.hasMany(EJECUTIVO, { as: "EJECUTIVOs", foreignKey: "Id_ent_financiera"});
  PLAN_FINANCIERO_PROY.belongsTo(ENTIDAD_FINANCIERA, { as: "Id_ent_financiera_ENTIDAD_FINANCIERA", foreignKey: "Id_ent_financiera"});
  ENTIDAD_FINANCIERA.hasMany(PLAN_FINANCIERO_PROY, { as: "PLAN_FINANCIERO_PROYs", foreignKey: "Id_ent_financiera"});
  COTIZACION.belongsTo(ESTADO, { as: "Id_estado_ESTADO", foreignKey: "Id_estado"});
  ESTADO.hasMany(COTIZACION, { as: "COTIZACIONs", foreignKey: "Id_estado"});
  UNIDAD.belongsTo(ESTADO, { as: "Id_estado_ESTADO", foreignKey: "Id_estado"});
  ESTADO.hasMany(UNIDAD, { as: "UNIDADs", foreignKey: "Id_estado"});
  CLIENTE.belongsTo(GENERO, { as: "Id_genero_GENERO", foreignKey: "Id_genero"});
  GENERO.hasMany(CLIENTE, { as: "CLIENTEs", foreignKey: "Id_genero"});
  EMPRESA.belongsTo(MUNICIPIO, { as: "Id_municipio_MUNICIPIO", foreignKey: "Id_municipio"});
  MUNICIPIO.hasMany(EMPRESA, { as: "EMPRESAs", foreignKey: "Id_municipio"});
  CLIENTE.belongsTo(PAIS, { as: "Id_nacionalidad_PAI", foreignKey: "Id_nacionalidad"});
  PAIS.hasMany(CLIENTE, { as: "CLIENTEs", foreignKey: "Id_nacionalidad"});
  EMPRESA.belongsTo(PAIS, { as: "Id_pais_PAI", foreignKey: "Id_pais"});
  PAIS.hasMany(EMPRESA, { as: "EMPRESAs", foreignKey: "Id_pais"});
  FAMILIA.belongsTo(PAIS, { as: "Id_nacionalidad_PAI", foreignKey: "Id_nacionalidad"});
  PAIS.hasMany(FAMILIA, { as: "FAMILIa", foreignKey: "Id_nacionalidad"});
  DETALLE_FIADOR.belongsTo(PARENTESCO, { as: "Id_parentesco_PARENTESCO", foreignKey: "Id_parentesco"});
  PARENTESCO.hasMany(DETALLE_FIADOR, { as: "DETALLE_FIADORs", foreignKey: "Id_parentesco"});
  FAMILIA.belongsTo(PARENTESCO, { as: "Id_parentesco_PARENTESCO", foreignKey: "Id_parentesco"});
  PARENTESCO.hasMany(FAMILIA, { as: "FAMILIa", foreignKey: "Id_parentesco"});
  COTIZACION.belongsTo(PLAN_FINANCIERO_PROY, { as: "Id_plan_financiero_PLAN_FINANCIERO_PROY", foreignKey: "Id_plan_financiero"});
  PLAN_FINANCIERO_PROY.hasMany(COTIZACION, { as: "COTIZACIONs", foreignKey: "Id_plan_financiero"});
  EJECUTIVO.belongsTo(PLAN_FINANCIERO_PROY, { as: "Id_plan_financiero_PLAN_FINANCIERO_PROY", foreignKey: "Id_plan_financiero"});
  PLAN_FINANCIERO_PROY.hasMany(EJECUTIVO, { as: "EJECUTIVOs", foreignKey: "Id_plan_financiero"});
  PLAN_FINANCIERO_PROY.belongsTo(PROYECTO, { as: "Id_proyecto_PROYECTO", foreignKey: "Id_proyecto"});
  PROYECTO.hasMany(PLAN_FINANCIERO_PROY, { as: "PLAN_FINANCIERO_PROYs", foreignKey: "Id_proyecto"});
  UNIDAD.belongsTo(PROYECTO, { as: "Id_proyecto_PROYECTO", foreignKey: "Id_proyecto"});
  PROYECTO.hasMany(UNIDAD, { as: "UNIDADs", foreignKey: "Id_proyecto"});
  EJECUTIVO.belongsTo(PUESTO, { as: "Id_puesto_PUESTO", foreignKey: "Id_puesto"});
  PUESTO.hasMany(EJECUTIVO, { as: "EJECUTIVOs", foreignKey: "Id_puesto"});
  EMPLEADO_ASESOR.belongsTo(PUESTO, { as: "Id_puesto_PUESTO", foreignKey: "Id_puesto"});
  PUESTO.hasMany(EMPLEADO_ASESOR, { as: "EMPLEADO_ASESORs", foreignKey: "Id_puesto"});
  USER_PROFILE.belongsTo(ROL, { as: "Id_rol_ROL", foreignKey: "Id_rol"});
  ROL.hasMany(USER_PROFILE, { as: "USER_PROFILEs", foreignKey: "Id_rol"});
  PLAN_FINANCIERO_PROY.belongsTo(TIPO_CREDITO, { as: "Id_tipo_credito_TIPO_CREDITO", foreignKey: "Id_tipo_credito"});
  TIPO_CREDITO.hasMany(PLAN_FINANCIERO_PROY, { as: "PLAN_FINANCIERO_PROYs", foreignKey: "Id_tipo_credito"});
  PROYECTO.belongsTo(TIPO_PROYECTO, { as: "Id_tipo_proyecto_TIPO_PROYECTO", foreignKey: "Id_tipo_proyecto"});
  TIPO_PROYECTO.hasMany(PROYECTO, { as: "PROYECTOs", foreignKey: "Id_tipo_proyecto"});
  UNIDAD_COTIZACION.belongsTo(UNIDAD, { as: "Id_unidad_UNIDAD", foreignKey: "Id_unidad"});
  UNIDAD.hasMany(UNIDAD_COTIZACION, { as: "UNIDAD_COTIZACIONs", foreignKey: "Id_unidad"});
  USER_PROFILE.belongsTo(User, { as: "Id_user_User", foreignKey: "Id_user"});
  User.hasMany(USER_PROFILE, { as: "USER_PROFILEs", foreignKey: "Id_user"});

  return {
    APLICACION,
    ASESOR_DETALLE,
    CLIENTE,
    COMPRA_VENTA,
    COTIZACION,
    DEPARTAMENTO,
    DETALLE_COTIZACION,
    DETALLE_EJECUTIVO,
    DETALLE_FIADOR,
    EJECUTIVO,
    EMPLEADO_ASESOR,
    EMPLEADO_EMPRESA,
    EMPRESA,
    ENTIDAD_FINANCIERA,
    ESTADO,
    FAMILIA,
    GENERO,
    MUNICIPIO,
    PAIS,
    PARENTESCO,
    PLAN_FINANCIERO_PROY,
    PROYECTO,
    PUESTO,
    REFERENCIA,
    ROL,
    TIPO_CREDITO,
    TIPO_PROYECTO,
    UNIDAD,
    UNIDAD_COTIZACION,
    USER_PROFILE,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
