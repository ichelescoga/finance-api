const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DETALLE_EJECUTIVO', {
    Id_detalle_ejecutivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_plan_financiero: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Id_ejecutivo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'DETALLE_EJECUTIVO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_ejecutivo" },
        ]
      },
      {
        name: "Id_detalle_ejecutivo_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_ejecutivo" },
        ]
      },
    ]
  });
};
