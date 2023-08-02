const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROYECTO', {
    Id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_proyecto: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'EMPRESA',
        key: 'Id_empresa'
      }
    },
    Id_pais: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Direccion: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Coordenadas: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Id_tipo_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TIPO_PROYECTO',
        key: 'Id_tipo_proyecto'
      }
    }
  }, {
    sequelize,
    tableName: 'PROYECTO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
        ]
      },
      {
        name: "Id_proyecto_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
        ]
      },
      {
        name: "Empresa_idx",
        using: "BTREE",
        fields: [
          { name: "Id_empresa" },
        ]
      },
      {
        name: "Tipo_proyecto_idx",
        using: "BTREE",
        fields: [
          { name: "Id_tipo_proyecto" },
        ]
      },
    ]
  });
};
