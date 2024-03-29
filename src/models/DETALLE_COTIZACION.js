const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DETALLE_COTIZACION', {
    Id_detalle_cotizacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_cotizacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'COTIZACION',
        key: 'Id_cotizacion'
      }
    },
    Cantidad_meses: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Suma_capiltal: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Suma_intereses: {
      type: DataTypes.DECIMAL(18,8),
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
    tableName: 'DETALLE_COTIZACION',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_cotizacion" },
        ]
      },
      {
        name: "Id_detalle_cotizacion_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_cotizacion" },
        ]
      },
      {
        name: "Cotizacion_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
        ]
      },
    ]
  });
};
