const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CUENTA_CORRIENTE', {
    Id_cuenta_corriente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_cotizacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'COTIZACION',
        key: 'Id_cotizacion'
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
    tableName: 'CUENTA_CORRIENTE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_cuenta_corriente" },
        ]
      },
      {
        name: "fk_CUENTA_CORRIENTE_COTIZACION1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
        ]
      },
    ]
  });
};
