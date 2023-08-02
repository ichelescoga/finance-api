const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EJECUTIVO', {
    Id_ejecutivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_ent_financiera: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ENTIDAD_FINANCIERA',
        key: 'Id_ent_financiera'
      }
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
    }
  }, {
    sequelize,
    tableName: 'EJECUTIVO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_ejecutivo" },
        ]
      },
      {
        name: "Id_ejecutivo_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_ejecutivo" },
        ]
      },
      {
        name: "EntidadFinanciera_idx",
        using: "BTREE",
        fields: [
          { name: "Id_ent_financiera" },
        ]
      },
    ]
  });
};
