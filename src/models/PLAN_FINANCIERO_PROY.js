const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PLAN_FINANCIERO_PROY', {
    Id_plan_financiero: {
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
    Id_tipo_credito: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TIPO_CREDITO',
        key: 'Id_tipo_credito'
      }
    },
    Tasa_interes: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
    },
    Meses_maximo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Pagos_especiales: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Enganche_minimo: {
      type: DataTypes.DECIMAL(18,8),
      allowNull: true
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
    Id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'EMPRESA',
        key: 'Id_empresa'
      }
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
    tableName: 'PLAN_FINANCIERO_PROY',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_plan_financiero" },
          { name: "Id_proyecto" },
          { name: "Id_empresa" },
        ]
      },
      {
        name: "Id_plan_financiero_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_plan_financiero" },
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
        name: "TipoCredito_idx",
        using: "BTREE",
        fields: [
          { name: "Id_tipo_credito" },
        ]
      },
      {
        name: "fk_PLAN_FINANCIERO_PROY_PROYECTO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
        ]
      },
      {
        name: "fk_PLAN_FINANCIERO_PROY_EMPRESA1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_empresa" },
        ]
      },
    ]
  });
};
