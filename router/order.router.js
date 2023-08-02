const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller')
const userController = require('../controller/usersController')
const empresasController = require('../controller/empresaController')
const municipioController = require('../controller/municipioController')
const departamentoController = require('../controller/departamentoController')
const tipoProyectoController = require('../controller/tipoProyectoController')
const proyectoController = require('../controller/proyectoController')
const subProyectoController = require('../controller/subProyectoController')
const asesoresController = require('../controller/asesoresController')
const puestoController = require('../controller/puestoController')
const tipoCreditoController = require('../controller/tipoCreditoController')
const entidadesFinancController = require('../controller/entidadesFinancieras')
const auth = require("./../services/auth-middleware")


router.get('/healthcheck', (req, res) => {
    res.json({succeded: true, payload: 'HealthCheck ok'})
    console.log('HealthCheck ok')
})

router.post('/signin', authController.signIn)
// router.post('/fakeToken',authController.fakeToken)
router.post("/register",  auth.verifyToken, userController.createUser)

//Empresa
router.get("/empresas", auth.verifyToken, empresasController.listEmpresas)
router.post("/crearEmpresa",  auth.verifyToken, empresasController.createEmpresa)



//Municipio
router.get("/municipios", auth.verifyToken, municipioController.listMunicipios)



//Departamento
router.get("/departamentos", auth.verifyToken, departamentoController.listDepartamentos)



//Tipo Proyecto
router.get("/tiposProyectos", auth.verifyToken, tipoProyectoController.listTiposProyecto)




//Proyecto 
router.post("/nuevoProyecto",  auth.verifyToken, proyectoController.createProyecto)




//SubProyecto 
router.post("/subProyecto",  auth.verifyToken, subProyectoController.createSubProyecto)




//Asesores
router.get("/asesores", auth.verifyToken, asesoresController.listAsesores)
router.post("/createAsesor",  auth.verifyToken, asesoresController.createAsesor)




//Puesto
router.get("/roles", auth.verifyToken, puestoController.listPuestos)




//Tipos credito
router.get("/tiposCreditos", auth.verifyToken, tipoCreditoController.listaTiposCredito)





//Entidades Financieras
router.get("/entidadesFinanciera", auth.verifyToken, entidadesFinancController.listEntidadesFinancieras)
module.exports = router