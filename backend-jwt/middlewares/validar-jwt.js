import jwt from 'jsonwebtoken';

import { config } from '../config/config.js';
import { ConnectDb } from '../db/database.js';

// Middleware para verificar el token JWT
export default async (req, res, next) => {
    console.log(req.session)
    console.log('-----------')
    console.log(req.cookies)
    const token = req.cookies.authToken || req.session.token;

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, config.SECRET_KEY);
    
    // Se busca al usuario en la base de datos
    

    // adaptas a la conexion de la base de datos
    const connection = await ConnectDb();
    const [user] = await connection.query('SELECT * FROM users WHERE id =?', [decoded.userId]);




    if (!user) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = user; // Agrega la información del usuario decodificada al request

    next();
};