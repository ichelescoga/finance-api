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

