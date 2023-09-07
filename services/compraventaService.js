const db = require("../src/models");

  
  let userRepository = function () {


    let createFormularioCompraVenta = async (params) => {
      const newCotizacionUnidad = await db.models.COMPRA_VENTA.create({
        Id_cotizacion: params.idCotizacion,
        Nombre_completo_cmprd: params.nombreCompletoCmprd,
        Fecha_nacimiento_cmprd: params.fechaNacimientoCmprd,
        Estado_civil_cmprd: params.estadoCivilCmprd,
        Nacionalidad_cmprd: params.nacionalidadCmprd,
        Profesion_cmprd: params.profesionCmprd,
        Residencia_cmprd: params.residenciaCmprd,
        Telefono_cmprd: params.telefonoCmprd,
        Direccion_trabajo_cmprd: params.direccionTrabajoCmprd,
        Telefono_trabajo__cmprd: params.telefonoTrabajoCmprd,
        Ingreso_mensualLetras_cmprd: params.ingresoMensualTextoCmprd,
        Ingreso_mensualNo_cmprd: params.ingresoMensualNumCmprd,
        Correo_electronico_cmprd: params.correoElectronicoCmprd,
        Documento_identificacion_cmprd: params.docIdentificaionCmprd,
        Pasaporte_cmprd: params.pasaporteCmprd,
        Dpi_cmprd: params.dpiCmprd,
        Extendido_cmprd: params.extendido,
        Razon_social: params.razonSocial,
        Url_fotocopia_representacion: params.urlFotocopiaRepresentacion,
        Valor_total_lote: params.valorTotalLote,
        Valor_mejoras: params.valorMejoras,
        Contado: params.contado,
        Reserva: params.reserva,
        Fecha_limeteCancSaldo: params.fechaLimiteCancelSaldo,
        Enganche: params.enganche,
        saldo: params.saldo,
        Numero_cuotas: params.numeroCuotas,
        Valor_cuotas: params.valorCuota,
        Ciudad: params.ciudad,
        FechaCreacion: params.fechaCreacion,
      });
      return newCotizacionUnidad;
    };


    let createReferencia = async (params) => {
      const newReferencia = await db.models.REFERENCIA.create({
        Id_compraventa: params.idCompraventa,
        Nombre_completo: params.nombreCompleto,
        Residencia: params.residencia,
        Telefono: params.telefono
      });
      return newReferencia;
    };
 
    return {
        createFormularioCompraVenta,
        createReferencia
    };
  };
  
  module.exports = userRepository();
  