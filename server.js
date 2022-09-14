/******Modulos******/
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from 'morgan';
import handlebars from 'express-handlebars';
import Contenedor from './src/models/contenedor.js';
//const productos = new Contenedor('./src/db/productos.json');
const historial = new Contenedor('./src/db/historial.json');
import { ContenedorSQL } from './src/container/ContenedorSQL.js';
const productosDB = new ContenedorSQL('productos');

//Solucion a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Instancia de servidor
const app = express();
const httpServer = createServer(app);
const io = new Server (httpServer);

/******Middleware******/
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.use(morgan('dev'));

//Motores de plantillas
//HBS
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname +'/src/views/layouts',
    partialsDir: __dirname +'/src/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views','./src/views');

/******Rutas******/
app.get('/', (req,res)=>{
    res.render('main')
});

/******Servidor******/
const PORT = 8080;
const server = httpServer.listen(PORT, ()=>{
    console.log('Tu servidor esta corriendo en el puerto http://localhost:' + PORT);
});

/******Web Socket******/
//Productos
io.on('connection', async (socket)=>{
    try {
        console.log('Usuario Conectado');
        let prods;
        prods = await productosDB.listarAll();
        socket.emit('productos', prods);

        socket.on('new-prod', async data =>{
        productosDB.insertar(data);
        prods = await productosDB.listarAll();
            io.sockets.emit('productos',prods);
        });
    } catch (error) {
        throw error;
    }
});

//Chat
io.on('connection', async (socket)=>{
    const chat = await historial.getAll();
    
    socket.emit('mensajes',chat);
    socket.on('new-mensaje', data =>{
        historial.save(data);
        io.sockets.emit('mensajes', chat);
    });
});