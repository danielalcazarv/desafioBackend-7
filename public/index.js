//Inicializa Socket.io
const socket = io();

/**Productos**/
//Mostrar productos
function renderProductos(data){
    const html = data.map((producto, index) =>{
        return(`<tr>
        <td scope="row">${producto.codigo}</td>
        <td scope="row">${producto.nombre}</td>
        <td scope="row">${producto.descripcion}</td>
        <td>$ ${producto.precio}</td>
        <td>
            <img src=${producto.foto} class="img-thumbnail" alt="Foto de ${producto.nombre}">
        </td>
        </tr>`);
    }).join('');
    document.getElementById('tabla-body').innerHTML = html;
};

socket.on('productos', function(data){
    renderProductos(data);
});

//Cargar productos nuevos
function addProd(e){
    const producto = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        codigo: document.getElementById('codigo').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value,
        foto: document.getElementById('foto').value
    };
    socket.emit('new-prod', producto);
    return false;
}

const form = document.getElementById('form');
form.addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    form.reset();
});


/**Chat**/
//Mostrar Chat
function renderChat(data){
    const html = data.map((mensaje, index)=>{
        return(`
        <div class='d-flex flex-row'>
            <p class='pe-3 text-primary fw-bold'>${mensaje.email}</p>
            <p class='pe-1 timestamp'>[${mensaje.time}]</p>
            <p class='pe-3 text-success fst-italic'>: ${mensaje.mensaje}</p>
        </div>
        `);
    }).join('');
    document.getElementById('mensajes').innerHTML = html;
};

socket.on('mensajes', function(data){
    renderChat(data);
});

//Ingresar mensaje
function addMsg(e){
    const timestamp = new Date().toLocaleString();
    const emailInput = document.getElementById('email');
    const msjInput = document.getElementById('mensaje');
    const mensaje = {
        email: emailInput.value,
        time : timestamp,
        mensaje: msjInput.value,
    };
    socket.emit('new-mensaje', mensaje);
    msjInput.value='';
    return false;
};