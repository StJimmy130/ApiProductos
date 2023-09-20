function obtenerProductos() {
    // console.log("llama al obtener");
    fetch('https://localhost:7020/api/ProductosItems')
    .then(respuesta => respuesta.json())
    .then(data => mostrarProductos(data))
    .catch(error => console.error("No se pudo acceder a la api.", error));
}

function mostrarProductos(data) {
    const tbody = document.getElementById('Productos');
    tbody.innerHTML = "";

    data.forEach(element => {
        let tr = tbody.insertRow();

        let nombre = document.createTextNode(element.nombre);

        let tdNombre = tr.insertCell(0);
        tdNombre.appendChild(nombre);
        tdNombre.id = "tdNombre";

        let precio = document.createTextNode(element.precio);

        let tdPrecio = tr.insertCell(1);
        tdPrecio.appendChild(precio);
        tdPrecio.id = "tdPrecio";


        let esNuevoCheckbox = document.createElement('input');
        esNuevoCheckbox.type = 'checkbox';
        esNuevoCheckbox.classList.add('form-check-input');
        esNuevoCheckbox.disabled = true;
        esNuevoCheckbox.checked = element.esNuevo;

        let tdEsNuevo = tr.insertCell(2);
        tdEsNuevo.appendChild(esNuevoCheckbox);


        let editar = document.createElement('button');
        editar.textContent = "Editar";
        editar.classList.add('botonEditar');
        editar.setAttribute('onclick', `BuscarValoresProductos(${element.id})`);

        let tdEditar = tr.insertCell(3);
        tdEditar.appendChild(editar);

        
        let eliminar = document.createElement('button');
        eliminar.textContent = "Eliminar";
        eliminar.classList.add('botonEliminar');
        eliminar.setAttribute('onclick', `ValidacionEliminarProductos(${element.id})`);

        let tdEliminar = tr.insertCell(4);
        tdEliminar.appendChild(eliminar);

    });
}




function ValidacionEliminarProductos(id) {
    var siElimina = confirm("¿Esta seguro que desea eliminar este producto?");
    if (siElimina == true)
    {
        EliminarProducto(id);
    }
}
function EliminarProducto(id) {
    fetch(`https://localhost:7020/api/ProductosItems/${id}`,
    {
        method: 'DELETE',
    })
    .then(() => {obtenerProductos();})
    .catch(error => console.error("No se pudo acceder a la api.", error))
}


function AgregarProducto() {
    var nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        esNuevo: document.getElementById('esNuevo').checked,
    }

    fetch('https://localhost:7020/api/ProductosItems',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoProducto)
        }
    )
    .then(respuesta => respuesta.json())
    .then(() => {
        document.getElementById('nombre').value = "";
        document.getElementById('precio').value = "";
        document.getElementById('esNuevo').checked = false;
        $('#agregarProducto').modal('hide');
        obtenerProductos();
    })
    .catch(error => console.error("No se pudo insertar el nuevo producto.", error));
}


function BuscarValoresProductos(id) {
    fetch(`https://localhost:7020/api/ProductosItems/${id}`,{
        method: 'GET'
    })
    .then(respuesta => respuesta.json())
    .then(data =>
    {
        document.getElementById('idEditar').value = data.id;
        document.getElementById('nombreEditar').value = data.nombre;
        document.getElementById('precioEditar').value = data.precio;
        document.getElementById('esNuevoEditar').checked = data.esNuevo;
        $('#editarProducto').modal('show');
    })
    .catch(error => console.error("No se pudo acceder a la api.", error))
}

function editarProducto() {
    let id = document.getElementById('idEditar').value;

    let editarProducto = {
        id: document.getElementById('idEditar').value,    
        nombre: document.getElementById('nombreEditar').value,
        precio: document.getElementById('precioEditar').value,
        esNuevo: document.getElementById('esNuevoEditar').checked,
    }
    
    fetch(`https://localhost:7020/api/ProductosItems/${id}`,
        {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editarProducto)
        }
    )
    .then(() => {
        document.getElementById('idEditar').value = 0;
        document.getElementById('nombreEditar').value = "";
        document.getElementById('precioEditar').value = "";
        document.getElementById('esNuevoEditar').checked = false;
        $('#editarProducto').modal('hide');
        obtenerProductos();
    })
    .catch(error => console.error("No se pudo editar el producto.", error))
}