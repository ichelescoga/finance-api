const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PROYECTO', {
    Id_proyecto: {
      autoIncrement: true,
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
      allowNull: false,
      references: {
        model: 'EMPRESA',
        key: 'Id_empresa'
      }
    },
    Id_pais: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    },
    Cantidad_unidades: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Fecha_inicio_venta: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Fecha_fin_venta: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Costo_promedio_unidad: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    Costo_total_venta: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    Logo_proyecto: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Descripcion: {
      type: DataTypes.STRING(250),
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
    tableName: 'PROYECTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
          { name: "Id_pais" },
          { name: "Id_departamento" },
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
