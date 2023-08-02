const bcrypt = require("bcryptjs");
const db = require("../src/models");

let userRepository = function () {
  let listlogin = async (useCredential) => {

    
    const usuario = await db.models.User.findOne({
      where: {
        Correo: useCredential.email,
      },
    });


    if (!usuario || usuario === null) {
      return undefined;
    } else {
      const compare = await bcrypt.compare(
        useCredential.password,
        usuario.Contrasenia
      );
        console.log(compare);
      if (!compare) {
        return null;
      } else {
        return usuario;
      }
    }
  };



  let create = async (params) => {
    const encript = await bcrypt.hash(params.password, 10);
    const newUser = await db.models.User.create({
      Correo: params.email,
      Contrasenia: encript,
    });
    return newUser;
  };


    let getUserByEmail = async (params) => {
      return await  db.models.User.findAll({
          where: {
              Correo: params.username
          },
      });
  }

  return {
    listlogin,
    create,
    getUserByEmail
  };
};

module.exports = userRepository();
