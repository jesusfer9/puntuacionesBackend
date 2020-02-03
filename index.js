var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Puntuacion = require('./models/puntuacion')

var app = express();

// Preparo body parser para que transforme las peticiones de texto a json
app.use( bodyParser.urlencoded( {extend:false} ) )
app.use( bodyParser.json() )

app.get('/', (req, res) => {
    res.status(200).send("Hola");
})

// Todo:
app.get('/puntuaciones/', (req, res)=>{
    Puntuacion.find().exec( (err, puntuaciones)=>{
        if(err){
            res.status(500).send({accion:'get all', mensaje:'error al obtener la puntuación'})
        }else{
            res.status(200).send({accion:'get all', datos: puntuaciones})
        }
    })
    /*let datosJSON = {
        accion:'get all',
        datos: [
            {nombre:'Pepe', puntuaciones: 33},
            {nombre:'Bea', puntuaciones: 43},
            {nombre:'Angel', puntuaciones: 54},
            {nombre:'Isabel', puntuaciones: 23}
        ]
    }
    res.status(200).send(datosJSON)*/
})

app.post('/puntuacion', (req, res)=> { 
    var datos = req.body;

    var puntuacion = new Puntuacion();
    puntuacion.nombre = datos.nombre;
    puntuacion.puntuacion = datos.puntuacion;
    puntuacion.save( (err, puntuacionGuardada)=>{
        if(err){
            res.status(500).send( {accion: 'save', mensaje:'Error al guardar la puntuaicion'} )
        }else{
            res.status(200).send({accion: 'save', datos:puntuacionGuardada})
        }
    })
    //TODO: insertar en la base de datos
    /*let datosJsonRespuesta = {
        accion: 'save',
        datos: datos
    }
    res.status(200).send(datosJsonRespuesta);*/
})

app.delete('/puntuacion/:id', (req, res) => {
    let puntuacionId = req.params.id;
    Puntuacion.findByIdAndDelete(puntuacionId, (err, puntuacionBorrada)=>{
        if(err){
            res.status(500).send( {accion: 'delete', mensaje:'Error al borrar la puntuaicion'} )
            if(!puntuacionBorrada){
                res.status(404).send( {accion: 'delete', mensaje:'El id a borrar no existe'} )
            }
        }else{
            res.status(200).send({accion: 'delete', datos:puntuacionBorrada})
        }
    })
    /*let datosJasonRespuesta = { 
        accion: 'delete',
        datos: puntuacionId
    }
    //Borrar datos de la base de datos
    res.status(200).send(datosJasonRespuesta)*/
})



mongoose.connect('mongodb://192.168.99.100:27017/scores', (err, res)=>{
    if(err){
        console.log('Error al conectarme a la base de datos')
        throw err
    }else{
        console.log("Conexion correcta a mongoDB")

        app.listen(5200, ()=>{
            console.log("API REST funcionando en http://localhost:5200")
        })

    }
})