const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DEPARTAMENTO', {
    Id_departamento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre_departamento: {
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
    tableName: 'DEPARTAMENTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_departamento" },
        ]
      },
      {
        name: "Id_departamento_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_departamento" },
        ]
      },
    ]
  });
};
