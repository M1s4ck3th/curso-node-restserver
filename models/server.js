const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../DB/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        // Conectar a base de datos
        this.DataBase();

        // Middlewares
        this.middleWares();

        // Rutas de mi aplicacion

        this.routes();
    }

    async DataBase() {
        await dbConnection();
    }

    middleWares() {

        // CORS
        this.app.use( cors() );

        // Lectura y Parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {

        this.app.use( this.usuariosRoutePath, require('../routes/user'))
    }

    listen() {
        this.app.listen( process.env.PORT, () => {
            console.log('Servidor corriendo en puerto', this.port );
        })
    }

}





module.exports = Server;