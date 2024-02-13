const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Id_detalle_porcentaje_Interes', {
    Id_detalle_porcentaje_enganche: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Fecha_inicial: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Fecha_final: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Status: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Porcentaje: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PROYECTO',
        key: 'Id_proyecto'
      }
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
    tableName: 'DETALLE_PORCENTAJE_INTERES',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_porcentaje_Interes" },
        ]
      },
      {
        name: "fk_DETALLE_PORCENTAJE_INTERES_PROYECTO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
        ]
      },
    ]
  });
};
