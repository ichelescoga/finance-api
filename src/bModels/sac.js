const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sac', {
    codigo: {
      type: DataTypes.STRING(12),
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tarifa: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    seccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    observacion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iva: {
      type: DataTypes.STRING(3),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'sac',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigo" },
        ]
      },
      {
        name: "codigo",
        using: "BTREE",
        fields: [
          { name: "codigo" },
        ]
      },
    ]
  });
};
