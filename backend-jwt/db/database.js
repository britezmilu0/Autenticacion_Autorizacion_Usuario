import mysql2 from 'mysql2/promise'
import { config } from '../config/config';

export const ConnectDb= async (req, res) => {
    try {
        const connection = await mysql2.createConnection({
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            port: config.PORT,
            database: config.DB_NAME,
    });
    console.log("se conecto a la base de datos correctamente ")
    
    return connection;
}
    catch (error) {
        console.log("error al conectarse a la base de datos", error);
    }
}
