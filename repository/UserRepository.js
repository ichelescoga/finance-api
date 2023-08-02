const db = require("../src/models");
let UserRepository = function () {


    let getUserByEmail = async (params) => {
        return await  db.models.User.findAll({
            where: {
                Correo: params.username
            },
        });
    }

    return {
        getUserByEmail,
    }

}

module.exports = UserRepository();