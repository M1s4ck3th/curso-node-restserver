const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']

    },

    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true

    },

    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria']

    },

    img: {
        type: String,
       

    },

    role: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] 
    },

    state: {
        type: Boolean,
        default: true

    },

    google: {
        type: Boolean,
        default: false

    }

    

});

usuarioSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user;
} 


module.exports = model( 'Usuario', usuarioSchema );

