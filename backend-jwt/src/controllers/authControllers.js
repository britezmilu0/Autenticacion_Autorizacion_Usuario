import { ConnectDb } from "../../db/database.js"; 
import { generarJwt } from "../../helpers/generar-jwt.js";


// Endpoint de inicio de sesión (login)
export const loginCtrl = async (req, res) => {
    const { username, password } = req.body;
    const database = await ConnectDb();  // Conexión a la base de datos


    try { 
        // Buscar el usuario en la base de datos por nombre de usuario y contraseña
        const [[user]]= await database.query(
            "SELECT * FROM users WHERE username = ? AND password = ?",
            [username, password]
        );
        

        // Validación de usuario
        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar token JWT
        const token = await generarJwt(user.id);

        // Almacenar el token en una cookie segura
        res.cookie('authToken', token, {
            httpOnly: true, // La cookie no es accesible desde JavaScript
            secure: false, // Cambiar a true en producción con HTTPS
            maxAge: 3600000 // Expiración en milisegundos (1 hora)
        });

        return res.json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
};


// Endpoint para validar la sesión
export const authSession = (req, res) => {
    console.log(req.user);
    return res.json({ message: 'Acceso permitido a área protegida', user: req.user });
};


// Endpoint de cierre de sesión (logout)
export const authLogout = (req, res) => {
    try {
            res.clearCookie('authToken');
            return res.json({ message: 'Cierre de sesión exitoso' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }
};

//Endopint crear registro para el usuario 
export const authRegister = async(req, res) => {
    const { username, password } = req.body;
    const database = await ConnectDb();

    try {
        // Validar que el usuario no sea repetido 
        const [[user]] = await database.query(
            "SELECT * FROM users WHERE username =?",
            [username]
        );
        if (user) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }
        
        // Se crea el nuevo usuario en la base de datos
        await database.query(
            "INSERT INTO users (username, password) VALUES (?,?)",
            [username, password]
        );
        
        return res.json({ message: 'Registro exitoso' });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error Inesperado' });
    }

}