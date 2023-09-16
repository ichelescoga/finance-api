const albumService = require("../services/albunService");

exports.listaTiposRecurso = async (req, res, next) => {
try {
    let results = await albumService.findTiposRecurso();
    const longitud = results.length;

    if (longitud >= 1) {
        res.json(results);
    } else {
        res.status(202).json({
        success: true,
        message: "No hay tipos de recursos registrados",
        });
    }
    } catch (error) {
    next(error);
    }
};


exports.listaAlbumsProyect = async (req, res, next) => {
    try {
      let params = {
        idProyect: req.params.idProyect,
        idState: req.params.idState
      }
      let results = await albumService.findAlbumsProyecto(params);
      if (results) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay albums para este proyecto",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  exports.listaAlbumsFavoritas = async (req, res, next) => {
    try {
      let results = await albumService.findAlbumsFavoritas(req.params.idProyect);
      if (results) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay Favoritas para este proyecto",
        });
      }
    } catch (error) {
      next(error);
    }
  };

  exports.listaAlbunRecursos = async (req, res, next) => {
    try {
      let params = {
        idAlbum: req.params.idAlbum,
        idState: req.params.idState
      }
      let results = await albumService.findAlbumRecursos(params);
      if (results) {
        res.json(results);
      } else {
        res.status(202).json({
          success: true,
          message: "No hay Recursos para este Album",
        });
      }
    } catch (error) {
      next(error);
    }
  };
exports.creacionAlbum = async (req, res, next) => {
    try {
  
      let paramsAlbum = {
        idProyecto: req.body.idProyecto,
        nombreAlbum: req.body.nombreAlbum,
        posicion: req.body.posicion,
        state: req.body.state
      };
  
  
      let albumCreado = await albumService.createAlbum(paramsAlbum);

      res.status(200).json({
        succes: true,
        message: "Album Creado con Exito",
        album: albumCreado
      });
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear Album, intentelo de nuevo",
      });
    }
  };



  exports.creacionRecurso = async (req, res, next) => {
    try {
  
      let paramsRecurso = {
        idAlbum: req.body.idAlbum,
        idTipoRecurso: req.body.idTipoRecurso,
        urlRecurso: req.body.urlRecurso,
        posicion: req.body.posicion,
        state: req.body.state,
        favorito: req.body.favorito
      };
  
      let albumCreado = await albumService.createRecurso(paramsRecurso);

      res.status(200).json({
        succes: true,
        message: "Recurso Creado con Exito",
        album: albumCreado
      });
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: "Problemas al crear Recurso, intentelo de nuevo",
      });
    }
  };


  exports.updateAlbum = async (req, res, next) => {
    try {
  
      let paramsAlbum = {
        idProyecto: req.body.idProyecto,
        idAlbum: req.params.idAlbum,
        nombreAlbum: req.body.nombreAlbum,
        posicion: req.body.posicion,
        state: req.body.state
      };
  
  
      let albumActualizado = await albumService.updteAlbum(paramsAlbum);
      if (albumActualizado) {
        res.status(200).json({
          succes: true,
          message: "Album actualizado con exito",
          body: albumActualizado
        });
      } else {
        res.status(404).json({
          succes: true,
          message: "No existe el album",
        });
      }
      
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: error,
      });
    }
  };


  exports.updateRecurso = async (req, res, next) => {
    try {
  
      let paramsAlbum = {
        idRecurso: req.params.idRecurso,
        idAlbum: req.body.idAlbum,
        idTipoRecurso: req.body.idTipoRecurso,
        urlRecurso: req.body.urlRecurso,
        posicion: req.body.posicion,
        state: req.body.state,
        favorito: req.body.favorito,
      };
  
      let albumActualizado = await albumService.updteRecurso(paramsAlbum);
      if (albumActualizado) {
        res.status(200).json({
          succes: true,
          message: "Recurso actualizado con exito",
          body: albumActualizado
        });
      } else {
        res.status(404).json({
          succes: true,
          message: "No existe el recurso",
        });
      }
      
    } catch (error) {
      res.status(406).json({
        succes: false,
        message: error,
      });
    }
  };