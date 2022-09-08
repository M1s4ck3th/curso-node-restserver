const { response, request } = require('express');


const usuarioGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

        res.json({
            msg: 'get API - controlador',
            q,
            nombre,
            apikey,
            page,
            limit
        });
}

const usuarioPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuarioPost = (req, res = response) => {

    const { nombre, edad } = req.body

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usuarioDelete = (req, res = response) => {

    res.json({
        msg: 'delete API - controlador'
    });
}

const usuarioPatch = (req, res = response) => {

    res.json({
        msg: 'patch API - controlador'
    });
}



module.exports = {
    usuarioGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch
}