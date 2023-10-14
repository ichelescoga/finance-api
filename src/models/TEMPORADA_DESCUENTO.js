const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TEMPORADA_DESCUENTO', {
    Id_temporada_descuento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Temporada: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Fecha_incial: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Fecha_final: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Status: {
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
    tableName: 'TEMPORADA_DESCUENTO',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_temporada_descuento" },
        ]
      },
    ]
  });
};
