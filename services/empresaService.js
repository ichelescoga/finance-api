const db = require("../src/models");
  
  let userRepository = function () {

    let findEmpresas = async () => {
      const empresas = await db.models.EMPRESA.findAll({
      });
      return empresas;
    };
    
    let createEmpresa = async (params) => {
      const newEmpresa = await db.models.EMPRESA.create({
        Id_empresa: params.idEmpresa,
        Razon_social: params.razonSocial,
        Nombre_comercial: params.nombreComercial,
        Representante_legal: params.representanteLegal,
        NIT: params.nit,
        DPI: params.dpi,
        Direccion: params.direccion,
        Codigo_postal: params.codigoPostal,
        Telefono: params.telefono,
        Nombre_contacto: params.nombreContacto,
        Telefono_contacto: params.telefonoContacto,
        Gerente_ventas: params.gerenteVentas,
        Telefono_gerente:params.telefonoGerente,
        Id_pais: params.idPais,
        Id_departamento: params.idDepartamento,
        Id_municipio: params.idMunicipio,
      });
      return newEmpresa;
    };
  
    return {
        createEmpresa,
        findEmpresas
    };
  };
  
  module.exports = userRepository();
  