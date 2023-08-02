const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PAIS', {
    Id_pais: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_pais: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    ISO_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Telefono_codigo: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PAIS',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_pais" },
        ]
      },
      {
        name: "Id_pais_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_pais" },
        ]
      },
    ]
  });
};
