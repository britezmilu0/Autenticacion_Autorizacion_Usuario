import mysql from 'mysql2/promise';
import { config } from '../src/config/config.js';

export const connectDb = async () => {
    try{
        const connection = await mysql.createConnection({
            host: config.PORT,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            port: config.DB_PORT,
            database: config.DB_NAME,
        }); 
        console.log("se conecto a la base de datos correctamente ")
    
        return connection;
    } catch (error) {
            console.log("error al conectarse a la base de datos", error);
        }
    }
    