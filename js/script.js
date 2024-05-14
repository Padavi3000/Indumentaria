// Variables
const   carrito = document.getElementById('carrito'),
        listaPrendas = document.getElementById('lista-prendas'),
        contenedorCarrito = document.querySelector('.buy-card .divisionProductos'),
        vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];
registrarEventsListeners();

function registrarEventsListeners() {
    //al dar click agregar al carrito
    listaPrendas.addEventListener('click', agregarPrenda);
}

function agregarPrenda(e) {
    if (e.target.classList.contains("agregar-carrito")) {
       const prendaSeleccionada = e.target.parentElement.parentElement;
       leerInfo(prendaSeleccionada)
    }
}
//leer el contenido del html al que le damos click e extrae la info
function leerInfo(prenda) {
    //crear objeto con el contenido e la foto actual
    const infoPrenda = {
        imagen : prenda.querySelector('img').src,
        titulo : prenda.querySelector('h3').textContent,
        precio : prenda.querySelector('.descuento').textContent,
        id : prenda.querySelector('button').getAttribute('data-id'),
        cantidad : 1
    }
    // console.log(infoPrenda)
    //agregamos articulos al carrito
    articulosCarrito = [...articulosCarrito, infoPrenda]
    // console.log(articulosCarrito)
    carritoHTML() //invoco la funcion cada vez que agrego item al array
}

//muestra el carrito en el html

function carritoHTML() {
    //recorre el carito y genera el html
    articulosCarrito.forEach(prenda => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${prenda}"></img>
            <p>${prenda.titulo}</p>
            <p>${prenda.precio}</p>
            <p>${prenda.cantidad}</p>
            <p><span>X</span></p>
        `;

        contenedorCarrito.appendChild(fila)
    });
}

//elimina las prendas de la lista_de_prendas
function limpiarHTML(){
    // console.log(contenedorCarrito.firstChild)
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

