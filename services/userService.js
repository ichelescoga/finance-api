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
      attributes: ["Id_user", "Correo", "Nombre", "reset_password"],
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
              include: [
                {
                  model: db.models.EMPLEADO_EMPRESA,
                  as: "EMPLEADO_EMPRESAs",
                  include: [
                    {
                      model: db.models.EMPRESA,
                      as: "Id_empresa_EMPRESA",
                      attributes: ["Id_empresa", "Nombre_comercial"]
                    },
                  ],
                },
              ],
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

let getUserByEmailWithoutPassword = async (params) => {
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
        },
    ],  
  });
}


let findProyectoEmpresa = async (params) => {
  const Proyecto = await db.models.PROYECTO.findOne({ 
    where: { Id_empresa: params },
    attributes: ["Id_proyecto", "Nombre_proyecto"],
  });
  return Proyecto;
};

const resetPassword = async (userId, password) => {
  const needChangePassword = new Date();
  needChangePassword.setDate(needChangePassword.getDate() + 90);

  const isPasswordUpdated = await db.models.User.update(
    { Contrasenia: password, reset_password: needChangePassword },
    {
    where: {
      Id_user: userId
    }
  })
  .then(r => true)
  .catch(e => false)

  return isPasswordUpdated;
}

const userLogin = async (email, password) => {
  const user = await db.models.User.findOne({
    where: {Correo: email}
  })

  if(!user) return null;

  const compare = await bcrypt.compare(
    password,
    user.dataValues.Contrasenia
  );

  if(!compare) return null

  return user;
}


  return {
    listlogin,
    create,
    getUserByEmail,
    getUserByEmailSinPassword,
    getUserByEmailWithoutPassword,
    getUserByEmailSinPasswordBackend,
    listUser,
    findProyectoEmpresa,
    resetPassword,
    userLogin
  };
};

module.exports = userRepository();
