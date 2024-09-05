import { ConnectDb } from "../../db/database"; 


// Endpoint de inicio de sesión (login)
export const loginCtrl = async (req, res) => {
    const { username, password } = req.body;
    const database = await ConnectDb();  // Conexión a la base de datos


    try { 
        // Buscar el usuario en la base de datos por nombre de usuario y contraseña
        const [user] = await database.query(
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

