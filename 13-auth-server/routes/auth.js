const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renovarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

console.log('Auth Importado')

// Crear nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
    validarCampos
], crearUsuario);

// Login usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({min: 6}),
    validarCampos
], loginUsuario);

// Validar token
router.get('/renew', validarJWT, renovarToken);


module.exports = router;