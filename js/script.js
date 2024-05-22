// Variables
const carrito = document.getElementById('carrito'),
    listaPrendas = document.getElementById('lista-prendas'),
    contenedorCarrito = document.querySelector('.buy-card .lista_de_prendas'),
    vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];

registrarEventsListeners();

function registrarEventsListeners() {
    //al dar click agregar al carrito
    listaPrendas.addEventListener('click', agregarPrenda);
    //ELIMINAR CURSO DEL CARRITO
    carrito.addEventListener('click', eliminarPrenda)
    //MOSTRAR PRENDAS DEL CARRITO
    //CON JSON.parse CONVIERTO A FORMATO ANTERIOR 
    document.addEventListener("DOMContentLoaded", () => {
        articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carritoHTML()
    })
    //VACIAR EL CARRITO
    vaciarCarritoBtn.addEventListener('click', e => {
        articulosCarrito = [];
        limpiarHTML()
    })
    //console.log(articulosCarrito)
}
//AGREGAR PRENDAS DEL CARRITO
function agregarPrenda(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const prendaSeleccionada = e.target.parentElement.parentElement;
        leerInfo(prendaSeleccionada)
    }
}

//ELIMINAR PRENDAS DEL CARRITO
function eliminarPrenda(e) {
    if (e.target.classList.contains("borrar-prenda")) {
        const prendaId = e.target.getAttribute('data-id');
        //ELIMINAR DEL ARREGLO DE articulosCarrito POR EL data-id
        articulosCarrito = articulosCarrito.filter(prenda => prenda.id !== prendaId)
        carritoHTML()
    }
}

//leer el contenido del html al que le damos click e extrae la info
function leerInfo(prenda) {
    //crear objeto con el contenido e la foto actual
    const infoPrenda = {
        imagen: prenda.querySelector('img').src,
        titulo: prenda.querySelector('h3').textContent,
        precio: prenda.querySelector('.descuento').textContent,
        id: prenda.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(infoPrenda)
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(prenda => prenda.id === infoPrenda.id)
    //console.log(existe)
    if (existe) {
        //ACTUALIZAR LA CANTIDAD DE PRENDAS
        const prendas = articulosCarrito.map(prenda => {
            if (prenda.id === infoPrenda.id) {
                prenda.cantidad++;
                return prenda
            } else {
                return prenda;
            }
        });
        [...articulosCarrito, infoPrenda]
    } else {
        //agregamos articulos al carrito
        articulosCarrito = [...articulosCarrito, infoPrenda]
        //console.log(articulosCarrito)
    }
    carritoHTML() //invoco la funcion cada vez que agrego item al array
}

//muestra el carrito en el html

function carritoHTML() {
    limpiarHTML()
    //recorre el carito y genera el html
    articulosCarrito.forEach(prenda => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${prenda}"></img>
            <p>${prenda.titulo}</p>
            <p>${prenda.precio}</p>
            <p>${prenda.cantidad}</p>
            <p><span class="borrar-prenda" data-id="${prenda.id}">X</span></p>
        `;
        contenedorCarrito.appendChild(fila)
    });
    //Sincronizo con LocalStorage
    sincronizarLocalStorage()
}
// CON JSON CONVIERTO A FORMATO PLANO EL CONTENIDO 
function sincronizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(articulosCarrito))
}

//elimina las prendas de la lista_de_prendas
function limpiarHTML() {
    // console.log(contenedorCarrito.firstChild)
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
    sincronizarLocalStorage()
}


//Formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Campos
    const fields = [
        { id: 'nombre', value: document.getElementById('nombre').value, message: 'Por favor, introduce tu nombre.' },
        { id: 'pedido', value: document.getElementById('pedido').value, message: 'Por favor, introduce tu número de pedido.' },
        { id: 'servicio', value: document.getElementById('servicio').value, message: 'Por favor, selecciona un servicio.' },
        { id: 'correo', value: document.getElementById('correo').value, message: 'Por favor, introduce tu correo electrónico.' },
        { id: 'mensaje', value: document.getElementById('mensaje').value, message: 'Por favor, introduce tu mensaje.' },
        { id: 'imagen', value: document.getElementById('imagen').files.length > 0, message: 'Por favor, selecciona una imagen.' }
    ];

    // Verifica si selecciona una sucursal
    const sucursal = document.querySelector('input[name="sucursal"]:checked');
    if (!sucursal) {
        alert('Por favor, selecciona una sucursal.');
        return;
    }

    // Alertas y campos vacíos
    const showAlert = (message, field) => {
        alert(message);
        document.getElementById(field).focus();
    };

    // Verifica si los campos están completos
    for (let field of fields) {
        if (!field.value) {
            showAlert(field.message, field.id);
            return;
        }
    }

    // Si está completo, enviar formulario       
    this.submit();
}); 
