const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MUNICIPIO', {
    Id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_municipio: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'MUNICIPIO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_municipio" },
        ]
      },
      {
        name: "Id_municipio_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_municipio" },
        ]
      },
    ]
  });
};
