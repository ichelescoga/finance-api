const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ASESOR_DETALLE', {
    Id_detalle_asesor: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'EMPLEADO_ASESOR',
        key: 'Id_empleado'
      }
    },
    Comision: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Meta_vental: {
      type: DataTypes.DECIMAL(18,8),
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
    tableName: 'ASESOR_DETALLE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_asesor" },
        ]
      },
      {
        name: "Id_detalle_asesor_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_asesor" },
        ]
      },
      {
        name: "Empleado_idx",
        using: "BTREE",
        fields: [
          { name: "Id_empleado" },
        ]
      },
    ]
  });
};
