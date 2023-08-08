const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COTIZACION', {
    Id_cotizacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_sub_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'SUB_PROYECTO',
        key: 'Id_sub_proyecto'
      }
    },
    Id_detalle_asesor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ASESOR_DETALLE',
        key: 'Id_detalle_asesor'
      }
    },
    Id_plan_financiero: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PLAN_FINANCIERO_PROY',
        key: 'Id_plan_financiero'
      }
    },
    Id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CLIENTE',
        key: 'Id_cliente'
      }
    },
    Fecha: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Fecha_hora: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Ingreso_mensual: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Enganche: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Meses_plazo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Mes_inicio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Anio_inicio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Mes_fin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Anio_fin: {
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
    tableName: 'COTIZACION',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
        ]
      },
      {
        name: "Id_cotizacion_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
        ]
      },
      {
        name: "SubProyecto_idx",
        using: "BTREE",
        fields: [
          { name: "Id_sub_proyecto" },
        ]
      },
      {
        name: "DetalleAsesor_idx",
        using: "BTREE",
        fields: [
          { name: "Id_detalle_asesor" },
        ]
      },
      {
        name: "PlanFinanciero_idx",
        using: "BTREE",
        fields: [
          { name: "Id_plan_financiero" },
        ]
      },
      {
        name: "Cliente_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cliente" },
        ]
      },
    ]
  });
};
