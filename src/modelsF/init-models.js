var DataTypes = require("sequelize").DataTypes;
var _CARACTERISTICA_BOOLEAN = require("./CARACTERISTICA_BOOLEAN");
var _CARACTERISTICA_DATE = require("./CARACTERISTICA_DATE");
var _CARACTERISTICA_DOUBLE = require("./CARACTERISTICA_DOUBLE");
var _CARACTERISTICA_INT = require("./CARACTERISTICA_INT");
var _CARACTERISTICA_STRING = require("./CARACTERISTICA_STRING");
var _CLASIFICACION_CLIENTE = require("./CLASIFICACION_CLIENTE");
var _COMPONENTE = require("./COMPONENTE");
var _COMPONENTE_ENTIDAD = require("./COMPONENTE_ENTIDAD");
var _ENTIDAD = require("./ENTIDAD");
var _ENTIDAD_CARACTERISTICA_BOOLEAN = require("./ENTIDAD_CARACTERISTICA_BOOLEAN");
var _ENTIDAD_CARACTERISTICA_DATE = require("./ENTIDAD_CARACTERISTICA_DATE");
var _ENTIDAD_CARACTERISTICA_DOUBLE = require("./ENTIDAD_CARACTERISTICA_DOUBLE");
var _ENTIDAD_CARACTERISTICA_INT = require("./ENTIDAD_CARACTERISTICA_INT");
var _ENTIDAD_CARACTERISTICA_STRING = require("./ENTIDAD_CARACTERISTICA_STRING");
var _GRUPO_MODIFICADOR_ENTIDAD = require("./GRUPO_MODIFICADOR_ENTIDAD");
var _ICON = require("./ICON");
var _MODIFICADOR = require("./MODIFICADOR");
var _MODIFICADOR_ENTIDAD = require("./MODIFICADOR_ENTIDAD");
var _TIPO_CARACTERISTICA = require("./TIPO_CARACTERISTICA");
var _TIPO_COMPONENTE = require("./TIPO_COMPONENTE");
var _TIPO_ENTIDAD = require("./TIPO_ENTIDAD");
var _User = require("./User");
var _VALIDACION = require("./VALIDACION");

function initModels(sequelize) {
  var CARACTERISTICA_BOOLEAN = _CARACTERISTICA_BOOLEAN(sequelize, DataTypes);
  var CARACTERISTICA_DATE = _CARACTERISTICA_DATE(sequelize, DataTypes);
  var CARACTERISTICA_DOUBLE = _CARACTERISTICA_DOUBLE(sequelize, DataTypes);
  var CARACTERISTICA_INT = _CARACTERISTICA_INT(sequelize, DataTypes);
  var CARACTERISTICA_STRING = _CARACTERISTICA_STRING(sequelize, DataTypes);
  var CLASIFICACION_CLIENTE = _CLASIFICACION_CLIENTE(sequelize, DataTypes);
  var COMPONENTE = _COMPONENTE(sequelize, DataTypes);
  var COMPONENTE_ENTIDAD = _COMPONENTE_ENTIDAD(sequelize, DataTypes);
  var ENTIDAD = _ENTIDAD(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_BOOLEAN = _ENTIDAD_CARACTERISTICA_BOOLEAN(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_DATE = _ENTIDAD_CARACTERISTICA_DATE(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_DOUBLE = _ENTIDAD_CARACTERISTICA_DOUBLE(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_INT = _ENTIDAD_CARACTERISTICA_INT(sequelize, DataTypes);
  var ENTIDAD_CARACTERISTICA_STRING = _ENTIDAD_CARACTERISTICA_STRING(sequelize, DataTypes);
  var GRUPO_MODIFICADOR_ENTIDAD = _GRUPO_MODIFICADOR_ENTIDAD(sequelize, DataTypes);
  var ICON = _ICON(sequelize, DataTypes);
  var MODIFICADOR = _MODIFICADOR(sequelize, DataTypes);
  var MODIFICADOR_ENTIDAD = _MODIFICADOR_ENTIDAD(sequelize, DataTypes);
  var TIPO_CARACTERISTICA = _TIPO_CARACTERISTICA(sequelize, DataTypes);
  var TIPO_COMPONENTE = _TIPO_COMPONENTE(sequelize, DataTypes);
  var TIPO_ENTIDAD = _TIPO_ENTIDAD(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var VALIDACION = _VALIDACION(sequelize, DataTypes);

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
  COMPONENTE_ENTIDAD.belongsTo(COMPONENTE, { as: "Id_componente_COMPONENTE", foreignKey: "Id_componente"});
  COMPONENTE.hasMany(COMPONENTE_ENTIDAD, { as: "COMPONENTE_ENTIDADs", foreignKey: "Id_componente"});
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
  GRUPO_MODIFICADOR_ENTIDAD.belongsTo(GRUPO_MODIFICADOR_ENTIDAD, { as: "Padre_GRUPO_MODIFICADOR_ENTIDAD", foreignKey: "Padre"});
  GRUPO_MODIFICADOR_ENTIDAD.hasMany(GRUPO_MODIFICADOR_ENTIDAD, { as: "GRUPO_MODIFICADOR_ENTIDADs", foreignKey: "Padre"});
  COMPONENTE.belongsTo(ICON, { as: "Id_icon_ICON", foreignKey: "Id_icon"});
  ICON.hasMany(COMPONENTE, { as: "COMPONENTEs", foreignKey: "Id_icon"});
  MODIFICADOR_ENTIDAD.belongsTo(MODIFICADOR, { as: "Id_modificador_MODIFICADOR", foreignKey: "Id_modificador"});
  MODIFICADOR.hasMany(MODIFICADOR_ENTIDAD, { as: "MODIFICADOR_ENTIDADs", foreignKey: "Id_modificador"});
  GRUPO_MODIFICADOR_ENTIDAD.belongsTo(MODIFICADOR_ENTIDAD, { as: "Id_modificador_entidad_MODIFICADOR_ENTIDAD", foreignKey: "Id_modificador_entidad"});
  MODIFICADOR_ENTIDAD.hasMany(GRUPO_MODIFICADOR_ENTIDAD, { as: "GRUPO_MODIFICADOR_ENTIDADs", foreignKey: "Id_modificador_entidad"});
  COMPONENTE.belongsTo(TIPO_CARACTERISTICA, { as: "InputType_TIPO_CARACTERISTICA", foreignKey: "InputType"});
  TIPO_CARACTERISTICA.hasMany(COMPONENTE, { as: "COMPONENTEs", foreignKey: "InputType"});
  COMPONENTE_ENTIDAD.belongsTo(TIPO_CARACTERISTICA, { as: "Id_tipo_caracteristica_TIPO_CARACTERISTICA", foreignKey: "Id_tipo_caracteristica"});
  TIPO_CARACTERISTICA.hasMany(COMPONENTE_ENTIDAD, { as: "COMPONENTE_ENTIDADs", foreignKey: "Id_tipo_caracteristica"});
  COMPONENTE.belongsTo(TIPO_COMPONENTE, { as: "Type_TIPO_COMPONENTE", foreignKey: "Type"});
  TIPO_COMPONENTE.hasMany(COMPONENTE, { as: "COMPONENTEs", foreignKey: "Type"});
  COMPONENTE_ENTIDAD.belongsTo(TIPO_ENTIDAD, { as: "Id_tipo_entidad_TIPO_ENTIDAD", foreignKey: "Id_tipo_entidad"});
  TIPO_ENTIDAD.hasMany(COMPONENTE_ENTIDAD, { as: "COMPONENTE_ENTIDADs", foreignKey: "Id_tipo_entidad"});
  ENTIDAD.belongsTo(TIPO_ENTIDAD, { as: "Tipo_TIPO_ENTIDAD", foreignKey: "Tipo"});
  TIPO_ENTIDAD.hasMany(ENTIDAD, { as: "ENTIDADs", foreignKey: "Tipo"});
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
  CLASIFICACION_CLIENTE.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(CLASIFICACION_CLIENTE, { as: "CLASIFICACION_CLIENTEs", foreignKey: "Createdby"});
  CLASIFICACION_CLIENTE.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(CLASIFICACION_CLIENTE, { as: "Updatedby_CLASIFICACION_CLIENTEs", foreignKey: "Updatedby"});
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
  VALIDACION.belongsTo(User, { as: "Createdby_User", foreignKey: "Createdby"});
  User.hasMany(VALIDACION, { as: "VALIDACIONs", foreignKey: "Createdby"});
  VALIDACION.belongsTo(User, { as: "Updatedby_User", foreignKey: "Updatedby"});
  User.hasMany(VALIDACION, { as: "Updatedby_VALIDACIONs", foreignKey: "Updatedby"});
  COMPONENTE.belongsTo(VALIDACION, { as: "Id_validacion_VALIDACION", foreignKey: "Id_validacion"});
  VALIDACION.hasMany(COMPONENTE, { as: "COMPONENTEs", foreignKey: "Id_validacion"});

  return {
    CARACTERISTICA_BOOLEAN,
    CARACTERISTICA_DATE,
    CARACTERISTICA_DOUBLE,
    CARACTERISTICA_INT,
    CARACTERISTICA_STRING,
    CLASIFICACION_CLIENTE,
    COMPONENTE,
    COMPONENTE_ENTIDAD,
    ENTIDAD,
    ENTIDAD_CARACTERISTICA_BOOLEAN,
    ENTIDAD_CARACTERISTICA_DATE,
    ENTIDAD_CARACTERISTICA_DOUBLE,
    ENTIDAD_CARACTERISTICA_INT,
    ENTIDAD_CARACTERISTICA_STRING,
    GRUPO_MODIFICADOR_ENTIDAD,
    ICON,
    MODIFICADOR,
    MODIFICADOR_ENTIDAD,
    TIPO_CARACTERISTICA,
    TIPO_COMPONENTE,
    TIPO_ENTIDAD,
    User,
    VALIDACION,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
