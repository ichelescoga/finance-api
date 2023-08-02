const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('FAMILIA', {
    Id_familia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_clinete: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CLIENTE',
        key: 'Id_cliente'
      }
    },
    Id_parentesco: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PARENTESCO',
        key: 'Id_parentesco'
      }
    },
    Nombre: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Apellido: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Id_nacionalidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PAIS',
        key: 'Id_pais'
      }
    }
  }, {
    sequelize,
    tableName: 'FAMILIA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_familia" },
        ]
      },
      {
        name: "Id_familia_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_familia" },
        ]
      },
      {
        name: "Cliente_idx",
        using: "BTREE",
        fields: [
          { name: "Id_clinete" },
        ]
      },
      {
        name: "Nacionalidad_idx",
        using: "BTREE",
        fields: [
          { name: "Id_nacionalidad" },
        ]
      },
      {
        name: "Parentesco_idx",
        using: "BTREE",
        fields: [
          { name: "Id_parentesco" },
        ]
      },
    ]
  });
};
