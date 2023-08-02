const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PUESTO', {
    Id_puesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_puesto: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Descripcion: {
      type: DataTypes.STRING(250),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PUESTO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_puesto" },
        ]
      },
      {
        name: "Id_puesto_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_puesto" },
        ]
      },
    ]
  });
};
