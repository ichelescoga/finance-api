const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {

  function initModels(sequelize) {
    // Coloca tu lógica de inicialización de modelos aquí
  }

  initModels(sequelize);

  return sequelize.define('ESTADO_CUENTA', {
    Idestado_cuenta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_compraventa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'COMPRA_VENTA',
        key: 'Id_compraventa'
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
    tableName: 'ESTADO_CUENTA',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Idestado_cuenta" },
          { name: "Id_compraventa" },
        ]
      },
      {
        name: "fk_ESTADO_CUENTA_COMPRA_VENTA1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_compraventa" },
        ]
      },
    ]
  });
};
