const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ASESOR_DETALLE', {
    Id_detalle_asesor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_sub_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'SUB_PROYECTO',
        key: 'Id_sub_proyecto'
      }
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
        name: "SubProyecto_idx",
        using: "BTREE",
        fields: [
          { name: "Id_sub_proyecto" },
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
