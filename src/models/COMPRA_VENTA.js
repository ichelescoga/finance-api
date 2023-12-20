const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COMPRA_VENTA', {
    Id_compraventa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_cotizacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'COTIZACION',
        key: 'Id_cotizacion'
      }
    },
    Nombre_completo_cmprd: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Fecha_nacimiento_cmprd: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Estado_civil_cmprd: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Nacionalidad_cmprd: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Profesion_cmprd: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Residencia_cmprd: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Telefono_cmprd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Direccion_trabajo_cmprd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Telefono_trabajo__cmprd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Ingreso_mensualLetras_cmprd: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    Ingreso_mensualNo_cmprd: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Correo_electronico_cmprd: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Documento_identificacion_cmprd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Pasaporte_cmprd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Dpi_cmprd: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Extendido_cmprd: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Razon_social: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    Url_fotocopia_representacion: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Valor_total_lote: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Valor_mejoras: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Contado: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Reserva: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Fecha_limeteCancSaldo: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Enganche: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    saldo: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Numero_cuotas: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Valor_cuotas: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Ciudad: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    FechaCreacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Area_lote: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Lote_numero: {
      type: DataTypes.STRING(100),
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
    tableName: 'COMPRA_VENTA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_compraventa" },
          { name: "Id_cotizacion" },
        ]
      },
      {
        name: "fk_COMPRA_VENTA_COTIZACION1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
        ]
      },
    ]
  });
};
