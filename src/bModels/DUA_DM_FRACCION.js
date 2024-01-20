const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DUA_DM_FRACCION', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    exp_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    item_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    docto_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NUMERO_ORDEN: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    SECUENCIA_FRACCION: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    NOMBRE_CATALOGO_CODIGO: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    NOMBRE_CATALOGO: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    VALOR_CATALOGO_CODIGO: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: ""
    },
    VALOR_CATALOGO: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ""
    },
    TEXTO_LIBRE: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(1),
      allowNull: true,
      defaultValue: "1"
    }
  }, {
    sequelize,
    tableName: 'DUA_DM_FRACCION',
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
      {
        name: "exp_id",
        using: "BTREE",
        fields: [
          { name: "exp_id" },
        ]
      },
      {
        name: "NUMERO_ORDEN",
        using: "BTREE",
        fields: [
          { name: "NUMERO_ORDEN" },
        ]
      },
      {
        name: "status",
        using: "BTREE",
        fields: [
          { name: "status" },
        ]
      },
      {
        name: "docto_id",
        using: "BTREE",
        fields: [
          { name: "docto_id" },
        ]
      },
      {
        name: "item_id",
        using: "BTREE",
        fields: [
          { name: "item_id" },
        ]
      },
      {
        name: "SECUENCIA_FRACCION",
        using: "BTREE",
        fields: [
          { name: "SECUENCIA_FRACCION" },
        ]
      },
      {
        name: "NOMBRE_CATALOGO_CODIGO",
        using: "BTREE",
        fields: [
          { name: "NOMBRE_CATALOGO_CODIGO" },
        ]
      },
      {
        name: "NOMBRE_CATALOGO",
        using: "BTREE",
        fields: [
          { name: "NOMBRE_CATALOGO" },
        ]
      },
      {
        name: "VALOR_CATALOGO_CODIGO",
        using: "BTREE",
        fields: [
          { name: "VALOR_CATALOGO_CODIGO" },
        ]
      },
      {
        name: "VALOR_CATALOGO",
        using: "BTREE",
        fields: [
          { name: "VALOR_CATALOGO" },
        ]
      },
    ]
  });
};
