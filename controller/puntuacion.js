var Puntuacion = require('../models/puntuacion')

async function getAll(req, res){

    //Callbacks
    /*Puntuacion.find().exec( (err, puntuaciones)=>{
        if(err){
            res.status(500).send({accion:'get all', mensaje:'error al obtener la puntuación'})
        }else{
            res.status(200).send({accion:'get all', datos: puntuaciones})
        }
    })*/

    //Promesas
    /*Puntuacion.find({}).exec()
        .then( puntuaciones => res.status(200).send({accion:'get all', datos: puntuaciones}) )
        .catch( err => res.status(500).send({accion:'get all', mensaje: `error al obtener la puntuación ${err}`}) )*/

    // Async await
    try{
        let puntuaciones =  await Puntuacion.find()
        res.status(200).send({accion:'get all', datos: puntuaciones})
    } catch(err){
        res.status(500).send({accion:'get all', mensaje: `error al obtener la puntuación ${err}`})
    }

}

async function getById( req, res){

    try{
        let puntuacionesId =  req.params.id
        let puntuacion =  await Puntuacion.findById(puntuacionesId)
        res.status(200).send({accion:'get one', datos: puntuacion})
    } catch(err){
        res.status(500).send({accion:'get one', mensaje:'error al obtener la puntuación'})
    }

}

async function insert(req, res){

    const puntuacion =  new Puntuacion(req.body);
    try{
        let puntuacionGuardada =  await puntuacion.save()
        res.status(200).send({accion: 'save', datos:puntuacionGuardada})
    } catch(err){
        res.status(500).send( {accion: 'save', mensaje:'Error al guardar la puntuaicion'} )
    }
    
}

async function remove(req, res){

    try{
        let puntuacionId =  req.params.id;
        let puntuacionBorrada =  await Puntuacion.findByIdAndRemove(puntuacionId)
        if(!puntuacionBorrada){
            res.status(404).send( {accion: 'delete', mensaje:'No existe el id a borrar'} )
        }else{
        res.status(200).send({accion: 'delete', datos:puntuacionBorrada})
        }
    } catch(err){
        res.status(500).send( {accion: 'delete', mensaje:'Error al borrar la puntuaicion'} )
    }

}

async function update(req, res){

    try{
        var datos = req.body;
        let puntuacionId =  req.params.id;
        let puntuacionActualizada =  await Puntuacion.findByIdAndUpdate(puntuacionId, datos)
        if(!puntuacionBorrada){
            res.status(404).send( {accion: 'remove', mensaje:'No existe el id a actualizar'} )
        }else{
        res.status(200).send({accion: 'remove', datos: puntuacionActualizada})
        }
    } catch(err){
        res.status(500).send( {accion: 'update', mensaje:'Error al actualizar la puntuaicion'} )
    }

}

module.exports = {getAll, getById, insert, remove, update}