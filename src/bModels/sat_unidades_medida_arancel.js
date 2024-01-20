const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sat_unidades_medida_arancel', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    inciso: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    unidad_principal: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    unidad_secundaria: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    unidad_alterna: {
      type: DataTypes.STRING(11),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sat_unidades_medida_arancel',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
