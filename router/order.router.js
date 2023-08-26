const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller')
const userController = require('../controller/usersController')
const empresasController = require('../controller/empresaController')
const municipioController = require('../controller/municipioController')
const departamentoController = require('../controller/departamentoController')
const tipoProyectoController = require('../controller/tipoProyectoController')
const proyectoController = require('../controller/proyectoController')
const unidadController = require('../controller/unidadController')
const asesoresController = require('../controller/asesoresController')
const puestoController = require('../controller/puestoController')
const tipoCreditoController = require('../controller/tipoCreditoController')
const entidadesFinancController = require('../controller/entidadesFinancieras')
const planFinancieroController = require('../controller/planFinancieroController')
const ejecutivoController = require('../controller/ejecutivoController')
const cotizacionesController = require('../controller/cotizacionesController')
const clientesCortroller = require('../controller/clientesController')
const aplicarCreditoCortroller = require('../controller/creditoController')
const auth = require("./../services/auth-middleware")


router.get('/healthcheck', (req, res) => {
    res.json({succeded: true, payload: 'HealthCheck ok'})
    console.log('HealthCheck ok')
})

router.post('/signin', authController.signIn)
// router.post('/fakeToken',authController.fakeToken)
router.post("/register",   userController.createUser)
router.get("/user", auth.verifyToken, userController.UserToken)

//Empresa
router.get("/empresas", auth.verifyToken, empresasController.listEmpresas)
router.post("/crearEmpresa",  auth.verifyToken, empresasController.createEmpresa)


//Company
router.post("/company",  auth.verifyToken, empresasController.createEmpresa)


//Municipio
router.get("/municipios", auth.verifyToken, municipioController.listMunicipios)



//Departamento
router.get("/departamentos", auth.verifyToken, departamentoController.listDepartamentos)



//Tipo Proyecto
router.get("/tiposProyectos", auth.verifyToken, tipoProyectoController.listTiposProyecto)




//Proyecto 
router.post("/nuevoProyecto",  auth.verifyToken, proyectoController.createProyecto)




//Unidad 
router.get("/UnidadesProyecto/:id", auth.verifyToken, unidadController.listUnidadProyecto)
router.get("/unidad/:id", auth.verifyToken, unidadController.findOneUnidad)
router.post("/createUnidad",  auth.verifyToken, unidadController.createUnidad)




//Asesores
router.get("/asesores", auth.verifyToken, asesoresController.listAsesores)
router.post("/createAsesor",  auth.verifyToken, asesoresController.createAsesor)




//Puesto
router.get("/roles", auth.verifyToken, puestoController.listPuestos)




//Tipos credito
router.get("/tiposCreditos", auth.verifyToken, tipoCreditoController.listaTiposCredito)





//Entidades Financieras
router.get("/entidadesFinanciera", auth.verifyToken, entidadesFinancController.listEntidadesFinancieras)



//Plan Financiero Proyecto
router.post("/planFinacieroProyect",  auth.verifyToken, planFinancieroController.createPlanFinancieroProyecto)



//Ejecutivo
router.post("/ejecutivo",  auth.verifyToken, ejecutivoController.createEjecutivo)
router.get("/listEjecutivos", auth.verifyToken, ejecutivoController.listEjecutivos)



//Cotizaciones
router.get("/listCotizaciones", auth.verifyToken, cotizacionesController.listCotizaciones)
router.get("/cotizacionsUnidad/:id", auth.verifyToken, cotizacionesController.listCotizacionUnidad)
router.post("/createCotizacion", auth.verifyToken, cotizacionesController.creatCotizacion)
router.get("/cotizacionId/:id", auth.verifyToken, cotizacionesController.findOneCotizacion)
router.put("/actualizarCotizacion/:id", auth.verifyToken, cotizacionesController.updateCotizacion)



router.get("/cotizacionesAnalista", auth.verifyToken, cotizacionesController.listaCotizacionesCotizaRechazada)
router.get("/cotizacionEjeAprovReser", auth.verifyToken, cotizacionesController.listCotizEjecAprovadoReservado)
router.put("/cotizacionVendida/:id", auth.verifyToken, cotizacionesController.updateCotizacionEstado)
router.put("/cotizacionUpdEstado/:id", auth.verifyToken, cotizacionesController.updateCotizEstadoParams)

//Cliente
router.get("/listClientes", auth.verifyToken, clientesCortroller.listClientes)



//Aplicar al credito
router.post("/crearCredito", auth.verifyToken, aplicarCreditoCortroller.createAplicacionCredito)
router.get("/credito/:id", auth.verifyToken, aplicarCreditoCortroller.findOneAplicacionCredito)
router.put("/actualizarCredito/:id", auth.verifyToken, aplicarCreditoCortroller.updateApliCredito)

module.exports = router