const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UNIDAD_COTIZACION', {
    Id_unidad_cotizacion: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_cotizacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'COTIZACION',
        key: 'Id_cotizacion'
      }
    },
    Id_unidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'UNIDAD',
        key: 'Id_unidad'
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
    tableName: 'UNIDAD_COTIZACION',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_unidad_cotizacion" },
          { name: "Id_cotizacion" },
          { name: "Id_unidad" },
        ]
      },
      {
        name: "fk_UNIDAD_has_COTIZACION_COTIZACION1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cotizacion" },
        ]
      },
      {
        name: "fk_UNIDAD_COTIZACION_UNIDAD1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_unidad" },
        ]
      },
    ]
  });
};
