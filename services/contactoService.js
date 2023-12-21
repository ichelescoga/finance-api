

const db = require("../src/models");
  
  let userRepository = function () {
    
    let createContacto= async (params) => {
      const newContacto = await db.models.CONTACTO.create({
        Id_proyecto: params.idProyecto,
        State: params.state,
        Nombre_completo: params.nombreCompleto,
        Telefono: params.telefono,
        Correo: params.correo,
        Direccion: params.direccion,
        Id_user_profile: params.userProfile
      });
      return newContacto;
    };

    let updateContacto = async (params) => {
        const contacto = await db.models.CONTACTO.findOne({ where: { Id_contacto: params.idContacto } });
  
        if(!contacto) {
           return
        } else {
            await db.models.CONTACTO.update({
                Id_proyecto: params.idProyecto,
                Nombre_completo: params.nombreCompleto,
                Telefono: params.telefono,
                Correo: params.correo,
                Direccion: params.direccion
          },{
            where:{
                Id_contacto: params.idContacto
            }
        });
        }
        const contactoActualizado = await db.models.CONTACTO.findOne({ where: { Id_contacto: params.idContacto } });
        return contactoActualizado
      };
    
      
      let updateContactoState = async (params) => {
        const contacto = await db.models.CONTACTO.findOne({ where: { Id_contacto: params.idContacto } });
  
        if(!contacto) {
           return
        } else {
            await db.models.CONTACTO.update({
                State: params.state,
          },{
            where:{
                Id_contacto: params.idContacto
            }
        });
        }
        const contactoActualizado = await db.models.CONTACTO.findOne({ where: { Id_contacto: params.idContacto } });
        return contactoActualizado
      };

      let findContactos = async (params) => {
        const Op = db.Sequelize.Op;
        const contactos = await db.models.CONTACTO.findAll({ 
          where: {
            [Op.and]: [
              { Id_proyecto: params },
              { State: 1},
            ]
          },
          required: true
        });
        return contactos;
      };


      let revisionCredenciales = async (params) => {
        const Op = db.Sequelize.Op;
        const contactos = await db.models.CONTACTO.findOne({ 
          where: {
            [Op.or]: [
              { Correo: params.correo},
              { Telefono: params.telefono },
            ]
          },
          include: [
            {
              model: db.models.CLIENTE_HAS_CONTACTO,
              as: "CLIENTE_HAS_CONTACTOs",
              include: [
                {
                  model: db.models.CLIENTE,
                  as: "Id_cliente_CLIENTE",
                },
              ],
            },
          ],
        });
        console.log(contactos?.CLIENTE_HAS_CONTACTOs, '🕴️🕴️🤖🤖🤖🤖')

        if (contactos) {
          if (contactos.CLIENTE_HAS_CONTACTOs.length > 0 ) {
            console.log("RETURN CONTACT 🍓🍓", contactos)
            return contactos;
          } else {
              console.log("CREATE HAS CONTACT CLIENT 🤖🤖🤖🤖")
              const newClient = 
                await db.models.CLIENTE.create({
                  Primer_nombre: contactos.Nombre_completo,
                  Telefono: contactos.Telefono,
                  Correo: contactos.Correo,
                  Direccion_residencia: contactos.Direccion,
              });
              await db.models.CLIENTE_HAS_CONTACTO.create({
                Id_cliente: newClient.Id_cliente,
                Id_contacto: contactos.Id_contacto,
              });
              return await revisionCredenciales(params);
          }
        } else {
          console.log("CREATE CONTACT 🤖🤖🤖")
          await createContacto({
            idProyecto: params.userInfo.projectId,
            state: 1,
            nombreCompleto: params.nombre,
            telefono: params.telefono,
            correo: params.correo,
            direccion: "",
            userProfile: params.userInfo.userProfileId
          })
          return await revisionCredenciales(params);
        }
      };


    
    
    let coincidenciasCorreo = async (params) => {
      const Op = db.Sequelize.Op;
      try {
        const contactos = await db.models.CONTACTO.findAll({ 
          where: {
            Correo: {
              [Op.like]: `%${params}%`
            },
          },
          include: [
            {
              model: db.models.CLIENTE_HAS_CONTACTO,
              as: "CLIENTE_HAS_CONTACTOs",
              include: [
                {
                  model: db.models.CLIENTE,
                  as: "Id_cliente_CLIENTE",
                },
              ],
            },
          ],
        });
        return contactos
      } catch (error) {
        return error
      }

    };

    let coincidenciasNombre = async (params) => {
      const Op = db.Sequelize.Op;
      try {
        const contactos = await db.models.CONTACTO.findAll({ 
          where: {
            Nombre_completo: {
              [Op.like]: `%${params}%`
            },
          },
          include: [
            {
              model: db.models.CLIENTE_HAS_CONTACTO,
              as: "CLIENTE_HAS_CONTACTOs",
              include: [
                {
                  model: db.models.CLIENTE,
                  as: "Id_cliente_CLIENTE",
                },
              ],
            },
          ],
        });

        
        return contactos
      } catch (error) {
        return error
      }

    };

    let coincidenciasNombreCliete = async (params) => {
      const Op = db.Sequelize.Op;
      try {
        const cliente = await db.models.CLIENTE.findAll({ 
          where: {
            Primer_nombre: {
              [Op.like]: `%${params}%`
            },
          },
          include: [
            {
              model: db.models.CLIENTE_HAS_CONTACTO,
              as: "CLIENTE_HAS_CONTACTOs",
              include: [
                {
                  model: db.models.CONTACTO,
                  as: "Id_contacto_CONTACTO",
                },
              ],
            },
          ],
        });
        return cliente
      } catch (error) {
        return error
      }

    };



    let coincidenciasTelefono = async (params) => {
      const Op = db.Sequelize.Op;
      try {
        const contactos = await db.models.CONTACTO.findAll({ 
          where: {
            Telefono: {
              [Op.like]: `%${params}%`
            },
          },
          include: [
            {
              model: db.models.CLIENTE_HAS_CONTACTO,
              as: "CLIENTE_HAS_CONTACTOs",
              include: [
                {
                  model: db.models.CLIENTE,
                  as: "Id_cliente_CLIENTE",
                },
              ],
            },
          ],
        });
        return contactos
      } catch (error) {
        return error
      }

    };


      // const coincidenciasCorreoTelNombre = async (params) => {
      //   const Op = db.Sequelize.Op;
      //   try {
      //     const contactos = await db.models.CONTACTO.findAll({
      //       where: {
      //         [Op.or]: [
      //           {
      //             Correo: {
      //               [Op.like]: `%${params.correo}%`,
      //             },
      //           },
      //           // Puedes agregar más condiciones aquí para otras columnas si deseas buscar parcialmente en ellas.
      //         ],
      //       },
      //     });
      //     return contactos;
      //   } catch (error) {
      //     return error;
      //   }
      // };
      
        
  
    return {
        updateContacto,
        createContacto,
        findContactos,
        updateContactoState,
        revisionCredenciales,
        coincidenciasCorreo,
        coincidenciasNombre,
        coincidenciasTelefono,
        coincidenciasNombreCliete
    };
  };
  
  module.exports = userRepository();
  