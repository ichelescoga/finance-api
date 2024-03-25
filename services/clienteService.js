const { sequelize } = require("../components/conn_finance_mssql");
const db = require("../src/models");
const { Op } = require("sequelize");
const { bankById, paymentTypeByID } = require("./establecimientoService");

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
    const client = await db.models.CLIENTE.update({
      Id_user_profile: idUserProfile
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


  function formatPaymentFee(data) {
    const results = [];
    for (const item of data) {
      const data = {
        clientId: item.Id_cliente,
        fullName: item.Primer_nombre,
        phone: item.Telefono
      };

      if (item.COTIZACIONs && item.COTIZACIONs.length > 0) {
        const quote = item.COTIZACIONs[0]; //TODO: Suponiendo que solo hay una cotización por cliente

        // Agregar datos de la cotización
        data.quoteId = quote.Id_cotizacion;
        data.adviserId = quote.Id_detalle_asesor;
        data.quoteStateId = quote.Id_estado;
        data.sellPrice = quote.Venta_descuento;

        if (quote.CUENTA_CORRIENTEs && quote.CUENTA_CORRIENTEs.length > 0) {
          const cuentaCorriente = quote.CUENTA_CORRIENTEs[0]; // Suponiendo que solo hay una cuenta corriente por cotización

          data.currentAccountBalanceId = cuentaCorriente.Id_cuenta_corriente;
          if (cuentaCorriente.PAGOs && cuentaCorriente.PAGOs.length > 0) {
            const payment = cuentaCorriente.PAGOs[0]; //TODO: MAYBE NEED ADD FOR EACH TO BINDING MORE PAYMENTS

            data.paymentId = payment.Id_pago;
            data.amount = payment.Monto;
            data.reference = payment.Referencia;
            data.category = payment.Categoria;

            if (payment.Id_tipo_pago_TIPO_PAGO) {
              data.paymentTypeId = payment.Id_tipo_pago_TIPO_PAGO.dataValues.Id_tipo_pago;
              data.paymentType = payment.Id_tipo_pago_TIPO_PAGO.dataValues.Name_pago;
            }
            if (payment.Id_status_pago_STATUS_PAGO) {
              data.paymentStatusId = payment.Id_status_pago_STATUS_PAGO.dataValues.Id_status_pago;
              data.paymentStatus = payment.Id_status_pago_STATUS_PAGO.dataValues.Name_status;
            }
          }
        }
      }
      results.push(data);
    }
    return results;
  }



  let usuariosCuentaCorriente = async (paymentStatusId) => {
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
              include: [
                {
                  model: db.models.PAGO,
                  as: "PAGOs",
                  include: [
                    {
                      model: db.models.BOLETA_PAGO,
                      as: "Id_boleta_pago_BOLETA_PAGO"
                    },
                    {
                      model: db.models.TIPO_PAGO,
                      as: "Id_tipo_pago_TIPO_PAGO",
                    },
                    {
                      model: db.models.STATUS_PAGO,
                      as: "Id_status_pago_STATUS_PAGO",
                    },
                  ],
                  where: {
                    [Op.and]: [
                      { Id_tipo_pago: { [Op.in]: [1, 2, 3] } },
                      { Id_status_transaccion: 1 },
                      { Id_status_pago: paymentStatusId },
                    ]
                  },

                }
              ]
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

    const processData = formatPaymentFee(clientes)

    return processData;
  };

  let formatVoucherByPaymentId = async (data) =>  {

    const result = {
      paymentId : data["dataValues"]["Id_pago"],
      currentAccountBalanceId : data["dataValues"]["Id_cuenta_corriente"],
      voucherId : data["dataValues"]["Id_boleta_pago"],
      date : data["dataValues"]["Fecha"],
      amount : data["dataValues"]["Monto"],
      paymentCapital : data["dataValues"]["Pago_capital"],
      balance : data["dataValues"]["Saldo"],
      interest : data["dataValues"]["Interes"],
      paymentLimitDate : data["dataValues"]["Fecha_limite_pago"],
      payment : data["dataValues"]["Pago"],
      category : data["dataValues"]["Categoria"],
      arrears : data["dataValues"]["Mora"],
      paymentType: data["dataValues"]["Id_tipo_pago_TIPO_PAGO"]["dataValues"]["Name_pago"],
      statusPayment: data["dataValues"]["Id_status_pago_STATUS_PAGO"]["dataValues"]["Name_status"],
      reference : data["dataValues"]["Id_boleta_pago_BOLETA_PAGO"]["dataValues"]["Referencia"],
      voucherUrl : data["dataValues"]["Id_boleta_pago_BOLETA_PAGO"]["dataValues"]["Url"],
    }

    const paymentTypeId = data?.dataValues?.Id_boleta_pago_BOLETA_PAGO?.dataValues?.Id_forma_pago ?? null;
    const bankId = data?.dataValues?.Id_boleta_pago_BOLETA_PAGO?.dataValues?.Id_establecimiento ?? null;

    if(paymentTypeId == null|| bankId == null ){
      return {}
    }
    const bank = await bankById(bankId);
    const paymentType = await paymentTypeByID(paymentTypeId);
    result.paymentType = paymentType.Nombre;
    result.bank = bank.Nombre;

    return result;
  }

  let getVoucherByPaymentId = async (paymentId) => {
    try {
        const payment =await  db.models.PAGO.findOne({
          where: {Id_pago: paymentId},
          include: [
            {
              model: db.models.BOLETA_PAGO,
              as: "Id_boleta_pago_BOLETA_PAGO"
            },
            {
              model: db.models.TIPO_PAGO,
              as: "Id_tipo_pago_TIPO_PAGO",
            },
            {
              model: db.models.STATUS_PAGO,
              as: "Id_status_pago_STATUS_PAGO",
            },
          ]
        });

        return formatVoucherByPaymentId(payment);
    } catch (error) {
        next(error)
    }

}

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
              include: [
                {
                  model: db.models.PAGO,
                  as: "PAGOs",
                  include: [
                    {
                      model: db.models.TIPO_PAGO,
                      as: "Id_tipo_pago_TIPO_PAGO",
                    },
                    {
                      model: db.models.STATUS_PAGO,
                      as: "Id_status_pago_STATUS_PAGO",
                    },
                  ],
                  where: {
                    [Op.and]: [
                      { Id_tipo_pago: { [Op.in]: [1, 2, 3] } },
                      { Id_status_transaccion: 1 },
                    ]
                  },

                }
              ],
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
          { Categoria: "Principal" },
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
          { Categoria: "Secundaria" },
        ]
      }
    });
    return cuotas;
  };


  let findCtasCorrientesCotizacion = async (params) => {
    const cotizacion = await db.models.COTIZACION.findAll({
      where: { Id_cotizacion: params },
      include: [
        {
          model: db.models.CUENTA_CORRIENTE,
          as: "CUENTA_CORRIENTEs",
          required: true,
        },
      ],
    });
    return cotizacion;
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
    updateClientUserProfile,
    getVoucherByPaymentId,
    findCtasCorrientesCotizacion
  };
};

module.exports = userRepository();
