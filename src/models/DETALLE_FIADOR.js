const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DETALLE_FIADOR', {
    Id_detalle_fiador: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_aplicacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'APLICACION',
        key: 'Id_aplicacion'
      }
    },
    Id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CLIENTE',
        key: 'Id_cliente'
      }
    },
    Id_parentesco: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PARENTESCO',
        key: 'Id_parentesco'
      }
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
    tableName: 'DETALLE_FIADOR',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_fiador" },
        ]
      },
      {
        name: "Id_detalle_fiador_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_detalle_fiador" },
        ]
      },
      {
        name: "Aplicacion_idx",
        using: "BTREE",
        fields: [
          { name: "Id_aplicacion" },
        ]
      },
      {
        name: "Cliente_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cliente" },
        ]
      },
      {
        name: "Parentesco_idx",
        using: "BTREE",
        fields: [
          { name: "Id_parentesco" },
        ]
      },
    ]
  });
};
