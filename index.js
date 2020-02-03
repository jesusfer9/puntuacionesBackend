var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Preparo body parser para que transforme las peticiones de texto a json
app.use( bodyParser.urlencoded( {extend:false} ) )
app.use( bodyParser.json() )

app.get('/', (req, res) => {
    res.status(200).send("Hola");
})

app.get('/puntuaciones/', (req, res)=>{
    //TODO: leer la base de datos
    let datosJSON = {
        accion:'get all',
        datos: [
            {nombre:'Pepe', puntuaciones: 33},
            {nombre:'Bea', puntuaciones: 43},
            {nombre:'Angel', puntuaciones: 54},
            {nombre:'Isabel', puntuaciones: 23}
        ]
    }
    res.status(200).send(datosJSON)
})

app.post('/puntuacion', (req, res)=> { 
    var datos = req.body;
    //TODO: insertar en la base de datos
    let datosJsonRespuesta = {
        accion: 'save',
        datos: datos
    }
    res.status(200).send(datosJsonRespuesta);
})

app.delete('/puntuacion/:id', (req, res) => {
    let puntuacionId = req.params.id;
    let datosJasonRespuesta = { 
        accion: 'delete',
        datos: puntuacionId
    }
    //Borrar datos de la base de datos
    res.status(200).send(datosJasonRespuesta)
})


app.listen(5200, ()=>{
    console.log("API REST funcionando en http://localhost:5200")
})