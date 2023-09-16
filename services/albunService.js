const db = require("../src/models");
  
  let userRepository = function () {

    let findTiposRecurso = async () => {
        const tiposRecursos = await db.models.TIPO_RECURSO.findAll({
        });
        return tiposRecursos;
      };

      let findAlbumsProyecto  = async (params) => {
        const tiposRecursos = await db.models.PROYECTO.findOne({
          attributes: ["Id_proyecto" , "Nombre_proyecto"],
          where: { Id_proyecto: params.idProyect},
          include: [
            {
              model: db.models.ALBUN,
              as: "ALBUNs",
              where: { State: params.idState},
              include: [
                {
                  model: db.models.RECURSO,
                  as: "RECURSOs",
                  where: { State: params.idState},
                  include: [
                    {
                      model: db.models.TIPO_RECURSO,
                      as: "Id_tipo_recurso_TIPO_RECURSO",
                    },
                  ],
                },
              ],
            }
          ]
        });
        return tiposRecursos;
      };
    
    let createAlbum = async (params) => {
      const newAlbum = await db.models.ALBUN.create({
        Id_proyecto: params.idProyecto,
        Name_albun: params.nombreAlbum,
        Posicion: params.posicion,
        State: params.state,
      });
      return newAlbum;
    };

    let createRecurso = async (params) => {
        const newAlbum = await db.models.RECURSO.create({
            Id_albun: params.idAlbum,
            Id_tipo_recurso: params.idTipoRecurso,
            Url_recurso: params.urlRecurso,
            Posicion: params.posicion,
            State: params.state,
            Favorito: params.favorito
        });
        return newAlbum;
      };

      let findAlbumsFavoritas  = async (params) => {
        const tiposRecursos = await db.models.PROYECTO.findOne({
          attributes: ["Id_proyecto" , "Nombre_proyecto"],
          where: { Id_proyecto: params},
          include: [
            {
              model: db.models.ALBUN,
              as: "ALBUNs",
              include: [
                {
                  model: db.models.RECURSO,
                  as: "RECURSOs",
                  where: { Favorito: 1},
                  include: [
                    {
                      model: db.models.TIPO_RECURSO,
                      where: { State: 1},
                      as: "Id_tipo_recurso_TIPO_RECURSO",
                    },
                  ],
                },
              ],
            }
          ]
        });
        return tiposRecursos;
      };

      let findAlbumRecursos  = async (params) => {
        const tiposRecursos = await db.models.ALBUN.findOne({
          where: { Id_albun: params.idAlbum},
          include: [
            {
              model: db.models.RECURSO,
              as: "RECURSOs",
              where: { State: params.idState},
              include: [
                {
                  model: db.models.TIPO_RECURSO,
                  as: "Id_tipo_recurso_TIPO_RECURSO",
                },
              ],
            },
          ],
        });
        return tiposRecursos;
      };

      let updteAlbum = async (params) => {
        const album = await db.models.ALBUN.findOne({ where: { Id_albun: params.idAlbum } });
  
        if(!album) {
           return
        } else {
            await db.models.ALBUN.update({
            Id_proyecto: params.idProyecto,
            Name_albun: params.nombreAlbum,
            Posicion: params.posicion,
            State: params.state
          },{
            where:{
              Id_albun: params.idAlbum
            }
        });
        }
        const albumActualizada = await db.models.ALBUN.findOne({ where: { Id_albun: params.idAlbum } });
        return albumActualizada
      };

      let updteRecurso = async (params) => {
        const album = await db.models.RECURSO.findOne({ where: { Id_recurso: params.idRecurso } });
  
        if(!album) {
           return
        } else {
            await db.models.RECURSO.update({
              Id_albun: params.idAlbum,
              Id_tipo_recurso: params.idTipoRecurso,
              Url_recurso: params.urlRecurso,
              Posicion: params.posicion,
              State: params.state,
              Favorito: params.favorito
          },{
            where:{
              Id_recurso: params.idRecurso
            }
        });
        }
        const albumRecurso = await db.models.RECURSO.findOne({ where: { Id_recurso: params.idRecurso } });
        return albumRecurso
      };
    return {
        createAlbum,
        createRecurso,
        findTiposRecurso,
        findAlbumsProyecto,
        findAlbumsFavoritas,
        findAlbumRecursos,
        updteAlbum,
        updteRecurso
    };
  };
  
  module.exports = userRepository();
  