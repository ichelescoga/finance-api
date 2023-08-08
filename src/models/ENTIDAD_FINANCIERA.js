const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ENTIDAD_FINANCIERA', {
    Id_ent_financiera: {
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
    createdAt: {          
      field: 'created_at',          
      type: Sequelize.DATE,      
    },      
    updatedAt: {          
      field: 'updated_at',          
      type: Sequelize.DATE 
    }
  }, {
    sequelize,
    tableName: 'ENTIDAD_FINANCIERA',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_ent_financiera" },
        ]
      },
      {
        name: "Id_ent_financiera_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_ent_financiera" },
        ]
      },
    ]
  });
};
