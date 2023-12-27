const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EMPLEADO_EMPRESA', {
    Id_empleado_empresa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'EMPLEADO_ASESOR',
        key: 'Id_empleado'
      }
    },
    Id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'EMPRESA',
        key: 'Id_empresa'
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
    tableName: 'EMPLEADO_EMPRESA',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_empleado_empresa" },
          { name: "Id_empleado" },
          { name: "Id_empresa" },
        ]
      },
      {
        name: "fk_EMPLEADO_EMPRESA_EMPLEADO_ASESOR1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_empleado" },
        ]
      },
      {
        name: "fk_EMPLEADO_EMPRESA_EMPRESA1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_empresa" },
        ]
      },
    ]
  });
};
