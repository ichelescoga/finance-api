const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sat_dai', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    partida: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      defaultValue: ""
    },
    arancel: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'sat_dai',
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
        name: "partida",
        using: "BTREE",
        fields: [
          { name: "partida" },
        ]
      },
      {
        name: "descripcion",
        using: "BTREE",
        fields: [
          { name: "descripcion" },
        ]
      },
      {
        name: "arancel",
        using: "BTREE",
        fields: [
          { name: "arancel" },
        ]
      },
    ]
  });
};
