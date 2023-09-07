const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DETALLE_EJECUTIVO', {
    Id_detalle_ejecutivo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_plan_financiero: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Id_ejecutivo: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: 'DETALLE_EJECUTIVO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_ejecutivo" },
        ]
      },
      {
        name: "Id_detalle_ejecutivo_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_ejecutivo" },
        ]
      },
    ]
  });
};
