const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ITEM', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    key: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    Id_componente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'COMPONENTE',
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
      allowNull: true
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
      allowNull: true
    },
    Estado: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ITEM',
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
        name: "Createdby",
        using: "BTREE",
        fields: [
          { name: "Createdby" },
        ]
      },
      {
        name: "Id_componente",
        using: "BTREE",
        fields: [
          { name: "Id_componente" },
        ]
      },
    ]
  });
};
