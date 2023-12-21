"use strict";
const secret = process.env.SECRET;
const jwt = require("jsonwebtoken");

let generateToken = async (userCredential) => {
  let user = {
    email: userCredential.user.Correo,
    userId: userCredential.user.Id_user,
    projectId: userCredential?.project?.Id_proyecto,
    userProfileId: userCredential?.user.USER_PROFILEs?.length > 0 ? userCredential.user.USER_PROFILEs[0]?.Id_user_profile : null,
    employeeId: userCredential?.user.USER_PROFILEs?.length > 0 ? userCredential.user.USER_PROFILEs[0]?.Id_empleado : null,
    roleId: userCredential?.user.USER_PROFILEs?.length > 0 ? userCredential.user.USER_PROFILEs[0]?.Id_rol_ROL?.Id_rol : null
  };
  const tokenGenerate = await jwt.sign(user, secret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
  return tokenGenerate;
};

let decodeToken  = async (tokenGenerate) => {
  let token = tokenGenerate.split(" ");
  const tokenRequest = token[1];

  try {
    let decoded = await jwt.verify(tokenRequest, secret);

    return decoded;
  } catch (error) {
    return undefined;
  }
};


module.exports = {
  generateToken,
  decodeToken
};

// ? DATA MODEL 
// userCredential = {
//   "message": "Successful authentication.",
//   "token": "JWT TOKEN",
//   "usuario": {
//       "Id_user": 0,
//       "Correo": "email@gmail.com",
//       "Nombre": "User name",
//       "USER_PROFILEs": [
//           {
//               "Id_user_profile": 3,
//               "Id_rol": 1,
//               "Id_user": 5,
//               "Id_empleado": 3,
//               "Id_ejecutivo": null,
//               "Id_cliente": null,
//               "createdAt": "2023-09-07T19:01:08.000Z",
//               "updatedAt": "2023-09-07T19:01:08.000Z",
//               "Id_ejecutivo_EJECUTIVO": null,
//               "Id_cliente_CLIENTE": null,
//               "Id_empleado_EMPLEADO_ASESOR": {
//                   "Id_empleado": 3,
//                   "Primer_nombre": "Andrea",
//                   "Segundo_nombre": "Martina",
//                   "Otros_nombres": null,
//                   "Primer_apellido": "Lopez",
//                   "Segundo_apellido": "Reyes",
//                   "Apellido_casada": null,
//                   "DPI": "985623125487",
//                   "NIT": "2145784",
//                   "Telefono": "54879865",
//                   "Correo": "correoprueba1@gmail.com",
//                   "Foto": "fotoPrueba",
//                   "Id_puesto": 1,
//                   "Interno": 24,
//                   "createdAt": "2023-09-07T18:57:23.000Z",
//                   "updatedAt": "2023-09-07T18:57:23.000Z",
//                   "EMPLEADO_EMPRESAs": [
//                       {
//                           "Id_empleado_empresa": 1,
//                           "Id_empleado": 3,
//                           "Id_empresa": 1,
//                           "createdAt": "2023-09-07T23:27:34.000Z",
//                           "updatedAt": "2023-09-07T23:27:34.000Z",
//                           "Id_empresa_EMPRESA": {
//                               "Id_empresa": 1,
//                               "Nombre_comercial": "EmprePrueba"
//                           }
//                       }
//                   ]
//               },
//               "Id_rol_ROL": {
//                   "Id_rol": 1,
//                   "Nombre_rol": "Ejecutivo",
//                   "createdAt": "2023-08-24T04:13:11.000Z",
//                   "updatedAt": "2023-08-25T17:40:38.000Z"
//               }
//           }
//       ]
//   },
//   "proyecto": {
//       "Id_proyecto": 1,
//       "Nombre_proyecto": "NombreProyectoPrueba"
//   }
// }