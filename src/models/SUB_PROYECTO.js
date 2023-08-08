const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SUB_PROYECTO', {
    Id_sub_proyecto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PROYECTO',
        key: 'Id_proyecto'
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
    tableName: 'SUB_PROYECTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_sub_proyecto" },
        ]
      },
      {
        name: "Id_sub_proyecto_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_sub_proyecto" },
        ]
      },
      {
        name: "Proyecto_idx",
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
        ]
      },
    ]
  });
};
