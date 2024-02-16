const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ENTIDAD_CARACTERISTICA_DOUBLE', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_caracteristica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CARACTERISTICA_DOUBLE',
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
    Valor: {
      type: DataTypes.DOUBLE,
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
    }
  }, {
    sequelize,
    tableName: 'ENTIDAD_CARACTERISTICA_DOUBLE',
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
        name: "Updatedby",
        using: "BTREE",
        fields: [
          { name: "Updatedby" },
        ]
      },
      {
        name: "Id_caracteristica",
        using: "BTREE",
        fields: [
          { name: "Id_caracteristica" },
        ]
      },
      {
        name: "Id_entidad",
        using: "BTREE",
        fields: [
          { name: "Id_entidad" },
        ]
      },
    ]
  });
};
