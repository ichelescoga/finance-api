const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BOLETA_PAGO', {
    Id_boleta_pago: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Referencia: {
      type: DataTypes.STRING(75),
      allowNull: true
    },
    Url: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Id_forma_pago: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FORMA_PAGO',
        key: 'Id_forma_pago'
      }
    },
    Id_status_pago: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'STATUS_PAGO',
        key: 'Id_status_pago'
      }
    },
    Id_establecimiento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ESTABLECIMIENTO',
        key: 'Id_establecimiento'
      }
    },
    Id_cotizacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'COTIZACION',
        key: 'Id_cotizacion'
      }
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
    tableName: 'BOLETA_PAGO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_boleta_pago" },
        ]
      },
      {
        name: "fk_BOLETA_PAGO_FORMA_PAGO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_forma_pago" },
        ]
      },
      {
        name: "fk_BOLETA_PAGO_STATUS_PAGO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_status_pago" },
        ]
      },
      {
        name: "fk_BOLETA_PAGO_Establecimiento1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_establecimiento" },
        ]
      },
      {
        name: "fk_BOLETA_PAGO_COTIZACION1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
        ]
      },
    ]
  });
};
