
import mysql from 'mysql2';
import "dotenv/config";

const PASSWORD = process.env.PASSWORD;

const coneccionBD = () => {

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'biblioteca_virtual',
        password: PASSWORD
    });

    db.connect((err) => {
        if (err) {
            console.log('error al conectarse a la base de datos');
        } else {
            console.log('coneción exitosa a la base de datos: biblioteca_virtual');
        }
    })
    return db;
}


export default coneccionBD;