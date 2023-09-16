const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('RECURSO', {
    Id_recurso: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_albun: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ALBUN',
        key: 'Id_albun'
      }
    },
    Id_tipo_recurso: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'TIPO_RECURSO',
        key: 'Id_tipo_recurso'
      }
    },
    Url_recurso: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    Posicion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    State: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    Favorito: {
      type: DataTypes.TINYINT,
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
    tableName: 'RECURSO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_recurso" },
        ]
      },
      {
        name: "fk_Recurso_TIPO_RECURSO1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_tipo_recurso" },
        ]
      },
      {
        name: "fk_Recurso_ALBUN1_idx",
        using: "BTREE",
        fields: [
          { name: "Id_albun" },
        ]
      },
    ]
  });
};
