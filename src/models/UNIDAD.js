const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UNIDAD', {
    Id_unidad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ESTADO',
        key: 'Id_estado'
      }
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
    Nombre_unidad: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    Precio_Venta: {
      type: DataTypes.DECIMAL(10,2),
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
    tableName: 'UNIDAD',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_unidad" },
          { name: "Id_estado" },
          { name: "Id_proyecto" },
        ]
      },
      {
        name: "Id_sub_proyecto_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_unidad" },
        ]
      },
      {
        name: "fk_UNIDAD_PROYECTO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
        ]
      },
      {
        name: "fk_UNIDAD_ESTADO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_estado" },
        ]
      },
    ]
  });
};
