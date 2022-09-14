const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');


const usuarioGet = async(req = request, res = response) => {

    // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { state: true }

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(limite);

    //     const total = await Usuario.countDocuments(query);

        const [ total, usuarios ] = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .skip(Number(desde))
                .limit(limite)
        ])

        res.json({
            total,
            usuarios
        });
}

const usuarioPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // Todo validar base de datos
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuarioDB = await Usuario.findByIdAndUpdate( id, resto );
    

    res.json(usuarioDB);
}

const usuarioPost = async(req, res = response) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    const { nombre, correo, password, role } = req.body
    const usuario = new Usuario({ nombre, correo, password, role });

    
    // Encriptar la contraseña
    const salt = await bcryptjs.genSalt(10);
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    });
}

const usuarioDelete = async(req, res = response) => {

    const { id } = req.params;
    // Fisicamete lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { state: false } );

    res.json({
        usuario
    });
}

const usuarioPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador',
        id
    });
}



module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}