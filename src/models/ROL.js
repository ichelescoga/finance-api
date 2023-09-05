const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ROL', {
    Id_rol: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_rol: {
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
    tableName: 'ROL',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_rol" },
        ]
      },
    ]
  });
};
