const express = require('express');
const { dbConnection } = require('./db/config');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

//Crear app/server express
const app = express();

// Base de Datos
dbConnection();


// Directorio Público
app.use(express.static('public'));

//CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());


// Rutas
app.use( '/api/auth', require('./routes/auth'));

// Manejar resto rutas
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html'))
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});