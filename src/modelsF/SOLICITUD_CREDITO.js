const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SOLICITUD_CREDITO', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Tasa_interes: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Tasa_comision: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    NIT: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    Empresa: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    No_Factura: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Serie_Factura: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    Monto_solicitado: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Fecha_desembolso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Fecha_pago: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Dias_credito: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Comision: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Intereses: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Monto_desembolsar: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Factura: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    Carta_representante: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    Id_entidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ENTIDAD',
        key: 'Id'
      }
    },
    Created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    Createdby: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'Id_user'
      }
    },
    Updatedby: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'User',
        key: 'Id_user'
      }
    },
    Estado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ESTADO_SOLICITUD',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'SOLICITUD_CREDITO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id" },
        ]
      },
      {
        name: "Id_entidad",
        using: "BTREE",
        fields: [
          { name: "Id_entidad" },
        ]
      },
      {
        name: "Createdby",
        using: "BTREE",
        fields: [
          { name: "Createdby" },
        ]
      },
      {
        name: "Updatedby",
        using: "BTREE",
        fields: [
          { name: "Updatedby" },
        ]
      },
      {
        name: "Estado",
        using: "BTREE",
        fields: [
          { name: "Estado" },
        ]
      },
    ]
  });
};
