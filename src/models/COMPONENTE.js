const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('COMPONENTE', {
    Id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TIPO_COMPONENTE',
        key: 'Id'
      }
    },
    Place_holder: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    Id_icon: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ICON',
        key: 'Id'
      }
    },
    ShowInList: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    hintText: {
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
    },
    label: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    InputType: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TIPO_CARACTERISTICA',
        key: 'Id'
      }
    },
    bodyKey: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Id_validacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'VALIDACION',
        key: 'Id'
      }
    },
    columnNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    listKeys: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    show: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'COMPONENTE',
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
        name: "Id_icon",
        using: "BTREE",
        fields: [
          { name: "Id_icon" },
        ]
      },
      {
        name: "fk_Type",
        using: "BTREE",
        fields: [
          { name: "Type" },
        ]
      },
      {
        name: "fk_InputType",
        using: "BTREE",
        fields: [
          { name: "InputType" },
        ]
      },
      {
        name: "fk_validacion",
        using: "BTREE",
        fields: [
          { name: "Id_validacion" },
        ]
      },
    ]
  });
};
