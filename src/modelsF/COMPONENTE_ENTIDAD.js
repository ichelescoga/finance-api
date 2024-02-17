const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COMPONENTE_ENTIDAD', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_componente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'COMPONENTE',
        key: 'Id'
      }
    },
    Id_tipo_entidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TIPO_ENTIDAD',
        key: 'Id'
      }
    },
    Id_caracteristica: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Id_tipo_caracteristica: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TIPO_CARACTERISTICA',
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
    tableName: 'COMPONENTE_ENTIDAD',
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
      {
        name: "Id_tipo_entidad",
        using: "BTREE",
        fields: [
          { name: "Id_tipo_entidad" },
        ]
      },
      {
        name: "Id_tipo_caracteristica",
        using: "BTREE",
        fields: [
          { name: "Id_tipo_caracteristica" },
        ]
      },
    ]
  });
};
