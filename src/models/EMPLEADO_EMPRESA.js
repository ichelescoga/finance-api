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
    createdAt: {          
      field: 'created_at',          
      type: Sequelize.DATE,      
    },      
    updatedAt: {          
      field: 'updated_at',          
      type: Sequelize.DATE 
    }
  }, {
    sequelize,
    tableName: 'EMPLEADO_EMPRESA',
    timestamps: true,
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
