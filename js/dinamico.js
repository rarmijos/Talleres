let btnImprimir = document.getElementById('btnImprimir');
let tabla = document.getElementById('tabla');

const imprimirMensaje = () => {

    let nombre = document.getElementById('floating_email').value;
    let apellido = document.getElementById('floating_password').value;
    let nombreUsuario = document.getElementById('floating_password1').value;
    let correo = document.getElementById('floating_repeat_password').value;
    let contrasena = document.getElementById('floating_first_name').value;
    let confirmarContrasena = document.getElementById('floating_last_name').value;
    let edad = document.getElementById('floating_age').value;
    let telefono = document.getElementById('floating_phone').value;

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

btnImprimir.onclick = imprimirMensaje;