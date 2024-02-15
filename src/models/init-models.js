var DataTypes = require("sequelize").DataTypes;
var _ALBUN = require("./ALBUN");
var _APLICACION = require("./APLICACION");
var _ASESOR_DETALLE = require("./ASESOR_DETALLE");
var _BOLETA_PAGO = require("./BOLETA_PAGO");
var _CARACTERISTICA_BOOLEAN = require("./CARACTERISTICA_BOOLEAN");
var _CARACTERISTICA_DATE = require("./CARACTERISTICA_DATE");
var _CARACTERISTICA_DOUBLE = require("./CARACTERISTICA_DOUBLE");
var _CARACTERISTICA_INT = require("./CARACTERISTICA_INT");
var _CARACTERISTICA_STRING = require("./CARACTERISTICA_STRING");
var _CLIENTE = require("./CLIENTE");
var _CLIENTE_HAS_CONTACTO = require("./CLIENTE_HAS_CONTACTO");
var _COMPONENTE = require("./COMPONENTE");
var _COMPONENTE_ENTIDAD = require("./COMPONENTE_ENTIDAD");
var _COMPRA_VENTA = require("./COMPRA_VENTA");
var _CONFIGURACION_DESCUENTO = require("./CONFIGURACION_DESCUENTO");
var _CONTACTO = require("./CONTACTO");
var _COTIZACION = require("./COTIZACION");
var _CUENTA_CORRIENTE = require("./CUENTA_CORRIENTE");
var _DEPARTAMENTO = require("./DEPARTAMENTO");
var _DETALLES_CUOTA = require("./DETALLES_CUOTA");
var _DETALLE_COTIZACION = require("./DETALLE_COTIZACION");
var _DETALLE_EJECUTIVO = require("./DETALLE_EJECUTIVO");
var _DETALLE_FIADOR = require("./DETALLE_FIADOR");
var _DETALLE_PORCENTAJE_ENGANCHE = require("./DETALLE_PORCENTAJE_ENGANCHE");
var _DETALLE_PORCENTAJE_INTERES = require("./DETALLE_PORCENTAJE_INTERES");
var _DETALLE_PORCENTAJE_RESERVA = require("./DETALLE_PORCENTAJE_RESERVA");
var _EJECUTIVO = require("./EJECUTIVO");
var _EMPLEADO_ASESOR = require("./EMPLEADO_ASESOR");
var _EMPLEADO_EMPRESA = require("./EMPLEADO_EMPRESA");
var _EMPRESA = require("./EMPRESA");
var _ENTIDAD = require("./ENTIDAD");
var _ENTIDAD_CARACTERISTICA_BOOLEAN = require("./ENTIDAD_CARACTERISTICA_BOOLEAN");
var _ENTIDAD_CARACTERISTICA_DATE = require("./ENTIDAD_CARACTERISTICA_DATE");
var _ENTIDAD_CARACTERISTICA_DOUBLE = require("./ENTIDAD_CARACTERISTICA_DOUBLE");
var _ENTIDAD_CARACTERISTICA_INT = require("./ENTIDAD_CARACTERISTICA_INT");
var _ENTIDAD_CARACTERISTICA_STRING = require("./ENTIDAD_CARACTERISTICA_STRING");
var _ENTIDAD_FINANCIERA = require("./ENTIDAD_FINANCIERA");
var _ESTABLECIMIENTO = require("./ESTABLECIMIENTO");
var _ESTADO = require("./ESTADO");
var _ESTADO_CUENTA = require("./ESTADO_CUENTA");
var _FAMILIA = require("./FAMILIA");
var _FORMA_PAGO = require("./FORMA_PAGO");
var _GENERO = require("./GENERO");
var _GRUPO_MODIFICADOR_ENTIDAD = require("./GRUPO_MODIFICADOR_ENTIDAD");
var _ICON = require("./ICON");
var _MODIFICADOR = require("./MODIFICADOR");
var _MODIFICADOR_ENTIDAD = require("./MODIFICADOR_ENTIDAD");
var _MUNICIPIO = require("./MUNICIPIO");
var _PAGO = require("./PAGO");
var _PAIS = require("./PAIS");
var _PARENTESCO = require("./PARENTESCO");
var _PLAN_FINANCIERO_PROY = require("./PLAN_FINANCIERO_PROY");
var _PROYECTO = require("./PROYECTO");
var _PUESTO = require("./PUESTO");
var _RECURSO = require("./RECURSO");
var _REFERENCIA = require("./REFERENCIA");
var _ROL = require("./ROL");
var _STATUS_PAGO = require("./STATUS_PAGO");
var _STATUS_TRANSACCION = require("./STATUS_TRANSACCION");
var _TEMPORADA_DESCUENTO = require("./TEMPORADA_DESCUENTO");
var _TIPO_CARACTERISTICA = require("./TIPO_CARACTERISTICA");
var _TIPO_COMPONENTE = require("./TIPO_COMPONENTE");
var _TIPO_CREDITO = require("./TIPO_CREDITO");
var _TIPO_ENTIDAD = require("./TIPO_ENTIDAD");
var _TIPO_PAGO = require("./TIPO_PAGO");
var _TIPO_PROYECTO = require("./TIPO_PROYECTO");
var _TIPO_RECURSO = require("./TIPO_RECURSO");
var _UNIDAD = require("./UNIDAD");
var _UNIDAD_COTIZACION = require("./UNIDAD_COTIZACION");
var _USER_PROFILE = require("./USER_PROFILE");
var _User = require("./User");
var _VALIDACION = require("./VALIDACION");

function initModels(sequelize) {
  var ALBUN = _ALBUN(sequelize, DataTypes);
  var APLICACION = _APLICACION(sequelize, DataTypes);
  var ASESOR_DETALLE = _ASESOR_DETALLE(sequelize, DataTypes);
  var BOLETA_PAGO = _BOLETA_PAGO(sequelize, DataTypes);
  var CARACTERISTICA_BOOLEAN = _CARACTERISTICA_BOOLEAN(sequelize, DataTypes);
  var CARACTERISTICA_DATE = _CARACTERISTICA_DATE(sequelize, DataTypes);
  var CARACTERISTICA_DOUBLE = _CARACTERISTICA_DOUBLE(sequelize, DataTypes);
  var CARACTERISTICA_INT = _CARACTERISTICA_INT(sequelize, DataTypes);
  var CARACTERISTICA_STRING = _CARACTERISTICA_STRING(sequelize, DataTypes);
  var CLIENTE = _CLIENTE(sequelize, DataTypes);
  var CLIENTE_HAS_CONTACTO = _CLIENTE_HAS_CONTACTO(sequelize, DataTypes);
  var COMPONENTE = _COMPONENTE(sequelize, DataTypes);
  var COMPONENTE_ENTIDAD = _COMPONENTE_ENTIDAD(sequelize, DataTypes);
  var COMPRA_VENTA = _COMPRA_VENTA(sequelize, DataTypes);
  var CONFIGURACION_DESCUENTO = _CONFIGURACION_DESCUENTO(sequelize, DataTypes);
  var CONTACTO = _CONTACTO(sequelize, DataTypes);
  var COTIZACION = _COTIZACION(sequelize, DataTypes);
  var CUENTA_CORRIENTE = _CUENTA_CORRIENTE(sequelize, DataTypes);
  var DEPARTAMENTO = _DEPARTAMENTO(sequelize, DataTypes);
  var DETALLES_CUOTA = _DETALLES_CUOTA(sequelize, DataTypes);
  var DETALLE_COTIZACION = _DETALLE_COTIZACION(sequelize, DataTypes);
  var DETALLE_EJECUTIVO = _DETALLE_EJECUTIVO(sequelize, DataTypes);
  var DETALLE_FIADOR = _DETALLE_FIADOR(sequelize, DataTypes);
  var DETALLE_PORCENTAJE_ENGANCHE = _DETALLE_PORCENTAJE_ENGANCHE(sequelize, DataTypes);
  var DETALLE_PORCENTAJE_INTERES = _DETALLE_PORCENTAJE_INTERES(sequelize, DataTypes);
  var DETALLE_PORCENTAJE_RESERVA = _DETALLE_PORCENTAJE_RESERVA(sequelize, DataTypes);
  var EJECUTIVO = _EJECUTIVO(sequelize, DataTypes);
  var EMPLEADO_ASESOR = _EMPLEADO_ASESOR(sequelize, DataTypes);
  var EMPLEADO_EMPRESA = _EMPLEADO_EMPRESA(sequelize, DataTypes);
  var EMPRESA = _EMPRESA(sequelize, DataTypes);
  var ENTIDAD = _ENTIDAD(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_BOOLEAN = _ENTIDAD_CARACTERISTICA_BOOLEAN(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_DATE = _ENTIDAD_CARACTERISTICA_DATE(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_DOUBLE = _ENTIDAD_CARACTERISTICA_DOUBLE(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_INT = _ENTIDAD_CARACTERISTICA_INT(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_STRING = _ENTIDAD_CARACTERISTICA_STRING(sequelize, DataTypes);
  var ENTIDAD_FINANCIERA = _ENTIDAD_FINANCIERA(sequelize, DataTypes);
  var ESTABLECIMIENTO = _ESTABLECIMIENTO(sequelize, DataTypes);
  var ESTADO = _ESTADO(sequelize, DataTypes);
  var ESTADO_CUENTA = _ESTADO_CUENTA(sequelize, DataTypes);
  var FAMILIA = _FAMILIA(sequelize, DataTypes);
  var FORMA_PAGO = _FORMA_PAGO(sequelize, DataTypes);
  var GENERO = _GENERO(sequelize, DataTypes);
  var GRUPO_MODIFICADOR_ENTIDAD = _GRUPO_MODIFICADOR_ENTIDAD(sequelize, DataTypes);
  var ICON = _ICON(sequelize, DataTypes);
  var MODIFICADOR = _MODIFICADOR(sequelize, DataTypes);
  var MODIFICADOR_ENTIDAD = _MODIFICADOR_ENTIDAD(sequelize, DataTypes);
  var MUNICIPIO = _MUNICIPIO(sequelize, DataTypes);
  var PAGO = _PAGO(sequelize, DataTypes);
  var PAIS = _PAIS(sequelize, DataTypes);
  var PARENTESCO = _PARENTESCO(sequelize, DataTypes);
  var PLAN_FINANCIERO_PROY = _PLAN_FINANCIERO_PROY(sequelize, DataTypes);
  var PROYECTO = _PROYECTO(sequelize, DataTypes);
  var PUESTO = _PUESTO(sequelize, DataTypes);
  var RECURSO = _RECURSO(sequelize, DataTypes);
  var REFERENCIA = _REFERENCIA(sequelize, DataTypes);
  var ROL = _ROL(sequelize, DataTypes);
  var STATUS_PAGO = _STATUS_PAGO(sequelize, DataTypes);
  var STATUS_TRANSACCION = _STATUS_TRANSACCION(sequelize, DataTypes);
  var TEMPORADA_DESCUENTO = _TEMPORADA_DESCUENTO(sequelize, DataTypes);
  var TIPO_CARACTERISTICA = _TIPO_CARACTERISTICA(sequelize, DataTypes);
  var TIPO_COMPONENTE = _TIPO_COMPONENTE(sequelize, DataTypes);
  var TIPO_CREDITO = _TIPO_CREDITO(sequelize, DataTypes);
  var TIPO_ENTIDAD = _TIPO_ENTIDAD(sequelize, DataTypes);
  var TIPO_PAGO = _TIPO_PAGO(sequelize, DataTypes);
  var TIPO_PROYECTO = _TIPO_PROYECTO(sequelize, DataTypes);
  var TIPO_RECURSO = _TIPO_RECURSO(sequelize, DataTypes);
  var UNIDAD = _UNIDAD(sequelize, DataTypes);
  var UNIDAD_COTIZACION = _UNIDAD_COTIZACION(sequelize, DataTypes);
  var USER_PROFILE = _USER_PROFILE(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var VALIDACION = _VALIDACION(sequelize, DataTypes);

  COTIZACION.belongsToMany(UNIDAD, { as: 'Id_unidad_UNIDADs', through: UNIDAD_COTIZACION, foreignKey: "Id_cotizacion", otherKey: "Id_unidad" });
  EMPLEADO_ASESOR.belongsToMany(EMPRESA, { as: 'Id_empresa_EMPRESAs', through: EMPLEADO_EMPRESA, foreignKey: "Id_empleado", otherKey: "Id_empresa" });
  EMPRESA.belongsToMany(EMPLEADO_ASESOR, { as: 'Id_empleado_EMPLEADO_ASESORs', through: EMPLEADO_EMPRESA, foreignKey: "Id_empresa", otherKey: "Id_empleado" });
  EMPRESA.belongsToMany(PROYECTO, { as: 'Id_proyecto_PROYECTO_PLAN_FINANCIERO_PROYs', through: PLAN_FINANCIERO_PROY, foreignKey: "Id_empresa", otherKey: "Id_proyecto" });
  ESTADO.belongsToMany(PROYECTO, { as: 'Id_proyecto_PROYECTO_UNIDADs', through: UNIDAD, foreignKey: "Id_estado", otherKey: "Id_proyecto" });
  PLAN_FINANCIERO_PROY.belongsToMany(PUESTO, { as: 'Id_puesto_PUESTOs', through: EJECUTIVO, foreignKey: "Id_plan_financiero", otherKey: "Id_puesto" });
  PROYECTO.belongsToMany(EMPRESA, { as: 'Id_empresa_EMPRESA_PLAN_FINANCIERO_PROYs', through: PLAN_FINANCIERO_PROY, foreignKey: "Id_proyecto", otherKey: "Id_empresa" });
  PROYECTO.belongsToMany(ESTADO, { as: 'Id_estado_ESTADOs', through: UNIDAD, foreignKey: "Id_proyecto", otherKey: "Id_estado" });
  PROYECTO.belongsToMany(USER_PROFILE, { as: 'Id_user_profile_USER_PROFILEs', through: CONTACTO, foreignKey: "Id_proyecto", otherKey: "Id_user_profile" });
  PUESTO.belongsToMany(PLAN_FINANCIERO_PROY, { as: 'Id_plan_financiero_PLAN_FINANCIERO_PROYs', through: EJECUTIVO, foreignKey: "Id_puesto", otherKey: "Id_plan_financiero" });
  UNIDAD.belongsToMany(COTIZACION, { as: 'Id_cotizacion_COTIZACIONs', through: UNIDAD_COTIZACION, foreignKey: "Id_unidad", otherKey: "Id_cotizacion" });
  USER_PROFILE.belongsToMany(PROYECTO, { as: 'Id_proyecto_PROYECTOs', through: CONTACTO, foreignKey: "Id_user_profile", otherKey: "Id_proyecto" });
  RECURSO.belongsTo(ALBUN, { as: "Id_albun_ALBUN", foreignKey: "Id_albun"});
  ALBUN.hasMany(RECURSO, { as: "RECURSOs", foreignKey: "Id_albun"});
  DETALLE_FIADOR.belongsTo(APLICACION, { as: "Id_aplicacion_APLICACION", foreignKey: "Id_aplicacion"});
  APLICACION.hasMany(DETALLE_FIADOR, { as: "DETALLE_FIADORs", foreignKey: "Id_aplicacion"});
  COTIZACION.belongsTo(ASESOR_DETALLE, { as: "Id_detalle_asesor_ASESOR_DETALLE", foreignKey: "Id_detalle_asesor"});
  ASESOR_DETALLE.hasMany(COTIZACION, { as: "COTIZACIONs", foreignKey: "Id_detalle_asesor"});
  ENTIDAD_CARACTERISTICA_BOOLEAN.belongsTo(CARACTERISTICA_BOOLEAN, { as: "Id_caracteristica_CARACTERISTICA_BOOLEAN", foreignKey: "Id_caracteristica"});
  CARACTERISTICA_BOOLEAN.hasMany(ENTIDAD_CARACTERISTICA_BOOLEAN, { as: "ENTIDAD_CARACTERISTICA_BOOLEANs", foreignKey: "Id_caracteristica"});
  ENTIDAD_CARACTERISTICA_DATE.belongsTo(CARACTERISTICA_DATE, { as: "Id_caracteristica_CARACTERISTICA_DATE", foreignKey: "Id_caracteristica"});
  CARACTERISTICA_DATE.hasMany(ENTIDAD_CARACTERISTICA_DATE, { as: "ENTIDAD_CARACTERISTICA_DATEs", foreignKey: "Id_caracteristica"});
  ENTIDAD_CARACTERISTICA_DOUBLE.belongsTo(CARACTERISTICA_DOUBLE, { as: "Id_caracteristica_CARACTERISTICA_DOUBLE", foreignKey: "Id_caracteristica"});
  CARACTERISTICA_DOUBLE.hasMany(ENTIDAD_CARACTERISTICA_DOUBLE, { as: "ENTIDAD_CARACTERISTICA_DOUBLEs", foreignKey: "Id_caracteristica"});
  ENTIDAD_CARACTERISTICA_INT.belongsTo(CARACTERISTICA_INT, { as: "Id_caracteristica_CARACTERISTICA_INT", foreignKey: "Id_caracteristica"});
  CARACTERISTICA_INT.hasMany(ENTIDAD_CARACTERISTICA_INT, { as: "ENTIDAD_CARACTERISTICA_INTs", foreignKey: "Id_caracteristica"});
  ENTIDAD_CARACTERISTICA_STRING.belongsTo(CARACTERISTICA_STRING, { as: "Id_caracteristica_CARACTERISTICA_STRING", foreignKey: "Id_caracteristica"});
  CARACTERISTICA_STRING.hasMany(ENTIDAD_CARACTERISTICA_STRING, { as: "ENTIDAD_CARACTERISTICA_STRINGs", foreignKey: "Id_caracteristica"});
  APLICACION.belongsTo(CLIENTE, { as: "Id_cliente_CLIENTE", foreignKey: "Id_cliente"});
  CLIENTE.hasMany(APLICACION, { as: "APLICACIONs", foreignKey: "Id_cliente"});
  CLIENTE_HAS_CONTACTO.belongsTo(CLIENTE, { as: "Id_cliente_CLIENTE", foreignKey: "Id_cliente"});
  CLIENTE.hasMany(CLIENTE_HAS_CONTACTO, { as: "CLIENTE_HAS_CONTACTOs", foreignKey: "Id_cliente"});
  COTIZACION.belongsTo(CLIENTE, { as: "Id_cliente_CLIENTE", foreignKey: "Id_cliente"});
  CLIENTE.hasMany(COTIZACION, { as: "COTIZACIONs", foreignKey: "Id_cliente"});
  DETALLE_FIADOR.belongsTo(CLIENTE, { as: "Id_cliente_CLIENTE", foreignKey: "Id_cliente"});
  CLIENTE.hasMany(DETALLE_FIADOR, { as: "DETALLE_FIADORs", foreignKey: "Id_cliente"});
  FAMILIA.belongsTo(CLIENTE, { as: "Id_clinete_CLIENTE", foreignKey: "Id_clinete"});
  CLIENTE.hasMany(FAMILIA, { as: "FAMILIa", foreignKey: "Id_clinete"});
  COMPONENTE_ENTIDAD.belongsTo(COMPONENTE, { as: "Id_componente_COMPONENTE", foreignKey: "Id_componente"});
  COMPONENTE.hasMany(COMPONENTE_ENTIDAD, { as: "COMPONENTE_ENTIDADs", foreignKey: "Id_componente"});
  ESTADO_CUENTA.belongsTo(COMPRA_VENTA, { as: "Id_compraventa_COMPRA_VENTum", foreignKey: "Id_compraventa"});
  COMPRA_VENTA.hasMany(ESTADO_CUENTA, { as: "ESTADO_CUENTa", foreignKey: "Id_compraventa"});
  REFERENCIA.belongsTo(COMPRA_VENTA, { as: "Id_compraventa_COMPRA_VENTum", foreignKey: "Id_compraventa"});
  COMPRA_VENTA.hasMany(REFERENCIA, { as: "REFERENCIa", foreignKey: "Id_compraventa"});
  CLIENTE_HAS_CONTACTO.belongsTo(CONTACTO, { as: "Id_contacto_CONTACTO", foreignKey: "Id_contacto"});
  CONTACTO.hasMany(CLIENTE_HAS_CONTACTO, { as: "CLIENTE_HAS_CONTACTOs", foreignKey: "Id_contacto"});
  APLICACION.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(APLICACION, { as: "APLICACIONs", foreignKey: "Id_cotizacion"});
  BOLETA_PAGO.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(BOLETA_PAGO, { as: "BOLETA_PAGOs", foreignKey: "Id_cotizacion"});
  COMPRA_VENTA.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(COMPRA_VENTA, { as: "COMPRA_VENTa", foreignKey: "Id_cotizacion"});
  CUENTA_CORRIENTE.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(CUENTA_CORRIENTE, { as: "CUENTA_CORRIENTEs", foreignKey: "Id_cotizacion"});
  DETALLE_COTIZACION.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(DETALLE_COTIZACION, { as: "DETALLE_COTIZACIONs", foreignKey: "Id_cotizacion"});
  UNIDAD_COTIZACION.belongsTo(COTIZACION, { as: "Id_cotizacion_COTIZACION", foreignKey: "Id_cotizacion"});
  COTIZACION.hasMany(UNIDAD_COTIZACION, { as: "UNIDAD_COTIZACIONs", foreignKey: "Id_cotizacion"});
  PAGO.belongsTo(CUENTA_CORRIENTE, { as: "Id_cuenta_corriente_CUENTA_CORRIENTE", foreignKey: "Id_cuenta_corriente"});
  CUENTA_CORRIENTE.hasMany(PAGO, { as: "PAGOs", foreignKey: "Id_cuenta_corriente"});
  EMPRESA.belongsTo(DEPARTAMENTO, { as: "Id_departamento_DEPARTAMENTO", foreignKey: "Id_departamento"});
  DEPARTAMENTO.hasMany(EMPRESA, { as: "EMPRESAs", foreignKey: "Id_departamento"});
  MUNICIPIO.belongsTo(DEPARTAMENTO, { as: "Id_departamento_DEPARTAMENTO", foreignKey: "Id_departamento"});
  DEPARTAMENTO.hasMany(MUNICIPIO, { as: "MUNICIPIOs", foreignKey: "Id_departamento"});
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
  ENTIDAD_CARACTERISTICA_BOOLEAN.belongsTo(ENTIDAD, { as: "Id_entidad_ENTIDAD", foreignKey: "Id_entidad"});
  ENTIDAD.hasMany(ENTIDAD_CARACTERISTICA_BOOLEAN, { as: "ENTIDAD_CARACTERISTICA_BOOLEANs", foreignKey: "Id_entidad"});
  ENTIDAD_CARACTERISTICA_DATE.belongsTo(ENTIDAD, { as: "Id_entidad_ENTIDAD", foreignKey: "Id_entidad"});
  ENTIDAD.hasMany(ENTIDAD_CARACTERISTICA_DATE, { as: "ENTIDAD_CARACTERISTICA_DATEs", foreignKey: "Id_entidad"});
  ENTIDAD_CARACTERISTICA_DOUBLE.belongsTo(ENTIDAD, { as: "Id_entidad_ENTIDAD", foreignKey: "Id_entidad"});
  ENTIDAD.hasMany(ENTIDAD_CARACTERISTICA_DOUBLE, { as: "ENTIDAD_CARACTERISTICA_DOUBLEs", foreignKey: "Id_entidad"});
  ENTIDAD_CARACTERISTICA_INT.belongsTo(ENTIDAD, { as: "Id_entidad_ENTIDAD", foreignKey: "Id_entidad"});
  ENTIDAD.hasMany(ENTIDAD_CARACTERISTICA_INT, { as: "ENTIDAD_CARACTERISTICA_INTs", foreignKey: "Id_entidad"});
  ENTIDAD_CARACTERISTICA_STRING.belongsTo(ENTIDAD, { as: "Id_entidad_ENTIDAD", foreignKey: "Id_entidad"});
  ENTIDAD.hasMany(ENTIDAD_CARACTERISTICA_STRING, { as: "ENTIDAD_CARACTERISTICA_STRINGs", foreignKey: "Id_entidad"});
  GRUPO_MODIFICADOR_ENTIDAD.belongsTo(ENTIDAD, { as: "Id_entidad_ENTIDAD", foreignKey: "Id_entidad"});
  ENTIDAD.hasMany(GRUPO_MODIFICADOR_ENTIDAD, { as: "GRUPO_MODIFICADOR_ENTIDADs", foreignKey: "Id_entidad"});
  MODIFICADOR_ENTIDAD.belongsTo(ENTIDAD, { as: "Id_entidad_ENTIDAD", foreignKey: "Id_entidad"});
  ENTIDAD.hasMany(MODIFICADOR_ENTIDAD, { as: "MODIFICADOR_ENTIDADs", foreignKey: "Id_entidad"});
  EJECUTIVO.belongsTo(ENTIDAD_FINANCIERA, { as: "Id_ent_financiera_ENTIDAD_FINANCIERA", foreignKey: "Id_ent_financiera"});
  ENTIDAD_FINANCIERA.hasMany(EJECUTIVO, { as: "EJECUTIVOs", foreignKey: "Id_ent_financiera"});
  PLAN_FINANCIERO_PROY.belongsTo(ENTIDAD_FINANCIERA, { as: "Id_ent_financiera_ENTIDAD_FINANCIERA", foreignKey: "Id_ent_financiera"});
  ENTIDAD_FINANCIERA.hasMany(PLAN_FINANCIERO_PROY, { as: "PLAN_FINANCIERO_PROYs", foreignKey: "Id_ent_financiera"});
  BOLETA_PAGO.belongsTo(ESTABLECIMIENTO, { as: "Id_establecimiento_ESTABLECIMIENTO", foreignKey: "Id_establecimiento"});
  ESTABLECIMIENTO.hasMany(BOLETA_PAGO, { as: "BOLETA_PAGOs", foreignKey: "Id_establecimiento"});
  COTIZACION.belongsTo(ESTADO, { as: "Id_estado_ESTADO", foreignKey: "Id_estado"});
  ESTADO.hasMany(COTIZACION, { as: "COTIZACIONs", foreignKey: "Id_estado"});
  UNIDAD.belongsTo(ESTADO, { as: "Id_estado_ESTADO", foreignKey: "Id_estado"});
  ESTADO.hasMany(UNIDAD, { as: "UNIDADs", foreignKey: "Id_estado"});
  DETALLES_CUOTA.belongsTo(ESTADO_CUENTA, { as: "Idestado_cuenta_ESTADO_CUENTum", foreignKey: "Idestado_cuenta"});
  ESTADO_CUENTA.hasMany(DETALLES_CUOTA, { as: "DETALLES_CUOTa", foreignKey: "Idestado_cuenta"});
  BOLETA_PAGO.belongsTo(FORMA_PAGO, { as: "Id_forma_pago_FORMA_PAGO", foreignKey: "Id_forma_pago"});
  FORMA_PAGO.hasMany(BOLETA_PAGO, { as: "BOLETA_PAGOs", foreignKey: "Id_forma_pago"});
  CLIENTE.belongsTo(GENERO, { as: "Id_genero_GENERO", foreignKey: "Id_genero"});
  GENERO.hasMany(CLIENTE, { as: "CLIENTEs", foreignKey: "Id_genero"});
  GRUPO_MODIFICADOR_ENTIDAD.belongsTo(GRUPO_MODIFICADOR_ENTIDAD, { as: "Padre_GRUPO_MODIFICADOR_ENTIDAD", foreignKey: "Padre"});
  GRUPO_MODIFICADOR_ENTIDAD.hasMany(GRUPO_MODIFICADOR_ENTIDAD, { as: "GRUPO_MODIFICADOR_ENTIDADs", foreignKey: "Padre"});
  COMPONENTE.belongsTo(ICON, { as: "Id_icon_ICON", foreignKey: "Id_icon"});
  ICON.hasMany(COMPONENTE, { as: "COMPONENTEs", foreignKey: "Id_icon"});
  MODIFICADOR_ENTIDAD.belongsTo(MODIFICADOR, { as: "Id_modificador_MODIFICADOR", foreignKey: "Id_modificador"});
  MODIFICADOR.hasMany(MODIFICADOR_ENTIDAD, { as: "MODIFICADOR_ENTIDADs", foreignKey: "Id_modificador"});
  GRUPO_MODIFICADOR_ENTIDAD.belongsTo(MODIFICADOR_ENTIDAD, { as: "Id_modificador_entidad_MODIFICADOR_ENTIDAD", foreignKey: "Id_modificador_entidad"});
  MODIFICADOR_ENTIDAD.hasMany(GRUPO_MODIFICADOR_ENTIDAD, { as: "GRUPO_MODIFICADOR_ENTIDADs", foreignKey: "Id_modificador_entidad"});
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
  ALBUN.belongsTo(PROYECTO, { as: "Id_proyecto_PROYECTO", foreignKey: "Id_proyecto"});
  PROYECTO.hasMany(ALBUN, { as: "ALBUNs", foreignKey: "Id_proyecto"});
  CONFIGURACION_DESCUENTO.belongsTo(PROYECTO, { as: "Id_proyecto_PROYECTO", foreignKey: "Id_proyecto"});
  PROYECTO.hasMany(CONFIGURACION_DESCUENTO, { as: "CONFIGURACION_DESCUENTOs", foreignKey: "Id_proyecto"});
  CONTACTO.belongsTo(PROYECTO, { as: "Id_proyecto_PROYECTO", foreignKey: "Id_proyecto"});
  PROYECTO.hasMany(CONTACTO, { as: "CONTACTOs", foreignKey: "Id_proyecto"});
  DETALLE_PORCENTAJE_ENGANCHE.belongsTo(PROYECTO, { as: "Id_proyecto_PROYECTO", foreignKey: "Id_proyecto"});
  PROYECTO.hasMany(DETALLE_PORCENTAJE_ENGANCHE, { as: "DETALLE_PORCENTAJE_ENGANCHEs", foreignKey: "Id_proyecto"});
  DETALLE_PORCENTAJE_INTERES.belongsTo(PROYECTO, { as: "Id_proyecto_PROYECTO", foreignKey: "Id_proyecto"});
  PROYECTO.hasMany(DETALLE_PORCENTAJE_INTERES, { as: "DETALLE_PORCENTAJE_INTEREs", foreignKey: "Id_proyecto"});
  DETALLE_PORCENTAJE_RESERVA.belongsTo(PROYECTO, { as: "Id_proyecto_PROYECTO", foreignKey: "Id_proyecto"});
  PROYECTO.hasMany(DETALLE_PORCENTAJE_RESERVA, { as: "DETALLE_PORCENTAJE_RESERVAs", foreignKey: "Id_proyecto"});
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
  BOLETA_PAGO.belongsTo(STATUS_PAGO, { as: "Id_status_pago_STATUS_PAGO", foreignKey: "Id_status_pago"});
  STATUS_PAGO.hasMany(BOLETA_PAGO, { as: "BOLETA_PAGOs", foreignKey: "Id_status_pago"});
  PAGO.belongsTo(STATUS_PAGO, { as: "Id_status_pago_STATUS_PAGO", foreignKey: "Id_status_pago"});
  STATUS_PAGO.hasMany(PAGO, { as: "PAGOs", foreignKey: "Id_status_pago"});
  PAGO.belongsTo(STATUS_TRANSACCION, { as: "Id_status_transaccion_STATUS_TRANSACCION", foreignKey: "Id_status_transaccion"});
  STATUS_TRANSACCION.hasMany(PAGO, { as: "PAGOs", foreignKey: "Id_status_transaccion"});
  CONFIGURACION_DESCUENTO.belongsTo(TEMPORADA_DESCUENTO, { as: "Id_temporada_descuento_TEMPORADA_DESCUENTO", foreignKey: "Id_temporada_descuento"});
  TEMPORADA_DESCUENTO.hasMany(CONFIGURACION_DESCUENTO, { as: "CONFIGURACION_DESCUENTOs", foreignKey: "Id_temporada_descuento"});
  COMPONENTE.belongsTo(TIPO_CARACTERISTICA, { as: "InputType_TIPO_CARACTERISTICA", foreignKey: "InputType"});
  TIPO_CARACTERISTICA.hasMany(COMPONENTE, { as: "COMPONENTEs", foreignKey: "InputType"});
  COMPONENTE_ENTIDAD.belongsTo(TIPO_CARACTERISTICA, { as: "Id_tipo_caracteristica_TIPO_CARACTERISTICA", foreignKey: "Id_tipo_caracteristica"});
  TIPO_CARACTERISTICA.hasMany(COMPONENTE_ENTIDAD, { as: "COMPONENTE_ENTIDADs", foreignKey: "Id_tipo_caracteristica"});
  COMPONENTE.belongsTo(TIPO_COMPONENTE, { as: "Type_TIPO_COMPONENTE", foreignKey: "Type"});
  TIPO_COMPONENTE.hasMany(COMPONENTE, { as: "COMPONENTEs", foreignKey: "Type"});
  PLAN_FINANCIERO_PROY.belongsTo(TIPO_CREDITO, { as: "Id_tipo_credito_TIPO_CREDITO", foreignKey: "Id_tipo_credito"});
  TIPO_CREDITO.hasMany(PLAN_FINANCIERO_PROY, { as: "PLAN_FINANCIERO_PROYs", foreignKey: "Id_tipo_credito"});
  COMPONENTE_ENTIDAD.belongsTo(TIPO_ENTIDAD, { as: "Id_tipo_entidad_TIPO_ENTIDAD", foreignKey: "Id_tipo_entidad"});
  TIPO_ENTIDAD.hasMany(COMPONENTE_ENTIDAD, { as: "COMPONENTE_ENTIDADs", foreignKey: "Id_tipo_entidad"});
  ENTIDAD.belongsTo(TIPO_ENTIDAD, { as: "Tipo_TIPO_ENTIDAD", foreignKey: "Tipo"});
  TIPO_ENTIDAD.hasMany(ENTIDAD, { as: "ENTIDADs", foreignKey: "Tipo"});
  PAGO.belongsTo(TIPO_PAGO, { as: "Id_tipo_pago_TIPO_PAGO", foreignKey: "Id_tipo_pago"});
  TIPO_PAGO.hasMany(PAGO, { as: "PAGOs", foreignKey: "Id_tipo_pago"});
  PROYECTO.belongsTo(TIPO_PROYECTO, { as: "Id_tipo_proyecto_TIPO_PROYECTO", foreignKey: "Id_tipo_proyecto"});
  TIPO_PROYECTO.hasMany(PROYECTO, { as: "PROYECTOs", foreignKey: "Id_tipo_proyecto"});
  RECURSO.belongsTo(TIPO_RECURSO, { as: "Id_tipo_recurso_TIPO_RECURSO", foreignKey: "Id_tipo_recurso"});
  TIPO_RECURSO.hasMany(RECURSO, { as: "RECURSOs", foreignKey: "Id_tipo_recurso"});
  UNIDAD_COTIZACION.belongsTo(UNIDAD, { as: "Id_unidad_UNIDAD", foreignKey: "Id_unidad"});
  UNIDAD.hasMany(UNIDAD_COTIZACION, { as: "UNIDAD_COTIZACIONs", foreignKey: "Id_unidad"});
  CLIENTE.belongsTo(USER_PROFILE, { as: "Id_user_profile_USER_PROFILE", foreignKey: "Id_user_profile"});
  USER_PROFILE.hasMany(CLIENTE, { as: "CLIENTEs", foreignKey: "Id_user_profile"});
  CONTACTO.belongsTo(USER_PROFILE, { as: "Id_user_profile_USER_PROFILE", foreignKey: "Id_user_profile"});
  USER_PROFILE.hasMany(CONTACTO, { as: "CONTACTOs", foreignKey: "Id_user_profile"});
  CARACTERISTICA_BOOLEAN.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(CARACTERISTICA_BOOLEAN, { as: "CARACTERISTICA_BOOLEANs", foreignKey: "Createdby"});
  CARACTERISTICA_BOOLEAN.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(CARACTERISTICA_BOOLEAN, { as: "Updatedby_CARACTERISTICA_BOOLEANs", foreignKey: "Updatedby"});
  CARACTERISTICA_DATE.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(CARACTERISTICA_DATE, { as: "CARACTERISTICA_DATEs", foreignKey: "Createdby"});
  CARACTERISTICA_DATE.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(CARACTERISTICA_DATE, { as: "Updatedby_CARACTERISTICA_DATEs", foreignKey: "Updatedby"});
  CARACTERISTICA_DOUBLE.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(CARACTERISTICA_DOUBLE, { as: "CARACTERISTICA_DOUBLEs", foreignKey: "Createdby"});
  CARACTERISTICA_DOUBLE.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(CARACTERISTICA_DOUBLE, { as: "Updatedby_CARACTERISTICA_DOUBLEs", foreignKey: "Updatedby"});
  CARACTERISTICA_INT.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(CARACTERISTICA_INT, { as: "CARACTERISTICA_INTs", foreignKey: "Createdby"});
  CARACTERISTICA_INT.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(CARACTERISTICA_INT, { as: "Updatedby_CARACTERISTICA_INTs", foreignKey: "Updatedby"});
  CARACTERISTICA_STRING.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(CARACTERISTICA_STRING, { as: "CARACTERISTICA_STRINGs", foreignKey: "Createdby"});
  CARACTERISTICA_STRING.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(CARACTERISTICA_STRING, { as: "Updatedby_CARACTERISTICA_STRINGs", foreignKey: "Updatedby"});
  COMPONENTE.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(COMPONENTE, { as: "COMPONENTEs", foreignKey: "Createdby"});
  COMPONENTE_ENTIDAD.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(COMPONENTE_ENTIDAD, { as: "COMPONENTE_ENTIDADs", foreignKey: "Createdby"});
  ENTIDAD.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(ENTIDAD, { as: "ENTIDADs", foreignKey: "Createdby"});
  ENTIDAD.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(ENTIDAD, { as: "Updatedby_ENTIDADs", foreignKey: "Updatedby"});
  ENTIDAD_CARACTERISTICA_BOOLEAN.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_BOOLEAN, { as: "ENTIDAD_CARACTERISTICA_BOOLEANs", foreignKey: "Createdby"});
  ENTIDAD_CARACTERISTICA_BOOLEAN.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_BOOLEAN, { as: "Updatedby_ENTIDAD_CARACTERISTICA_BOOLEANs", foreignKey: "Updatedby"});
  ENTIDAD_CARACTERISTICA_DATE.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_DATE, { as: "ENTIDAD_CARACTERISTICA_DATEs", foreignKey: "Createdby"});
  ENTIDAD_CARACTERISTICA_DATE.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_DATE, { as: "Updatedby_ENTIDAD_CARACTERISTICA_DATEs", foreignKey: "Updatedby"});
  ENTIDAD_CARACTERISTICA_DOUBLE.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_DOUBLE, { as: "ENTIDAD_CARACTERISTICA_DOUBLEs", foreignKey: "Createdby"});
  ENTIDAD_CARACTERISTICA_DOUBLE.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_DOUBLE, { as: "Updatedby_ENTIDAD_CARACTERISTICA_DOUBLEs", foreignKey: "Updatedby"});
  ENTIDAD_CARACTERISTICA_INT.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_INT, { as: "ENTIDAD_CARACTERISTICA_INTs", foreignKey: "Createdby"});
  ENTIDAD_CARACTERISTICA_INT.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_INT, { as: "Updatedby_ENTIDAD_CARACTERISTICA_INTs", foreignKey: "Updatedby"});
  ENTIDAD_CARACTERISTICA_STRING.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_STRING, { as: "ENTIDAD_CARACTERISTICA_STRINGs", foreignKey: "Createdby"});
  ENTIDAD_CARACTERISTICA_STRING.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(ENTIDAD_CARACTERISTICA_STRING, { as: "Updatedby_ENTIDAD_CARACTERISTICA_STRINGs", foreignKey: "Updatedby"});
  GRUPO_MODIFICADOR_ENTIDAD.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(GRUPO_MODIFICADOR_ENTIDAD, { as: "GRUPO_MODIFICADOR_ENTIDADs", foreignKey: "Createdby"});
  GRUPO_MODIFICADOR_ENTIDAD.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(GRUPO_MODIFICADOR_ENTIDAD, { as: "Updatedby_GRUPO_MODIFICADOR_ENTIDADs", foreignKey: "Updatedby"});
  ICON.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(ICON, { as: "ICONs", foreignKey: "Createdby"});
  MODIFICADOR.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(MODIFICADOR, { as: "MODIFICADORs", foreignKey: "Createdby"});
  MODIFICADOR.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(MODIFICADOR, { as: "Updatedby_MODIFICADORs", foreignKey: "Updatedby"});
  MODIFICADOR_ENTIDAD.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(MODIFICADOR_ENTIDAD, { as: "MODIFICADOR_ENTIDADs", foreignKey: "Createdby"});
  MODIFICADOR_ENTIDAD.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(MODIFICADOR_ENTIDAD, { as: "Updatedby_MODIFICADOR_ENTIDADs", foreignKey: "Updatedby"});
  TIPO_COMPONENTE.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(TIPO_COMPONENTE, { as: "TIPO_COMPONENTEs", foreignKey: "Createdby"});
  TIPO_ENTIDAD.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(TIPO_ENTIDAD, { as: "TIPO_ENTIDADs", foreignKey: "Createdby"});
  TIPO_ENTIDAD.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(TIPO_ENTIDAD, { as: "Updatedby_TIPO_ENTIDADs", foreignKey: "Updatedby"});
  USER_PROFILE.belongsTo(User, { as: "Id_user_User", foreignKey: "Id_user"});
  User.hasMany(USER_PROFILE, { as: "USER_PROFILEs", foreignKey: "Id_user"});
  VALIDACION.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(VALIDACION, { as: "VALIDACIONs", foreignKey: "Createdby"});
  VALIDACION.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(VALIDACION, { as: "Updatedby_VALIDACIONs", foreignKey: "Updatedby"});
  COMPONENTE.belongsTo(VALIDACION, { as: "Id_validacion_VALIDACION", foreignKey: "Id_validacion"});
  VALIDACION.hasMany(COMPONENTE, { as: "COMPONENTEs", foreignKey: "Id_validacion"});

  return {
    ALBUN,
    APLICACION,
    ASESOR_DETALLE,
    BOLETA_PAGO,
    CARACTERISTICA_BOOLEAN,
    CARACTERISTICA_DATE,
    CARACTERISTICA_DOUBLE,
    CARACTERISTICA_INT,
    CARACTERISTICA_STRING,
    CLIENTE,
    CLIENTE_HAS_CONTACTO,
    COMPONENTE,
    COMPONENTE_ENTIDAD,
    COMPRA_VENTA,
    CONFIGURACION_DESCUENTO,
    CONTACTO,
    COTIZACION,
    CUENTA_CORRIENTE,
    DEPARTAMENTO,
    DETALLES_CUOTA,
    DETALLE_COTIZACION,
    DETALLE_EJECUTIVO,
    DETALLE_FIADOR,
    DETALLE_PORCENTAJE_ENGANCHE,
    DETALLE_PORCENTAJE_INTERES,
    DETALLE_PORCENTAJE_RESERVA,
    EJECUTIVO,
    EMPLEADO_ASESOR,
    EMPLEADO_EMPRESA,
    EMPRESA,
    ENTIDAD,
    ENTIDAD_CARACTERISTICA_BOOLEAN,
    ENTIDAD_CARACTERISTICA_DATE,
    ENTIDAD_CARACTERISTICA_DOUBLE,
    ENTIDAD_CARACTERISTICA_INT,
    ENTIDAD_CARACTERISTICA_STRING,
    ENTIDAD_FINANCIERA,
    ESTABLECIMIENTO,
    ESTADO,
    ESTADO_CUENTA,
    FAMILIA,
    FORMA_PAGO,
    GENERO,
    GRUPO_MODIFICADOR_ENTIDAD,
    ICON,
    MODIFICADOR,
    MODIFICADOR_ENTIDAD,
    MUNICIPIO,
    PAGO,
    PAIS,
    PARENTESCO,
    PLAN_FINANCIERO_PROY,
    PROYECTO,
    PUESTO,
    RECURSO,
    REFERENCIA,
    ROL,
    STATUS_PAGO,
    STATUS_TRANSACCION,
    TEMPORADA_DESCUENTO,
    TIPO_CARACTERISTICA,
    TIPO_COMPONENTE,
    TIPO_CREDITO,
    TIPO_ENTIDAD,
    TIPO_PAGO,
    TIPO_PROYECTO,
    TIPO_RECURSO,
    UNIDAD,
    UNIDAD_COTIZACION,
    USER_PROFILE,
    User,
    VALIDACION,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
