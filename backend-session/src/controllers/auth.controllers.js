import { connectDb } from  "../../db/database.js";

export const loginCtrl = async (req, res) => {
    const { username, password } = req.body;
    const connection = await connectDb();

    //buscar usuaruio en la base de dato haciendo una consulta 
    const [user] = await connection.query('SELECT * FROM users WHERE USERNAME= ? AND PASSWORD= ?', [username, password]);

        if (user) {
            // Guardar información del usuario en la sesión
            req.session.userId = user.id;
            req.session.username = user.username;

            connection.end();
            
            return res.json({ 
                message: 'Inicio de sesión exitoso', 
                user: { id: user.id, username: user.username } });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }
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


