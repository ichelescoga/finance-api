const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    Id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Correo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "Correo_UNIQUE"
    },
    Nombre: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Contrasenia: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    tableName: 'User',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_user" },
        ]
      },
      {
        name: "Correo_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Correo" },
        ]
      },
    ]
  });
};
