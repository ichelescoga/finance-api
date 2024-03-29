const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PUESTO', {
    Id_puesto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_puesto: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Descripcion: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'PUESTO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_puesto" },
        ]
      },
      {
        name: "Id_puesto_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_puesto" },
        ]
      },
    ]
  });
};
