const db = require("../src/modelsF");
const sequelize = require('../components/conn_sqlz');
let EntityRepository = function () {
    let getComponentByEntity = async (entity) => {
        
        return await  db.models.COMPONENTE_ENTIDAD.findAll({
            where: {
                Id_tipo_entidad: entity,
                Estado: 1
            },
        });
    }

    let getComponent = async (componente) => {
        return await  db.models.COMPONENTE.findAll({
            attributes: [
                [sequelize.literal( "(SELECT Nombre FROM TIPO_COMPONENTE as t WHERE t.Id = COMPONENTE.Type )"), 'Type'],
                "label",
                "Place_holder",
                [sequelize.literal( "(SELECT Nombre FROM TIPO_CARACTERISTICA as t WHERE t.Id = COMPONENTE.InputType )"), 'InputType'],
                [sequelize.literal( "(SELECT Name FROM ICON as i WHERE i.Id = COMPONENTE.Id_icon )"), 'Icon'],
                "HintText",
                "ShowInList",
                [sequelize.literal( "(SELECT nombre FROM VALIDACION as v WHERE v.Id = COMPONENTE.Id_validacion )"), 'Validador'],
                "bodyKey",
                "columnNumber",
                "url",
                "listKeys",
                "show"
            ],
            where: {
                Id: componente,
                Estado: 1
            },
            order: [
                ['columnNumber', 'ASC']
            ]
        });
    }
return {
    getComponentByEntity,
    getComponent 
    }   

}
module.exports = EntityRepository();