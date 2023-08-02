const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PLAN_FINANCIERO_PROY', {
    Id_plan_financiero: {
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
    Id_ent_financiera: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ENTIDAD_FINANCIERA',
        key: 'Id_ent_financiera'
      }
    },
    Id_tipo_credito: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TIPO_CREDITO',
        key: 'Id_tipo_credito'
      }
    },
    Tasa_interes: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Meses_maximo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Pagos_especiales: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Enganche_minimo: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Id_detalle_ejecutivo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'DETALLE_EJECUTIVO',
        key: 'Id_detalle_ejecutivo'
      }
    }
  }, {
    sequelize,
    tableName: 'PLAN_FINANCIERO_PROY',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_plan_financiero" },
        ]
      },
      {
        name: "Id_plan_financiero_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_plan_financiero" },
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
        name: "EntidadFinanciera_idx",
        using: "BTREE",
        fields: [
          { name: "Id_ent_financiera" },
        ]
      },
      {
        name: "Ejecutivos_idx",
        using: "BTREE",
        fields: [
          { name: "Id_detalle_ejecutivo" },
        ]
      },
      {
        name: "TipoCredito_idx",
        using: "BTREE",
        fields: [
          { name: "Id_tipo_credito" },
        ]
      },
    ]
  });
};
