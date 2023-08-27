const db = require("../src/models");
  
  let userRepository = function () {

    let listClientes = async () => {
      const clientes = await db.models.CLIENTE.findAll({
      });
      return clientes;
    };
    
    let createCliente = async (params) => {
      const creatCliente = await db.models.CLIENTE.create({
        Primer_nombre: params.primerNombre,
        Segundo_nombre: params.segundoNombre,
        Otros_nombres: params.otrosNombres,
        Primer_apellido: params.primerApellido,
        Segundo_apellido: params.segundoApellido,
        Apellido_casada: params.apellidoCasada,
        Estado_civil: params.estadoCivil,
        Id_genero: params.idGenero,
        Fecha_nacimiento: params.fechaNacimiento,
        Oficio: params.oficio,
        Nivel_estudios: params.nivelEstudio,
        Direccion_residencia: params.direccionResidencia,
        Telefono_residencia: params.telefonoResidencia,
        Lugar_de_trabajo: params.lugarTrabajo,
        Direccion_trabajo: params.direccionTrabajo,
        Telefono_trabajo: params.telefonoTrabajo,
        DPI: params.dpi,
        NIT: params.nit,
        Telefono: params.telefono,
        Correo: params.correo,
        Id_nacionalidad: params.idNacionalidad,
      });
      return creatCliente;

    };


    let updateCliente = async (params) => {
      const clienteUpdate = await db.models.CLIENTE.findOne({ where: { Id_cliente: params.id } });

      if(!clienteUpdate) {
         return
      } else {
          await db.models.CLIENTE.update({
            Fecha_nacimiento: params.fechaNacimiento,
            Puesto: params.puesto,
            Foto_DPI_enfrente: params.fotoDpiEnfrente,
            Foto_DPI_reverso: params.fotoDpiReverso
        },{
          where:{
            Id_cliente: params.id
          }
      });
      }
      const clienteActualizado = await db.models.CLIENTE.findOne({ where: { Id_cliente: params.id } });
      return clienteActualizado
    };

    let updateClienteFotoDpi = async (params) => {
      const clienteUpdate = await db.models.CLIENTE.findOne({ where: { Id_cliente: params.id } });

      if(!clienteUpdate) {
         return
      } else {
          await db.models.CLIENTE.update({
            Fecha_nacimiento: params.fechaNacimiento,
            Puesto: params.puesto,
            Foto_DPI_enfrente: params.fotoDpiEnfrente,
            Foto_DPI_reverso: params.fotoDpiReverso
        },{
          where:{
            Id_cliente: params.id
          }
      });
      }
      const clienteActualizado = await db.models.CLIENTE.findOne({ where: { Id_cliente: params.id } });
      return clienteActualizado
    };
  
    return {
      updateClienteFotoDpi,
        updateCliente,
        listClientes,
        createCliente
    };
  };
  
  module.exports = userRepository();
  