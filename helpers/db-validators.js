const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async( role = '' ) => {
    const existeRole = await Role.findOne ({ role });
    if ( !existeRole ){
        throw new Error(`El rol ${ role } no esta registrado en la base de datos`)
    }
}

const existeEmail = async( correo = '' ) => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ){
       throw new Error(`El correo ${ correo }, ya esta registrado`)
    }

}

const existeUsuarioPorId = async( id ) => {
    // Verificar si el id existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario){
       throw new Error(`El ID: ${ id }, no existe.`);
    }

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}