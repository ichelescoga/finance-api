const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COTIZACION', {
    Id_cotizacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_detalle_asesor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ASESOR_DETALLE',
        key: 'Id_detalle_asesor'
      }
    },
    Id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ESTADO',
        key: 'Id_estado'
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
    Descuento: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Venta_descuento: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Precio_contado: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Aguinaldo: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Bono_catorce: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Url_cotizacion: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Comentario: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Url_compraventa: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Monto_descuento_soli: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Solicitud_descuento: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Estado_descuento: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'COTIZACION',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
          { name: "Id_estado" },
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
      {
        name: "fk_COTIZACION_ESTADO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_estado" },
        ]
      },
    ]
  });
};
