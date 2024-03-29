const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MUNICIPIO', {
    Id_municipio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_municipio: {
      type: DataTypes.STRING(60),
      allowNull: true
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
    },
    Id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DEPARTAMENTO',
        key: 'Id_departamento'
      }
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
      {
        name: "fk_departamento_municipio",
        using: "BTREE",
        fields: [
          { name: "Id_departamento" },
        ]
      },
    ]
  });
};
