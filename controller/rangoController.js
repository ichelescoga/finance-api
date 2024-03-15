const RangoRepository = require("../repository/RangoRepository");
const security = require("../src/utils/security");
const createError = require("http-errors");

exports.getRangos = async(req, res, next)=>{
    try {
        let result = await RangoRepository.getRangos()

        res.json(result);
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

exports.getRangoById = async(req, res, next)=>{
    try {
        id= req.params.id
        let result = await RangoRepository.getRangoById(id)

        res.json(result);
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}


exports.addRango = async(req, res, next)=>{
    try {
        let params = {
            nombre: req.body.nombre,
            maximo: parseFloat(req.body.maximo),
            tiempo_maximo: req.body.tiempo_maximo,
            tiempo_minimo: req.body.tiempo_minimo,
            empleado: req.body.empleado,
            tasa_comision: parseFloat(req.body.tasa_comision),
            id_entidad: req.body.id_entidad,
            createdby: req.body.createdby
        }
        let result = await RangoRepository.addRango(params)
        if(result){
            res.json({
                succes: true,
                message: "Rango Creado con Exito",
              });
        }else{
            res.json({
                succes: true,
                message: "Rango No ha sido creado",
              });
        }
        
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}



exports.getRangoByCliente =async(req, res, next)=>{
    try {
        id= req.params.id
        let result = await RangoRepository.getRangoByCliente(id)

        res.json(result);
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

