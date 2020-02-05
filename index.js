var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routerPuntuacion = require('./routers/puntuacion');
var cors = require('cors');
var morgan = require('morgan');
var app = express();




// Preparo body parser para que transforme las peticiones de texto a json
app.use( bodyParser.urlencoded( {extend:false} ) )
app.use( bodyParser.json() )

app.use( cors() )
/*app.use( (req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header('Allow', 'GET,POST,PUT,DELETE')
    next()
})*/
app.use( morgan('dev') );
app.use('/puntuacion', routerPuntuacion)

app.get('/', (req, res) => {
    res.status(200).send("Hola");
})

/*mongoose.connect('mongodb://192.168.99.100:27018/scores',{useFindAndModify: true, useNewUrlParse: true, useUnifiedTopology: true}, (err, res)=>{
    if(err){
        console.log('Error al conectarme a la base de datos')
        throw err
    }else{
        console.log("Conexion correcta a mongoDB")

        app.listen(5200, ()=>{
            console.log("API REST funcionando en http://localhost:5200")
        })

    }
})*/

//mongoose con await
const run = async() => {
    await mongoose.connect('mongodb://192.168.99.100:27018/scores',{useFindAndModify: true, useNewUrlParse: true, useUnifiedTopology: true})
    await app.listen(5200)
        console.log("Servidor y base de datos arrancados")
}

run().catch(err => console.err('Fallo al arrancar: '+err))