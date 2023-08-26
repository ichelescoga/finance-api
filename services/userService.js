const bcrypt = require("bcryptjs");
const db = require("../src/models");

let userRepository = function () {
  let listlogin = async (useCredential) => {

    
    const usuario = await db.models.User.findOne({
      where: {
        Correo: useCredential.email,
      },
      include: [
        {
          model: db.models.USER_PROFILE,
          as: "USER_PROFILEs",
          include: [
            {
              model: db.models.EJECUTIVO,
              as: "Id_ejecutivo_EJECUTIVO",
            },
            {
              model: db.models.CLIENTE,
              as: "Id_cliente_CLIENTE",
            },
            {
              model: db.models.EMPLEADO_ASESOR,
              as: "Id_empleado_EMPLEADO_ASESOR",
            },
            {
              model: db.models.ROL,
              as: "Id_rol_ROL"
            }
          ],
        },
      ],

    });


    if (!usuario || usuario === null) {
      return undefined;
    } else {
      const compare = await bcrypt.compare(
        useCredential.password,
        usuario.Contrasenia
      );
      if (!compare) {
        return null;
      } else {
        return usuario;
      }
    }
  };


  let listUser = async (useCredential) => {

    const usuario = await db.models.User.findOne({
      attributes: ["Id_user", "Correo", "Nombre"],
      where: {
        Correo: useCredential.email,
      },
      include: [
        {
          model: db.models.USER_PROFILE,
          as: "USER_PROFILEs",
          include: [
            {
              model: db.models.EJECUTIVO,
              as: "Id_ejecutivo_EJECUTIVO",
            },
            {
              model: db.models.CLIENTE,
              as: "Id_cliente_CLIENTE",
            },
            {
              model: db.models.EMPLEADO_ASESOR,
              as: "Id_empleado_EMPLEADO_ASESOR",
            },
            {
              model: db.models.ROL,
              as: "Id_rol_ROL"
            }
          ],
        },
      ],

    });

        return usuario;
  };


  let create = async (params) => {
    const encript = await bcrypt.hash(params.password, 10);
    const newUser = await db.models.User.create({
      Correo: params.email,
      Contrasenia: encript,
      Nombre: params.nombre
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
  let getUserByEmailSinPassword = async (params) => {
    return await  db.models.User.findAll({
    });
}

let getUserByEmailSinPasswordBackend = async (params) => {
  return await  db.models.User.findOne({
    attributes: ["Correo", "Nombre", "created_at", "updated_at"],
      where: {
          Correo: params
      },
      include: [
        {
          model: db.models.USER_PROFILE,
          as: "USER_PROFILEs",
          required: true,
          include: [
            {
              model: db.models.EMPLEADO_ASESOR,
              as: "Id_empleado_EMPLEADO_ASESOR",
              required: true,
              include: [
                {
                  model: db.models.ASESOR_DETALLE,
                  as: "ASESOR_DETALLEs",
                  required: true
                },
              ],
            },
            {
              model: db.models.ROL,
              as: "Id_rol_ROL",
              required: true,
              where: {
                Id_rol: 1
            },
            }
          ],
        },
      ],
  });
}

  return {
    listlogin,
    create,
    getUserByEmail,
    getUserByEmailSinPassword,
    getUserByEmailSinPasswordBackend,
    listUser
  };
};

module.exports = userRepository();
