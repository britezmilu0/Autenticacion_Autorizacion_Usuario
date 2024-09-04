import mysql from 'mysql2/promise';

export const connectDb = async () => {
    try{
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'db_system',
        }); 
        console.log("se conecto a la base de datos correctamente ")
    
        return connection;
    } catch (error) {
            console.log("error al conectarse a la base de datos", error);
        }
    }
    