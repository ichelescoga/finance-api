const db = require("../src/models");
const sequelize = require('../components/conn_sqlz');
let ComponentRepository = function () {
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
                "Place_holder",
                [sequelize.literal( "(SELECT Name FROM ICON as i WHERE i.Id = COMPONENTE.Id_icon )"), 'Icon'],
                "ShowInList"
            ],
            where: {
                Id: componente,
                Estado: 1
            },
        });
    }
    return {
        getComponentByEntity,
        getComponent 
    }

}

module.exports = ComponentRepository();