const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PARENTESCO', {
    Id_parentesco: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_parentesco: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Es_familia: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PARENTESCO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_parentesco" },
        ]
      },
      {
        name: "Id_parentesco_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_parentesco" },
        ]
      },
    ]
  });
};
