// Variables
const   carrito = document.getElementById('carrito'),
        listaCursos = document.getElementById('lista-cursos'),
        contenedorCarrito = document.querySelector('.buy-card .divisionProductos'),
        vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];
registrarEventsListeners();

function registrarEventsListeners() {
    //al dar click agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);
}

function agregarCurso(e) {
    if (e.target.classList.contains("agregar-carrito")) {
       const cursoSeleccionado = e.target.parentElement.parentElement;
       leerInfo(cursoSeleccionado)
    }
}
//leer el contenido del html al que le damos click e extrae la info
function leerInfo(curso) {
    //crear objeto con el contenido e la foto actuial
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h3').textContent,
        precio : curso.querySelector('.descuento').textContent,
        id : curso.querySelector('button').getAttribute('data-id'),
        cantidad : 1
    }
    // console.log(infoCurso)
    //agregamos articulos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
    // console.log(articulosCarrito)
    carritoHTML()
}

//muestra el carrito en el html

function carritoHTML() {
    //recorre el carito y genra el html
    articulosCarrito.forEach(curso => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${curso}"></img>
            <p>${curso.titulo}</p>
            <p>${curso.precio}</p>
            <p>${curso.cantidad}</p>
            <p><span>X</span></p>
        `;

        contenedorCarrito.appendChild(fila)
    });
}


