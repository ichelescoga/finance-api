const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('APLICACION', {
    Id_aplicacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_cotizacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'COTIZACION',
        key: 'Id_cotizacion'
      }
    },
    Id_ejecutivo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'EJECUTIVO',
        key: 'Id_ejecutivo'
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
    Foto_DPI_enfrente: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Foto_DPI_reverso: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Id_dtalle_fiador: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DETALLE_FIADOR',
        key: 'Id_detalle_fiador'
      }
    },
    Empresa: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Sueldo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DPI: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    NIT: {
      type: DataTypes.STRING(13),
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
    }
  }, {
    sequelize,
    tableName: 'APLICACION',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_aplicacion" },
        ]
      },
      {
        name: "Id_aplicacion_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_aplicacion" },
        ]
      },
      {
        name: "Fiadores_idx",
        using: "BTREE",
        fields: [
          { name: "Id_dtalle_fiador" },
        ]
      },
      {
        name: "Cotizacion_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
        ]
      },
      {
        name: "Ejecutivo_idx",
        using: "BTREE",
        fields: [
          { name: "Id_ejecutivo" },
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
