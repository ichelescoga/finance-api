const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PARENTESCO', {
    Id_parentesco: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_parentesco: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Es_familia: {
      type: DataTypes.INTEGER,
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
    tableName: 'PARENTESCO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_parentesco" },
        ]
      },
      {
        name: "Id_parentesco_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_parentesco" },
        ]
      },
    ]
  });
};
