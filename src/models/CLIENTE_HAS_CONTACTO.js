const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {

  function initModels(sequelize) {
    // Coloca tu lógica de inicialización de modelos aquí
  }

  initModels(sequelize);

  return sequelize.define('CLIENTE_HAS_CONTACTO', {
    Idcliente_has_contacto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CLIENTE',
        key: 'Id_cliente'
      }
    },
    Id_contacto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CONTACTO',
        key: 'Id_contacto'
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
    tableName: 'CLIENTE_HAS_CONTACTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Idcliente_has_contacto" },
        ]
      },
      {
        name: "fk_Cliente_has_contacto_CLIENTE1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cliente" },
        ]
      },
      {
        name: "fk_Cliente_has_contacto_CONTACTO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_contacto" },
        ]
      },
    ]
  });
};
