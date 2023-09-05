const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TIPO_PROYECTO', {
    Id_tipo_proyecto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Descripcion: {
      type: DataTypes.STRING(100),
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
    tableName: 'TIPO_PROYECTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_tipo_proyecto" },
        ]
      },
      {
        name: "Id_tipo_proyecto_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_tipo_proyecto" },
        ]
      },
    ]
  });
};
