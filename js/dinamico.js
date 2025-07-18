let btnRegistrar = document.getElementById('btnRegistrar');
let tabla = document.getElementById('tabla');

const imprimirMensaje = () => {

    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let nombreUsuario = document.getElementById('nombreUsuario').value;
    let correo = document.getElementById('correo').value;
    let contrasena = document.getElementById('contrasena').value;
    let confirmarContrasena = document.getElementById('confirmarContrasena').value;
    let edad = document.getElementById('edad').value;
    let telefono = document.getElementById('telefono').value;

    let nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td class="celda">${nombre}</td>
        <td class="celda">${apellido}</td>
        <td class="celda">${nombreUsuario}</td>
        <td class="celda">${correo}</td>
        <td class="celda">${contrasena}</td>
        <td class="celda">${confirmarContrasena}</td>
        <td class="celda">${edad}</td>
        <td class="celda">${telefono}</td>
    `;

    tabla.appendChild(nuevaFila);

    document.querySelector('form').reset();
};

btnRegistrar.onclick = imprimirMensaje;