const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('EJECUTIVO', {
    Id_ejecutivo: {
      autoIncrement: true,
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
    },
    Id_plan_financiero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PLAN_FINANCIERO_PROY',
        key: 'Id_plan_financiero'
      }
    },
    Id_puesto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PUESTO',
        key: 'Id_puesto'
      }
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
    tableName: 'EJECUTIVO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_ejecutivo" },
          { name: "Id_plan_financiero" },
          { name: "Id_puesto" },
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
      {
        name: "fk_EJECUTIVO_PLAN_FINANCIERO_PROY1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_plan_financiero" },
        ]
      },
      {
        name: "fk_EJECUTIVO_PUESTO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_puesto" },
        ]
      },
    ]
  });
};
