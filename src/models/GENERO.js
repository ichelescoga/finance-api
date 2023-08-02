const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GENERO', {
    Id_genero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Descripcion: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'GENERO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_genero" },
        ]
      },
      {
        name: "Id_genero_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_genero" },
        ]
      },
    ]
  });
};
