//  Declaración de variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const catalogo = document.querySelector("#catalogo");
let articulosCarrito = [];

//  Declaración de eventos
cargarEventListeners();
function cargarEventListeners() {
  catalogo.addEventListener('click', agregarTenis);

  carrito.addEventListener('click', eliminarArticulo);

  vaciarCarritoBtn.addEventListener('click', () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

//  Declaración de funciones
//  Funcion para agregar tenis al carrito
function agregarTenis(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const tenisSeleccionado = e.target.parentElement.parentElement;
    leerDatosTenis(tenisSeleccionado);
  }
}

//  Eliminar los articulos del carrito
function eliminarArticulo(e) {
  if (e.target.classList.contains('borrar-tenis'));
  const tenisId = e.target.getAttribute('data-id');

  //  Elimina del arreglo articulosCarrito por el data-id
  articulosCarrito = articulosCarrito.filter(tenis => tenis.id !== tenisId);
  carritoHTML();
}

//  Funcion para leer el contenido del HTML y que se agrege el tenis
function leerDatosTenis(tenis) {
  //  Objeto con toda la información del tenis que se selecciono

  const infoTenis = {
    imagen: tenis.querySelector("img").src,
    nombre: tenis.querySelector("h4").textContent,
    precio: tenis.querySelector("p span").textContent,
    id: tenis.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //  Verificar si un tenis ya se encuentra en el carrito
  const existe = articulosCarrito.some((tenis) => tenis.id === infoTenis.id);
  if (existe) {
    //  Se actualiza la cantidad
    const articulos = articulosCarrito.map((tenis) => {
      if (tenis.id === infoTenis.id) {
        tenis.cantidad++;
        return tenis;
      } else {
        return tenis;
      }
    });
    articulosCarrito = [...articulos];
  } else {
    //  Agregamos tenis al carrito
    articulosCarrito = [...articulosCarrito, infoTenis];
  }

  carritoHTML();
}

//  Generar el HTML desde JS para recorrer la información del carrito
function carritoHTML() {
  //  Lmpiar HTML con una funcion

  limpiarHTML();

  //  Recorrido del carrito y generar HTML
  articulosCarrito.forEach((tenis) => {
    const { imagen, nombre, precio, cantidad, id } = tenis;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
                <img src="${imagen}" width="100" />
            </td>    
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-tenis" data-id="${id}" > X </a>
            </td>
        `;

    //  Agregar el HTML del carrito al tbody
    contenedorCarrito.appendChild(row);
  });
}

//  Eliminar los articulos del carrito del tbody
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}