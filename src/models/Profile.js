const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Profile', {
    Id_profile: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    User_Id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'User',
        key: 'Id_user'
      }
    }
  }, {
    sequelize,
    tableName: 'Profile',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_profile" },
          { name: "User_Id_user" },
        ]
      },
      {
        name: "User_Id_user_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "User_Id_user" },
        ]
      },
      {
        name: "fk_Profile_User_idx",
        using: "BTREE",
        fields: [
          { name: "User_Id_user" },
        ]
      },
    ]
  });
};
