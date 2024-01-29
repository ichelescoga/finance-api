const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ENTIDAD', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Descripcion: {
      type: DataTypes.STRING(250),
      allowNull: true
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
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Tipo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TIPO_ENTIDAD',
        key: 'Id'
      }
    }
  }, {
    sequelize,
    tableName: 'ENTIDAD',
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
        name: "Tipo",
        using: "BTREE",
        fields: [
          { name: "Tipo" },
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
    ]
  });
};
