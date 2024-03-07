const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RANGO', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Maximo: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    Tiempo_maximo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Tiempo_minimo: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Empleado: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Tasa_comision: {
      type: DataTypes.DOUBLE,
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
    tableName: 'RANGO',
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
