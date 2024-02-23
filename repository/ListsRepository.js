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
    let getBancos = async (entity) => {
        return await  db.models.BANCO.findAll({
            where: {
                Estado: 1
            },
        });
    }
    let getTipoCuentasBanco = async (entity) => {
        return await  db.models.TIPO_CUENTA_BANCO.findAll({
            where: {
                Estado: 1
            },
        });
    }
return {
    getClasificacionClientes,
    getBancos,
    getTipoCuentasBanco
}
}
module.exports = ListsRepository();