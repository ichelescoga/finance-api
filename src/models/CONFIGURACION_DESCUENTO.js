const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CONFIGURACION_DESCUENTO', {
    Id_configuracion_descuento: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Id_temporada_descuento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'TEMPORADA_DESCUENTO',
        key: 'Id_temporada_descuento'
      }
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
    Meses: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Porcentaje: {
      type: DataTypes.STRING(45),
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
    tableName: 'CONFIGURACION_DESCUENTO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_configuracion_descuento" },
          { name: "Id_proyecto" },
        ]
      },
      {
        name: "Id_proyecto",
        using: "BTREE",
        fields: [
          { name: "Id_proyecto" },
        ]
      },
      {
        name: "Id_temporada_descuento",
        using: "BTREE",
        fields: [
          { name: "Id_temporada_descuento" },
        ]
      },
    ]
  });
};
