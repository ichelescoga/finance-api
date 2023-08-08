const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TIPO_CREDITO', {
    Id_tipo_credito: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_credito: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Descripcion: {
      type: DataTypes.STRING(200),
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
    tableName: 'TIPO_CREDITO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_tipo_credito" },
        ]
      },
      {
        name: "Id_tipo_credito_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_tipo_credito" },
        ]
      },
    ]
  });
};
