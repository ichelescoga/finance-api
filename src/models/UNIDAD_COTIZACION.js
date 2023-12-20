const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UNIDAD_COTIZACION', {
    Id_unidad_cotizacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_cotizacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'COTIZACION',
        key: 'Id_cotizacion'
      }
    },
    Id_unidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'UNIDAD',
        key: 'Id_unidad'
      }
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
    tableName: 'UNIDAD_COTIZACION',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_unidad_cotizacion" },
          { name: "Id_cotizacion" },
          { name: "Id_unidad" },
        ]
      },
      {
        name: "fk_UNIDAD_has_COTIZACION_COTIZACION1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
        ]
      },
      {
        name: "fk_UNIDAD_COTIZACION_UNIDAD1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_unidad" },
        ]
      },
    ]
  });
};
