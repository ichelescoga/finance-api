const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PAGO', {
    Id_pago: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_cuenta_corriente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CUENTA_CORRIENTE',
        key: 'Id_cuenta_corriente'
      }
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Monto: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Pago_capital: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Saldo: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Interes: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Fecha_limite_pago: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Pago: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Referencia: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Categoria: {
      type: DataTypes.ENUM('Principal','Secundaria'),
      allowNull: true
    },
    Mora: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Id_tipo_pago: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TIPO_PAGO',
        key: 'Id_tipo_pago'
      }
    },
    Id_status_transaccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'STATUS_TRANSACCION',
        key: 'Id_status_transaccion'
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
    tableName: 'PAGO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_pago" },
        ]
      },
      {
        name: "fk_PAGO_CUENTA_CORRIENTE1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cuenta_corriente" },
        ]
      },
      {
        name: "fk_PAGO_TIPO_PAGO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_tipo_pago" },
        ]
      },
      {
        name: "fk_PAGO_STATUS_TRANSACCION1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_status_transaccion" },
        ]
      },
      {
        name: "fk_PAGO_STATUS_PAGO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_status_pago" },
        ]
      },
    ]
  });
};
