const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {

  function initModels(sequelize) {
    // Coloca tu lógica de inicialización de modelos aquí
  }

  initModels(sequelize);

  return sequelize.define('DETALLES_CUOTA', {
    Id_pago: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Idestado_cuenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ESTADO_CUENTA',
        key: 'Idestado_cuenta'
      }
    },
    Saldo: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Capital: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Pago_Adicional: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Interes: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Cuota: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Estado: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Activo: {
      type: DataTypes.TINYINT,
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
    tableName: 'DETALLES_CUOTA',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_pago" },
          { name: "Idestado_cuenta" },
        ]
      },
      {
        name: "fk_DETALLES_CUOTA_ESTADO_CUENTA1_idx",
        using: "BTREE",
        fields: [
          { name: "Idestado_cuenta" },
        ]
      },
    ]
  });
};