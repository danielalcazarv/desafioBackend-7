import path from 'path';
import {fileURLToPath} from 'url';

//Solucion a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//config MariaDB
export const config = {
    db: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'dalcazar',
            password: 'dalcazar',
            database: 'ecommerce'
        }
    }
}

//config SQLite3
export const config2 = {
    db: {
        client: 'better-sqlite3',
        connection: {
            filename: path.join(__dirname, '../../db/ecommerce.db3' )
        },
        useNullAsDefault: true
    }
}