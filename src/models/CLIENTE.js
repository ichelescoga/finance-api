const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CLIENTE', {
    Id_cliente: {
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
    Estado_civil: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Id_genero: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'GENERO',
        key: 'Id_genero'
      }
    },
    Fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Oficio: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    Nivel_estudios: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Direccion_residencia: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    Telefono_residencia: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Lugar_de_trabajo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Direccion_trabajo: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    Telefono_trabajo: {
      type: DataTypes.STRING(20),
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
    Id_nacionalidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'PAIS',
        key: 'Id_pais'
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
    tableName: 'CLIENTE',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_cliente" },
        ]
      },
      {
        name: "Id_cliente_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Id_cliente" },
        ]
      },
      {
        name: "Genero_idx",
        using: "BTREE",
        fields: [
          { name: "Id_genero" },
        ]
      },
      {
        name: "Nacionalidad_idx",
        using: "BTREE",
        fields: [
          { name: "Id_nacionalidad" },
        ]
      },
    ]
  });
};
