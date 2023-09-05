const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EMPRESA', {
    Id_empresa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Razon_social: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Nombre_comercial: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Representante_legal: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    NIT: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    DPI: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    Direccion: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Codigo_postal: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Nombre_contacto: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Telefono_contacto: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Gerente_ventas: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Telefono_gerente: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Id_pais: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PAIS',
        key: 'Id_pais'
      }
    },
    Id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DEPARTAMENTO',
        key: 'Id_departamento'
      }
    },
    Id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'MUNICIPIO',
        key: 'Id_municipio'
      }
    },     
    createdAt: {          
      field: 'created_at',          
      type: Sequelize.DATE,      
    },      
    updatedAt: {          
      field: 'updated_at',          
      type: Sequelize.DATE 
    },
  }, {
    sequelize,
    tableName: 'EMPRESA',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_empresa" },
        ]
      },
      {
        name: "Id_empresa_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_empresa" },
        ]
      },
      {
        name: "Pais_idx",
        using: "BTREE",
        fields: [
          { name: "Id_pais" },
        ]
      },
      {
        name: "Departamento_idx",
        using: "BTREE",
        fields: [
          { name: "Id_departamento" },
        ]
      },
      {
        name: "Municipio_idx",
        using: "BTREE",
        fields: [
          { name: "Id_municipio" },
        ]
      },
    ]
  });
};
