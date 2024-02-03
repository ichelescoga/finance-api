const ProyectRepository = require("../repository/ProyectRepository");
const proyectoService = require("../services/proyectoService");
const { lowerKeysObject } = require("../src/utils/convertKeysInLowerCase");
const { convertArrayInObject } = require("../src/utils/convertStringInObject");
const security = require("../src/utils/security");
const createError = require("http-errors");
const companyRepository = require("../repository/CompanyRepository")



exports.getProyectsByCompany = async (req, res, next) => {
    try {
        let params = {
            entity: req.params.id
        }
        let modificador = await ProyectRepository.getProyectModificador(params)
        if (!modificador) res.json([]);
        let grupomodificador = await ProyectRepository.getGroupModificador(modificador.dataValues.Id)
        if (!grupomodificador) res.json([]);
        let proyects = []
        for (let i = 0; i < grupomodificador.length; i++) {
            let entity = await ProyectRepository.getProyect(grupomodificador[i].dataValues.Id_entidad)
            let detailint = await ProyectRepository.getProyectDetailsINT(grupomodificador[i].dataValues.Id_entidad)
            let detailstring = await ProyectRepository.getProyectDetailsSTRING(grupomodificador[i].dataValues.Id_entidad)            
            let detail = detailint.concat(detailstring)
            const project = convertArrayInObject(detail, "Caracteristica", "Valor");
            const projectValues = lowerKeysObject(grupomodificador[i]["dataValues"])
            const entityLowerCase = lowerKeysObject(entity["dataValues"]);
            projectValues.id = projectValues.id_entidad;
            delete(projectValues.id_entidad)

            let proyect = {
                ...project,
                ...entityLowerCase,
                ...projectValues
            }

            proyects.push(proyect)
        }
        res.json(proyects)
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.getProjectById = async (req, res, next) => {
    try {
        let params = {
            id: req.params.id,
        }
        let grupomodificador = await ProyectRepository.getGroupModificadorById(params)
        if (!grupomodificador) res.json({});

        let entity = await ProyectRepository.getRawProject(grupomodificador.dataValues.Id_entidad)
        let detailint = await ProyectRepository.getProyectDetailsINT(grupomodificador.dataValues.Id_entidad)
        let detailstring = await ProyectRepository.getProyectDetailsSTRING(grupomodificador.dataValues.Id_entidad)
        let companyDetail = await companyRepository.getCompanyById(params.id);
        // console.log("🤖🤖🤖🤖 COMPANY ", companyDetail, params.id);

        let detail = detailint.concat(detailstring)
        const project = convertArrayInObject(detail, "Caracteristica", "Valor");
        const projectValues = lowerKeysObject(grupomodificador["dataValues"])
        const entityLowerCase = lowerKeysObject(entity["dataValues"]);
        projectValues.id = projectValues.id_entidad;
        delete(projectValues.id_entidad)
        console.log("🤖🤖🤖", entity)


        res.json({
            ...entityLowerCase,
            ...project,
            ...projectValues
        })

    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.addProyectsByCompany = async (req, res, next) => {
    try {
        let params = {
            entity: req.body.id_empresa
        }
        let modificador = await ProyectRepository.getProyectModificadorbyCompany(params)
        if (modificador) {//la empresa ya tiene asociacion con el modificador procyecto
            //NO SE CREA LA ASOCIACION CON EL MODIFICADOR PROYECTO
        }
        else {//la empresa no tiene asociacion con el modificador proyecto
            //crear asociacion con el modificador proyecto
            modificador = await ProyectRepository.addModif_Entidad(params)
        }
        //crear entidad proyecto 
        let params1 = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            createdby: req.body.createdby,
            tipo: req.body.tipo
        }
        let proyect = await ProyectRepository.addProyectEntity(params1)
        if (proyect) {
            // ya se creo la entidad proyecto
            let params2 = {
                entity: proyect.dataValues.Id,
                createdby: req.body.createdby,
                departamento: req.body.departamento,
                municipio: req.body.municipio,
                direccion: req.body.direccion,
                unidades: req.body.unidades,
                logo: req.body.logo
            }
            details = await ProyectRepository.addProyectDetails(params2)
            let params3 = {
                mod_entity: modificador.dataValues.Id,
                entity: proyect.dataValues.Id,
                createdby: req.body.createdby
            }
            //crear grupo modificador entidad
            let grupomodificador = await ProyectRepository.addGroupModif_Entidad(params3)
            if (grupomodificador) {
                res.json({
                    response: true
                })
            } else {
                res.json({
                    response: false
                })
            }
        } else {
            res.json({
                response: false
            })
        }


    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.editProyect = async (req, res, next) => {
    try {
        let params = {
            entity: req.body.id,
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            updatedby: req.body.updatedby,
            departamento: req.body.departamento,
            municipio: req.body.municipio,
            direccion: req.body.direccion,
            unidades: req.body.unidades,
            tipo: req.body.tipo,
            logo: req.body.logo
        }

        await ProyectRepository.editProyectEntity(params)
        await ProyectRepository.editCompanyDetails(params)

        res.json({
            response: true
        })
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.deleteProyect = async (req, res, next) => {
    try {
        let params = {
            entity: req.body.id,
            updatedby: req.body.updatedby
        }
        await ProyectRepository.deleteProyectEntity(params)
        await ProyectRepository.deleteProyectDetails(params)
        await ProyectRepository.deleteGroupMod_entity(params)
        res.json({
            response: true
        })
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}
exports.editCompanyinProyect = async (req, res, next) => {
    try {
        let params = {
            entity: req.body.id,
            updatedby: req.body.updatedby
        }
        await ProyectRepository.deleteGroupMod_entity(params)
        params = {
            entity: req.body.empresa,
            proyect: req.body.id,
            updatedby: req.body.updatedby
        }
        let modificador = await ProyectRepository.getProyectModificadorbyCompany(params)
        if (modificador) {

        } else { //empresa aun no tiene modificador
            //creamos el modificador
            modificador = await ProyectRepository.addModif_Entidad(params)
        }
        params = {
            mod_entity: modificador.dataValues.Id,
            entity: req.body.id,
            createdby: req.body.updatedby
        }
        //crear grupo modificador entidad
        let grupomodificador = await ProyectRepository.addGroupModif_Entidad(params)
        if (grupomodificador) {
            res.json({
                response: true
            })
        } else {
            res.json({
                response: false
            })
        }

    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.addType = async(req, res, next)=>{
    try {
        let params = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            createdby: req.body.createdby
        }
        let type = await ProyectRepository.addType(params)
        if(type){
            res.json({
                response: true
            }) 
        }else{
            res.json({
                response: false
            }) 
        }

    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.getTypes = async(req, res, next)=>{
    try {
        let types = await ProyectRepository.getTypes()
        if(types){
            const result = [];
            types.forEach(element => {
                const lowerCase = lowerKeysObject(element["dataValues"]);
                result.push(lowerCase)
            });
            res.json(result);
        }else{
            res.json({
                response: false
            }) 
        }
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.getTypesbyEntity = async(req, res, next)=>{
    try {
        let params = {
            entity: req.params.id_empresa
        }
        let modificador = await ProyectRepository.getProyectModificadorbyCompany(params)
        if(!modificador) return res.json({response: false})
        let types = await ProyectRepository.getTypesByEntity(modificador)
        if(types){
            res.json(types)
        }else{
            res.json({
                response: false
            }) 
        }
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

