const ListsRepository = require("../repository/ListsRepository");
const security = require("../src/utils/security");
const createError = require("http-errors");

exports.getClasificacionClientes = async(req, res, next)=>{
    try {
        let result = await ListsRepository.getClasificacionClientes()

        res.json(result);
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}