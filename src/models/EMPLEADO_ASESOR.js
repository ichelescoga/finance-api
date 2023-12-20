const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EMPLEADO_ASESOR', {
    Id_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Primer_nombre: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Segundo_nombre: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Otros_nombres: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Primer_apellido: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Segundo_apellido: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Apellido_casada: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    DPI: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    NIT: {
      type: DataTypes.STRING(13),
      allowNull: true
    },
    Telefono: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Correo: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Foto: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Id_puesto: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PUESTO',
        key: 'Id_puesto'
      }
    },
    Interno: {
      type: DataTypes.TINYINT,
      allowNull: true
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
    tableName: 'EMPLEADO_ASESOR',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_empleado" },
        ]
      },
      {
        name: "Id_empleado_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_empleado" },
        ]
      },
      {
        name: "Puesto_idx",
        using: "BTREE",
        fields: [
          { name: "Id_puesto" },
        ]
      },
    ]
  });
};
