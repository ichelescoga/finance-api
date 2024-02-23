const EntityRepository = require("../repository/EntityRepositoryA");
const security = require("../src/utils/security");
const createError = require("http-errors");

exports.getComponentsByEntity = async(req, res, next)=>{
    try {
        console.log("estamos aqui")
        let entity= req.body.id
        let component = await EntityRepository.getComponentByEntity(entity)
        let componentes = []
        for(let i =0; i < component.length; i++){
            let componente = await EntityRepository.getComponent(component[i].dataValues.Id_componente)
            let items = {
                items:null
            }
            componentes.push(componente)
        }
        res.json(componentes.sort((a,b) => a[0]["dataValues"]["columnNumber"]-b[0]["dataValues"]["columnNumber"]))
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}


exports.addEntity = async(req, res, next)=>{
    try {
        let tipo_entidad= req.body.id
        //verificar si entidad es padre o mod 
        let is_father = await EntityRepository.getTypeEntity(tipo_entidad)
        if(is_father){
            //si es padre
            if(is_father.dataValues.Estado == 0 ){
        //crear entidad con componente de nombre y descripcion
        let entity_params = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            createdby: req.body.createdby,
            tipo: req.body.id
        }
        let entity= await EntityRepository.addEntity(entity_params)
        //let entity = true
        if(entity){
            let details = {}
            details = req.body.details
            for(let i =0; i < details.length; i ++){
                let detail = {}
                detail = details[i]
                let [clave, valor] = Object.entries(detail)[0];
                //ir a buscar el componente asignado a esta entidad
                let component = await EntityRepository.getComponentById(tipo_entidad, clave)
                if(component){
                   let entity_detail = {
                     id_caracteristica: component.dataValues.Id_caracteristica,
                     id_entidad: entity.dataValues.Id,
                     valor: valor,
                     createdby: req.body.createdby
                   }
                   let detail_result
                   switch(component.dataValues.Id_tipo_caracteristica){
                    case 1: 
                        detail_result= await EntityRepository.addEntityDetailString(entity_detail)
                        break;
                    case 2:
                        detail_result = await EntityRepository.addEntityDetailInt(entity_detail)
                        break;
                    case 3:
                        detail_result = await EntityRepository.addEntityDetailDate(entity_detail)
                        break;
                    case 4:
                        detail_result = await EntityRepository.addEntityDetailDouble(entity_detail)
                        break;
                    case 5:
                        detail_result = await EntityRepository.addEntityDetailBoolean(entity_detail)
                        break;
                    default:
                        detail_result = false
                   }
                   if(detail_result== false){
                    message= "hubo un error"
                   }
                }
            }
        }
        res.status(200).json({
            succes: true,
            message: "Entidad Creada con Exito",
          });
            }
            //es mod
            if(is_father.dataValues.Estado == 1){
                let mod = await EntityRepository.getMod(is_father.dataValues.Nombre)
                if(mod){
                    //verificamos si exise el modificador en esa entidad
                    let params = {
                        id_modificador: mod.dataValues.Id,
                        id_entidad: req.body.father,
                        createdby: req.body.createdby
                    }
                    let mod_entity = await EntityRepository.getMod_Entity(params)
                    if(!mod_entity){
                        //no tiene creado el modificador
                        // se crea el modificador
                        mod_entity = await EntityRepository.addMod_Entity(params)
                    }
                    //si lo tiene o si se creo
                    //obtenemos datos de la entidad padre
                    let entity_father = await EntityRepository.getEntity(req.body.father)
                    if(entity_father){ 
                        let nombre ;
                        if(req.body.nombre != ''){
                           nombre = req.body.nombre
                        }else {
                            nombre= entity_father.dataValues.Nombre
                        }
                        params = {
                            nombre: nombre,
                            descripcion: is_father.dataValues.Nombre + " de " + entity_father.dataValues.Nombre,
                            createdby: req.body.createdby,
                            tipo: tipo_entidad
                        }
                        let entity = await EntityRepository.addEntity(params)
                        if(entity){
                            let details = {}
                            details = req.body.details
                            for(let i =0; i < details.length; i ++){
                                let detail = {}
                                detail = details[i]
                                let [clave, valor] = Object.entries(detail)[0];
                                //ir a buscar el componente asignado a esta entidad
                                let component = await EntityRepository.getComponentById(tipo_entidad, clave)
                                if(component){
                                   let entity_detail = {
                                     id_caracteristica: component.dataValues.Id_caracteristica,
                                     id_entidad: entity.dataValues.Id,
                                     valor: valor,
                                     createdby: req.body.createdby
                                   }
                                   let detail_result
                                   switch(component.dataValues.Id_tipo_caracteristica){
                                    case 1: 
                                        detail_result= await EntityRepository.addEntityDetailString(entity_detail)
                                        break;
                                    case 2:
                                        detail_result = await EntityRepository.addEntityDetailInt(entity_detail)
                                        break;
                                    case 3:
                                        detail_result = await EntityRepository.addEntityDetailDate(entity_detail)
                                        break;
                                    case 4:
                                        detail_result = await EntityRepository.addEntityDetailDouble(entity_detail)
                                        break;
                                    case 5:
                                        detail_result = await EntityRepository.addEntityDetailBoolean(entity_detail)
                                        break;
                                    default:
                                        detail_result = false
                                   }
                                   if(detail_result== false){
                                    message= "hubo un error"
                                   }
                                }
                            }
                                   //agregar el modificador al grupo de modificadores
                                   params = {
                                    id_modificador_entidad: mod_entity.dataValues.Id,
                                    id_entidad: entity.dataValues.Id,
                                    createdby: req.body.createdby
                                   }
                                   let creat_ = await EntityRepository.addGroupModifEntidad(params)
                                   if(creat_){
                                    res.status(200).json({
                                        succes: true,
                                        message: "NO ES PADRE"
                                      });
                                }
                                   }
                        }
                  
                    
                }
                
            }
        }

    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}


exports.getEntities= async(req, res, next)=>{
    try {
        let tipo_entidad= req.body.id
        let entidades = await EntityRepository.getEntities(tipo_entidad)
        let component = await EntityRepository.getComponentByEntityNotNull(tipo_entidad)
        let results = []
        for (let y =0; y < entidades.length; y++){
            let param= {}
            param["id"] = entidades[y].dataValues.Id
            param["nombre"] = entidades[y].dataValues.Nombre
            param["descripcion"] = entidades[y].dataValues.Descripcion
            for(let i =0; i < component.length; i++){
                let valor
                let s 
                switch(component[i].dataValues.Id_tipo_caracteristica){
                    case 1:
                        s = await EntityRepository.getCaracteristicaString(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 2: 
                        s = await EntityRepository.getCaracteristicaInt(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 3: 
                        s = await EntityRepository.getCaracteristicaDate(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 4: 
                        s = await EntityRepository.getCaracteristicaDouble(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 5: 
                        s = await EntityRepository.getCaracteristicaBoolean(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    default:
                        valor = ''
                }
                
                if(valor!= undefined){
                  
                    param[component[i].dataValues.Id_componente] = valor
                   
                }
            }
            results.push(param)
        }
       
        res.json(results)
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}


exports.getModsByEntity = async(req, res, next)=>{
    try {
    
        let entity= req.params.id_entidad
        let mod = req.params.id_mod
        params = {
            id_modificador: mod,
            id_entidad: entity,
        }

        let mod_ = await EntityRepository.getMod_Entity(params)
   
        let results = []
     
        if(mod_){//si tiene modificadores de ese tipo
            let mod_id= await EntityRepository.getModById(mod_.dataValues.Id_modificador)
            let tipo_entidad = await EntityRepository.getEntityTypeByName(mod_id.dataValues.Nombre)
            //obtenemos los componentes del tipo de entidad del modificadr
            let component = await EntityRepository.getComponentByEntityNotNull(tipo_entidad.dataValues.Id)

            //obtenemos todas las entidades en el grupo modificador entidad de ese id_modificador_entidad
            let entidades_ = await EntityRepository.getGroupModById(mod_.dataValues.Id)
            let entidades = []
            for(let z =0; z < entidades_.length; z++){
              
                let entity = await EntityRepository.getEntityDetailsById(entidades_[z].dataValues.Id_entidad)
 
               entidades.push(entity)
            }
        
        for (let y =0; y < entidades.length; y++){
            let param= {}
            param["id"] = entidades[y].dataValues.Id
            param["nombre"] = entidades[y].dataValues.Nombre
            param["descripcion"] = entidades[y].dataValues.Descripcion
            for(let i =0; i < component.length; i++){
                let valor
                let s 
                switch(component[i].dataValues.Id_tipo_caracteristica){
                    case 1:
                        s = await EntityRepository.getCaracteristicaString(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 2: 
                        s = await EntityRepository.getCaracteristicaInt(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 3: 
                        s = await EntityRepository.getCaracteristicaDate(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 4: 
                        s = await EntityRepository.getCaracteristicaDouble(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 5: 
                        s = await EntityRepository.getCaracteristicaBoolean(component[i].dataValues.Id_caracteristica,entidades[y].Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    default:
                        valor = ''
                }
                
                if(valor!= undefined){
                  
                    param[component[i].dataValues.Id_componente] = valor
                   
                }
            }
            results.push(param)
        }
          

        }
        
        res.json(results)
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}
exports.getEntityById = async(req, res, next)=>{
    try {
        let entity_id= req.params.id
        //obtenemos la entidad
        let entity = await EntityRepository.getEntityDetailsById(entity_id)
        let component = await EntityRepository.getComponentByEntityNotNull(entity.dataValues.Tipo)
        let param= {}
            param["id"] = entity.dataValues.Id
            param["nombre"] = entity.dataValues.Nombre
            param["descripcion"] = entity.dataValues.Descripcion
            for(let i =0; i < component.length; i++){
                let valor
                let s 
                switch(component[i].dataValues.Id_tipo_caracteristica){
                    case 1:
                        s = await EntityRepository.getCaracteristicaString(component[i].dataValues.Id_caracteristica,entity.Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 2: 
                        s = await EntityRepository.getCaracteristicaInt(component[i].dataValues.Id_caracteristica,entity.Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 3: 
                        s = await EntityRepository.getCaracteristicaDate(component[i].dataValues.Id_caracteristica,entity.Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 4: 
                        s = await EntityRepository.getCaracteristicaDouble(component[i].dataValues.Id_caracteristica,entity.Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    case 5: 
                        s = await EntityRepository.getCaracteristicaBoolean(component[i].dataValues.Id_caracteristica,entity.Id)
                        if(s) valor = s.dataValues.Valor
                        break;
                    default:
                        valor = ''
                }
                
                if(valor!= undefined){
                  
                    param[component[i].dataValues.Id_componente] = valor
                   
                }
            }
        res.json(param)
    } catch (error) {
        console.log(error);
        next(createError(500));
    }
}

