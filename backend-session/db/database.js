import mySql2 from 'mySql2';

export const connectDb = async () => {
    try{
        const connection = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'users',
        }); 
        await connection.connect(); 
        console.log("se conecto a la base de datos correctamente ")
    
        return connection;
    } catch (error) {
            console.log("error al conectarse a la base de datos", error);
        }
    }
    