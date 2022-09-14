
const { Router } = require('express');
const { check } = require('express-validator');

const { validar } = require('../middlewares/validar');

const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');
const { usuarioGet,
        usuarioPut,
        usuarioPost,
        usuarioDelete,
        usuarioPatch 
      } = require('../controllers/users');

const router = Router();

router.get('/', usuarioGet);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom( esRoleValido ),
    validar
], usuarioPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de ser de mas de seis letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( existeEmail ),
    // Codigo de checkeo de rol
    // check('role', 'No es es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROL']),
    check('role').custom( esRoleValido ),
    validar
], usuarioPost );

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validar
], usuarioDelete);

router.patch('/', usuarioPatch);



module.exports = router;


