const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CONTACTO', {
    Id_contacto: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_proyecto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PROYECTO',
        key: 'Id_proyecto'
      }
    },
    Id_user_profile: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'USER_PROFILE',
        key: 'Id_user_profile'
      }
    },
    State: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Nombre_completo: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    Telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Correo: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Direccion: {
      type: DataTypes.STRING(150),
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
    tableName: 'CONTACTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_contacto" },
          { name: "Id_proyecto" },
          { name: "Id_user_profile" },
        ]
      },
      {
        name: "fk_CONTACTO_PROYECTO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
        ]
      },
      {
        name: "fk_CONTACTO_USER_PROFILE1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_user_profile" },
        ]
      },
    ]
  });
};
