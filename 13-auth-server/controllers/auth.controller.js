const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res = response) => {

    const { email, name, password } = req.body;
    
    try {
        // Verificar Email
        const usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña son incorrectos'
            });
        }

        // Crear usuario con modelo
        const dbUser = new Usuario(req.body);

        // Hashear Password
        const salt = bcrypt.genSaltSync(10);
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Crear usuario en DB
        await dbUser.save();

        // Generar Response
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name,
            email,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el Administrador'
        });
    }

}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const dbUser = await Usuario.findOne({ email });

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no esite'
            });
        }

        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El paswor no esite'
            });
        }

        const token = await generarJWT(dbUser.id, dbUser.name);

        return res.status(200).json({
            ok: true,
            uid: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacte con el Administrador'
        });
    }
    
};

const renovarToken = async(req, res) => {

    const { uid } = req;
    const dbUser = await Usuario.findById(uid);



    const token = await generarJWT(uid, dbUser.name, dbUser.email);

    return res.json({
        ok: true,
        uid,
        name: dbUser.name,
        email: dbUser.email,
        token
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    renovarToken
}