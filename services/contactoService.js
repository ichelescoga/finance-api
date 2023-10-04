

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



        
  
    return {
        updateContacto,
        createContacto,
        findContactos,
        updateContactoState
    };
  };
  
  module.exports = userRepository();
  