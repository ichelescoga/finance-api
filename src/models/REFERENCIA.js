const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('REFERENCIA', {
    Id_referecia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_compraventa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'COMPRA_VENTA',
        key: 'Id_compraventa'
      }
    },
    Nombre_completo: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    Residencia: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Telefono: {
      type: DataTypes.STRING(20),
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
    tableName: 'REFERENCIA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_referecia" },
        ]
      },
      {
        name: "Id_compraventa",
        using: "BTREE",
        fields: [
          { name: "Id_compraventa" },
        ]
      },
    ]
  });
};
