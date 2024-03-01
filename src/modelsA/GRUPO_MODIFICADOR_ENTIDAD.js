const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('GRUPO_MODIFICADOR_ENTIDAD', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_modificador_entidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'MODIFICADOR_ENTIDAD',
        key: 'Id'
      }
    },
    Id_entidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ENTIDAD',
        key: 'Id'
      }
    },
    Nivel: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Padre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'GRUPO_MODIFICADOR_ENTIDAD',
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
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'GRUPO_MODIFICADOR_ENTIDAD',
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
        name: "Id_modificador_entidad",
        using: "BTREE",
        fields: [
          { name: "Id_modificador_entidad" },
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
        name: "Padre",
        using: "BTREE",
        fields: [
          { name: "Padre" },
        ]
      },
    ]
  });
};
