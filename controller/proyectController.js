const ProyectRepository = require("../repository/ProyectRepository")
const security = require("../src/utils/security");
const createError = require("http-errors");


exports.getProyectsByCompany = async(req, res, next)=>{
    try {
        let params = {
            entity: req.body.id
        }
        let modificador = await ProyectRepository.getProyectModificadorbyCompany(params)
        let grupomodificador = await ProyectRepository.getGroupModificador(modificador.dataValues.Id)
        for(let i =0; i < grupomodificador.length; i++){
            
        }
        res.json(companies_)
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.addProyectsByCompany = async(req, res, next)=>{
    try {
        let params = {
            entity: req.body.id
        }
        let modificador = await ProyectRepository.getProyectModificadorbyCompany(params)
        if(modificador){//la empresa ya tiene asociacion con el modificador procyecto
            
            let grupomodificador = await ProyectRepository.getGroupModificador(modificador.dataValues.Id)
            for(let i =0; i < grupomodificador.length; i++){
                
            }
        } else {//la empresa no tiene asociacion con el modificador proyecto
            //crear asociacion con el modificador proyecto
            modificador = await ProyectRepository.addModif_Entidad(params)
            //crear grupo modificador entidad
            
        }
        
        res.json(companies_)
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}
