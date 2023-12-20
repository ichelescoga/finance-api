const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('USER_PROFILE', {
    Id_user_profile: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_rol: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ROL',
        key: 'Id_rol'
      }
    },
    Id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'Id_user'
      }
    },
    Id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'EMPLEADO_ASESOR',
        key: 'Id_empleado'
      }
    },
    Id_ejecutivo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'EJECUTIVO',
        key: 'Id_ejecutivo'
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'USER_PROFILE',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_user_profile" },
        ]
      },
      {
        name: "fk_User_profile_EMPLEADO_ASESOR1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_empleado" },
        ]
      },
      {
        name: "fk_User_profile_EJECUTIVO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_ejecutivo" },
        ]
      },
      {
        name: "fk_User_profile_CLIENTE1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_cliente" },
        ]
      },
      {
        name: "fk_User_profile_ROL1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_rol" },
        ]
      },
      {
        name: "fk_USER_PROFILE_User1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_user" },
        ]
      },
    ]
  });
};
