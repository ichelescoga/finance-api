const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('REFERENCIA', {
    Id_referecia: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_compraventa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'COMPRA_VENTA',
        key: 'Id_compraventa'
      }
    },
    Nombre_completo: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    Residencia: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },     
    createdAt: {          
      field: 'created_at',          
      type: Sequelize.DATE,      
    },      
    updatedAt: {          
      field: 'updated_at',          
      type: Sequelize.DATE 
    },
  }, {
    sequelize,
    tableName: 'REFERENCIA',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_referecia" },
        ]
      },
      {
        name: "fk_Referencias_COMPRA_VENTA1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_compraventa" },
        ]
      },
    ]
  });
};
