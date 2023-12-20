const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ALBUN', {
    Id_albun: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PROYECTO',
        key: 'Id_proyecto'
      }
    },
    Name_albun: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Posicion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    State: {
      type: DataTypes.TINYINT,
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
    tableName: 'ALBUN',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_albun" },
          { name: "Id_proyecto" },
        ]
      },
      {
        name: "fk_ALBUn_PROYECTO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
        ]
      },
    ]
  });
};
