const ComponentRepository = require("../repository/ComponentRepository");
const security = require("../src/utils/security");
const createError = require("http-errors");

exports.getComponentsByEntity = async(req, res, next)=>{
    try {
           let entity= req.body.id
    
        let component = await ComponentRepository.getComponentByEntity(entity)
        let componentes = []
        for(let i =0; i < component.length; i++){
            let componente = await ComponentRepository.getComponent(component[i].dataValues.Id_componente)
            let items = {
                items:null
            }
            componentes.push(componente)
        }
        res.json(componentes.sort((a,b) => a[0]["dataValues"]["columnNumber"]-b[0]["dataValues"]["columnNumber"]))
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}
