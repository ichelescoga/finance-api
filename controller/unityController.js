const UnidadRepository = require("../repository/UnidadRepository");
const ProyectRepository = require("../repository/UnidadRepository");
const proyectoService = require("../services/proyectoService");
const security = require("../src/utils/security");
const createError = require("http-errors");

exports.addUnityByCompany = async(req, res, next)=>{
    try {
        let params = {
            entity: req.body.id_proyecto
        }
        let modificador = await ProyectRepository.getProyectModificadorbyCompany(params)
        if(modificador){//la empresa ya tiene asociacion con el modificador procyecto
            //NO SE CREA LA ASOCIACION CON EL MODIFICADOR PROYECTO
        } 
        else {//la empresa no tiene asociacion con el modificador proyecto
            //crear asociacion con el modificador proyecto
            modificador = await ProyectRepository.addModif_Entidad(params,2)
        }
        //crear entidad unidad 
        let params1 = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            createdby: req.body.createdby,
            tipo: req.body.tipo
        }
        let proyect = await ProyectRepository.addUnityEntity(params1)
        if(proyect){
            // ya se creo la entidad proyecto
            if(req.body.habitaciones) habs = req.body.habitaciones
            let params2 = {
                entity: proyect.dataValues.Id,
                createdby: req.body.createdby,
                metrost: req.body.metrost,
                metrosc: req.body.metrosc,
                direccion: req.body.direccion,
                habitaciones: habs
            }
            details = await ProyectRepository.addUnityDetails(params2)
            let params3 = {
                mod_entity: modificador.dataValues.Id,
                entity: proyect.dataValues.Id,
                createdby: req.body.createdby
            }
            //crear grupo modificador entidad
            let grupomodificador = await ProyectRepository.addGroupModif_Entidad(params3)
            if(grupomodificador){
                res.json({
                    response: true
                })  
            }else {
                res.json({
                    response: false
                })  
            }
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


exports.getUnitsByCompany = async(req, res, next)=>{
    try {
        let params = {
            entity: req.params.id
        }
        let modificador = await ProyectRepository.getProyectModificadorbyCompany(params,2)
        let grupomodificador = await ProyectRepository.getGroupModificador(modificador.dataValues.Id)
        let units = []
        for(let i =0; i < grupomodificador.length; i++){
            let entity = await ProyectRepository.getUnity(grupomodificador[i].dataValues.Id_entidad)
            let detailint= await ProyectRepository.getUnityDetailsINT(grupomodificador[i].dataValues.Id_entidad)
            let detailstring = await ProyectRepository.getUnityDetailsSTRING(grupomodificador[i].dataValues.Id_entidad)
            let detail  = detailint.concat(detailstring)
            let unity = {
                unity : entity,
                details: detail
            }
            units.push(unity)
        }
        res.json(units)
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}
