const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLIENTE_HAS_CONTACTO', {
    Idcliente_has_contacto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CLIENTE',
        key: 'Id_cliente'
      }
    },
    Id_contacto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CONTACTO',
        key: 'Id_contacto'
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
    tableName: 'CLIENTE_HAS_CONTACTO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Idcliente_has_contacto" },
        ]
      },
      {
        name: "fk_Cliente_has_contacto_CLIENTE1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cliente" },
        ]
      },
      {
        name: "fk_Cliente_has_contacto_CONTACTO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_contacto" },
        ]
      },
    ]
  });
};
