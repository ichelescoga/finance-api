const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('MUNICIPIO', {
    Id_municipio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_municipio: {
      type: DataTypes.STRING(60),
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
    tableName: 'MUNICIPIO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_municipio" },
        ]
      },
      {
        name: "Id_municipio_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_municipio" },
        ]
      },
    ]
  });
};
