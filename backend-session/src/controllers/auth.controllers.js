import { connectDb } from  "../../db/database.js";



export const loginCtrl = async (req, res) => {
    const { username, password } = req.body;
    const connection = await connectDb();

    //buscar usuaruio en la base de dato haciendo una consulta 
    const [user] = await connection.query('SELECT * FROM users WHERE USERNAME= ? AND PASSWORD= ?', [username, password]);
    if (user.length > 0) {
        // Usuario encontrado y contraseña coincide
        req.session.userId = user[0].id; // Guarda el ID del usuario en la sesión
        req.session.username = user[0].username; // Guarda el nombre de usuario en la sesión
        return res.json({ loggedIn: true, message: 'Inicio de sesión exitoso' });
    } else {
        // Usuario no encontrado o contraseña incorrecta
        return res.status(401).json({ loggedIn: false, message: 'Usuario o contraseña incorrecta' });
    }
    }


// Ruta para manejar el inicio de sesión
export const checkSessionCtrl = async (req, res) => {

    if (req.session.userId) {
        return res.json({ 
            loggedIn: true, 
            user: { id: req.session.userId, username: req.session.username } });
    } else {
        return res.status(401).json({ loggedIn: false, message: 'No hay sesión activa' });
    }
}

// Ruta para cerrar la sesión
export const logoutCtrl =  (req, res) => {
    console.log(req.session)
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error al cerrar la sesión' });
        }
        res.clearCookie('connect.sid'); // Nombre de cookie por defecto para express-session
        return res.json({ message: 'Sesión cerrada exitosamente' });
    });
}

//ejemplo para ver si funcionaba la base de datos 
// export const getUsers = async (req, res) => {

//     try{
//     const db = await connectDb();
//     const [users] = await db.query("SELECT * FROM users");

//     console.log(users);
//     res.json(users);

// } catch(err){

//     res.json({
//         msg: "ERROR AL CONECATR"
//     })

// }
// }


// ctrl.login = async (req, res) => {}
//     const { username, password } = req.body;
// //buscar usuaruio 
//     const user = database.user.find(u => u.username === username && u.password === password);

//     if (user) {
//         // Guardar información del usuario en la sesión
//         req.session.userId = user.id;
//         req.session.username = user.username;

//         return res.json({ 
//             message: 'Inicio de sesión exitoso', 
//             user: { id: user.id, username: user.username } });
//     } else {
//         return res.status(401).json({ message: 'Credenciales incorrectas' });
//     }
// }

// ctrl.login = async (req, res) => {
//     const { username, password } = req.body;
// //buscar usuaruio 
//     const user = database.user.find(u => u.username === username && u.password === password);

//     if (user) {
//         // Guardar información del usuario en la sesión
//         req.session.userId = user.id;
//         req.session.username = user.username;

//         return res.json({ 
//             message: 'Inicio de sesión exitoso', 
//             user: { id: user.id, username: user.username } });
//     } else {
//         return res.status(401).json({ message: 'Credenciales incorrectas' });
//     }
// }


