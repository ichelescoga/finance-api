const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TIPO_ENTIDAD_CARACTERISTICA', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_tipo_entidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_caracteristica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_tipo_caracteristica: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: 'TIPO_ENTIDAD_CARACTERISTICA',
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
        name: "Id_tipo_caracteristica",
        using: "BTREE",
        fields: [
          { name: "Id_tipo_caracteristica" },
        ]
      },
    ]
  });
};
