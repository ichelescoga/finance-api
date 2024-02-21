const db = require("../src/modelsF");
const sequelize = require('../components/conn_sqlz');
let ListsRepository = function () {
    let getClasificacionClientes = async (entity) => {
        return await  db.models.CLASIFICACION_CLIENTE.findAll({
            where: {
                Estado: 1
            },
        });
    }
return {
    getClasificacionClientes
}
}
module.exports = ListsRepository();