const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DEPARTAMENTO', {
    Id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_departamento: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'DEPARTAMENTO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_departamento" },
        ]
      },
      {
        name: "Id_departamento_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_departamento" },
        ]
      },
    ]
  });
};
