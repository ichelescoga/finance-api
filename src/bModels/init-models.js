var DataTypes = require("sequelize").DataTypes;
var _DUA_DM_FRACCION = require("./DUA_DM_FRACCION");
var _sac = require("./sac");
var _sat_dai = require("./sat_dai");
var _sat_unidades_medida_arancel = require("./sat_unidades_medida_arancel");

function initModels(sequelize) {
  var DUA_DM_FRACCION = _DUA_DM_FRACCION(sequelize, DataTypes);
  var sac = _sac(sequelize, DataTypes);
  var sat_dai = _sat_dai(sequelize, DataTypes);
  var sat_unidades_medida_arancel = _sat_unidades_medida_arancel(sequelize, DataTypes);


  return {
    DUA_DM_FRACCION,
    sac,
    sat_dai,
    sat_unidades_medida_arancel,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
