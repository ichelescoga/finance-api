const db = require("../src/models");
const { Op } = require("sequelize");

let userRepository = function () {

  let listClientes = async () => {
    const clientes = await db.models.CLIENTE.findAll({
    });
    return clientes;
  };

  let getClientById = async (id) => {
    const client = await db.models.CLIENTE.findOne({
      where: { Id_cliente: id }
    })
    return client;
  }

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

    if (!clienteUpdate) {
      return
    } else {
      await db.models.CLIENTE.update({
        Fecha_nacimiento: params.fechaNacimiento,
        Puesto: params.puesto,
        Foto_DPI_enfrente: params.fotoDpiEnfrente,
        Foto_DPI_reverso: params.fotoDpiReverso
      }, {
        where: {
          Id_cliente: params.id
        }
      });
    }
    const clienteActualizado = await db.models.CLIENTE.findOne({ where: { Id_cliente: params.id } });
    return clienteActualizado
  };


  let updateClientUserProfile = async (idClient, idUserProfile) => {
    const client = await db.models.CLIENT.update({
      Id_userProfile: idUserProfile
    },
    {
      where: {
        Id_cliente: idClient
      }
    }
    )
    return client;
  }

  let updateClienteFotoDpi = async (params) => {
    const clienteUpdate = await db.models.CLIENTE.findOne({ where: { Id_cliente: params.id } });

    if (!clienteUpdate) {
      return
    } else {
      await db.models.CLIENTE.update({
        Fecha_nacimiento: params.fechaNacimiento,
        Puesto: params.puesto,
        Foto_DPI_enfrente: params.fotoDpiEnfrente,
        Foto_DPI_reverso: params.fotoDpiReverso
      }, {
        where: {
          Id_cliente: params.id
        }
      });
    }
    const clienteActualizado = await db.models.CLIENTE.findOne({ where: { Id_cliente: params.id } });
    return clienteActualizado
  };


  let usuariosCuentaCorriente = async () => {
    const clientes = await db.models.CLIENTE.findAll({
      include: [
        {
          model: db.models.USER_PROFILE,
          as: "Id_user_profile_USER_PROFILE",
          required: true,
        }, {
          model: db.models.COTIZACION,
          as: "COTIZACIONs",
          required: true,
          include: [
            {
              model: db.models.CUENTA_CORRIENTE,
              as: "CUENTA_CORRIENTEs",
              required: true,
            }, {
              model: db.models.UNIDAD_COTIZACION,
              as: "UNIDAD_COTIZACIONs",
              include: [
                {
                  model: db.models.UNIDAD,
                  as: "Id_unidad_UNIDAD",
                }
              ],
            }
          ],
        },
      ],
    });
    return clientes;
  };

  let tiposCuotas = async (params) => {
    const clientes = await db.models.CLIENTE.findOne({
      where: { Id_user_profile: params },
      include: [
        {
          model: db.models.USER_PROFILE,
          as: "Id_user_profile_USER_PROFILE",
        },
        {
          model: db.models.COTIZACION,
          as: "COTIZACIONs",
          required: true,
          include: [
            {
              model: db.models.CUENTA_CORRIENTE,
              as: "CUENTA_CORRIENTEs",
              required: true,
              // include: [
              //   {
              //     model: db.models.PAGO,
              //     as: "PAGOs",
              //     where: {
              //       [Op.and]: [
              //         { Id_tipo_pago: params.idTipoPago },
              //         { Id_status_transaccion: 1 },
              //       ]
              //     },
              //   }
              // ],
            }, {
              model: db.models.UNIDAD_COTIZACION,
              as: "UNIDAD_COTIZACIONs",
              // required: true,
              include: [
                {
                  model: db.models.UNIDAD,
                  as: "Id_unidad_UNIDAD",
                  required: true,
                  where: {
                    [Op.and]: [
                      { Id_estado: { [Op.in]: [5, 9] } },
                    ]
                  }
                }
              ],
            }
          ],
        },
      ],
    });
    return clientes;
  };


  let tiposCuotasCuentaCorriente = async (params) => {
    const cuotas = await db.models.PAGO.findAll({
      where: {
        [Op.and]: [
          { Id_cuenta_corriente: params.idCuentaCorriente },
          { Id_tipo_pago: params.idTipoCuota },
          { Id_status_transaccion: 1 },
          { Categoria: "Principal"},
        ]
      }
    });
    return cuotas;
  };

  let pagosReferencia = async (params) => {
    const cuotas = await db.models.PAGO.findAll({
      where: {
        [Op.and]: [
          { Referencia: params },
          { Categoria: "Secundaria"},
        ]
      }
    });
    return cuotas;
  };

  return {
    updateClienteFotoDpi,
    updateCliente,
    listClientes,
    createCliente,
    usuariosCuentaCorriente,
    tiposCuotas,
    tiposCuotasCuentaCorriente,
    getClientById,
    pagosReferencia,
    updateClientUserProfile
  };
};

module.exports = userRepository();
