document.addEventListener('DOMContentLoaded', function() {

const inputNombre = document.getElementById("nombre");
const inputApellido = document.getElementById("apellido");
const inputUsuario = document.getElementById("nombreUsuario");
const inputEmail = document.getElementById("correo");
const inputPassword = document.getElementById("contrasena");
const inputConfirmPassword = document.getElementById("confirmarContrasena");
const inputEdad = document.getElementById("edad");
const inputTelefono = document.getElementById("telefono");
const btnRegistrar = document.getElementById("btnRegistrar");


const errorNombre = document.getElementById("errorNombre");
const errorApellido = document.getElementById("errorApellido");
const errorUsuario = document.getElementById("errorUsuario");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");
const errorConfirmPassword = document.getElementById("errorConfirmPassword");
const errorEdad = document.getElementById("errorEdad");
const errorTelefono = document.getElementById("errorTelefono");

// FUNCIÓN PARA VALIDAR NOMBRE (SOLO LETRAS)
const validarNombre = () => {
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if(!regexNombre.test(inputNombre.value)) {
        errorNombre.textContent = "Solo se permiten letras";
        inputNombre.classList.add("invalido");
        inputNombre.classList.remove("valido");
        return false;
    } else {
        errorNombre.textContent = "";
        inputNombre.classList.add("valido");
        inputNombre.classList.remove("invalido");
        return true;
    }
}

// FUNCIÓN PARA VALIDAR APELLIDO (SOLO LETRAS)
const validarApellido = () => {
    const regexApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if(!regexApellido.test(inputApellido.value)) {
        errorApellido.textContent = "Solo se permiten letras";
        inputApellido.classList.add("invalido");
        inputApellido.classList.remove("valido");
        return false;
    } else {
        errorApellido.textContent = "";
        inputApellido.classList.add("valido");
        inputApellido.classList.remove("invalido");
        return true;
    }
}

// FUNCIÓN PARA VALIDAR USUARIO (LETRAS Y NÚMEROS)
const validarUsuario = () => {
    const regexUsuario = /^[a-zA-Z0-9_]+$/;
    if(!regexUsuario.test(inputUsuario.value)) {
        errorUsuario.textContent = "Solo letras, números y guión bajo";
        inputUsuario.classList.add("invalido");
        inputUsuario.classList.remove("valido");
        return false;
    } else {
        errorUsuario.textContent = "";
        inputUsuario.classList.add("valido");
        inputUsuario.classList.remove("invalido");
        return true;
    }
}

// FUNCIÓN PARA VALIDAR EMAIL
const validarEmail = () => {
    const regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
    if(!regexEmail.test(inputEmail.value)) {
        errorEmail.textContent = "Email inválido";
        inputEmail.classList.add("invalido");
        inputEmail.classList.remove("valido");
        return false;
    } else {
        errorEmail.textContent = "";
        inputEmail.classList.add("valido");
        inputEmail.classList.remove("invalido");
        return true;
    }
}

// FUNCIÓN PARA VALIDAR CONTRASEÑA (MÍNIMO 8 CARACTERES)
const validarPassword = () => {
    if(inputPassword.value.length < 8) {
        errorPassword.textContent = "Mínimo 8 caracteres";
        inputPassword.classList.add("invalido");
        inputPassword.classList.remove("valido");
        return false;
    } else {
        errorPassword.textContent = "";
        inputPassword.classList.add("valido");
        inputPassword.classList.remove("invalido");
        return true;
    }
}

// FUNCIÓN PARA VALIDAR CONFIRMACIÓN DE CONTRASEÑA
const validarConfirmPassword = () => {
    if(inputPassword.value !== inputConfirmPassword.value) {
        errorConfirmPassword.textContent = "Las contraseñas no coinciden";
        inputConfirmPassword.classList.add("invalido");
        inputConfirmPassword.classList.remove("valido");
        return false;
    } else {
        errorConfirmPassword.textContent = "";
        inputConfirmPassword.classList.add("valido");
        inputConfirmPassword.classList.remove("invalido");
        return true;
    }
}

// FUNCIÓN PARA VALIDAR EDAD (ENTRE 13 Y 120 AÑOS)
const validarEdad = () => {
    const edad = parseInt(inputEdad.value);
    if(isNaN(edad) || edad < 13 || edad > 120) {
        errorEdad.textContent = "Edad debe ser entre 13 y 120";
        inputEdad.classList.add("invalido");
        inputEdad.classList.remove("valido");
        return false;
    } else {
        errorEdad.textContent = "";
        inputEdad.classList.add("valido");
        inputEdad.classList.remove("invalido");
        return true;
    }
}

// FUNCIÓN PARA VALIDAR TELÉFONO (SOLO NÚMEROS, 7-15 DÍGITOS)
const validarTelefono = () => {
    const regexTelefono = /^[0-9]{7,15}$/;
    if(!regexTelefono.test(inputTelefono.value)) {
        errorTelefono.textContent = "Solo números (7-15 dígitos)";
        inputTelefono.classList.add("invalido");
        inputTelefono.classList.remove("valido");
        return false;
    } else {
        errorTelefono.textContent = "";
        inputTelefono.classList.add("valido");
        inputTelefono.classList.remove("invalido");
        return true;
    }
}

// FUNCIÓN PARA VALIDAR TODO EL FORMULARIO
const validarFormulario = () => {
    const valido = validarNombre() && validarApellido() && validarUsuario() && validarEmail() && validarPassword() && validarConfirmPassword() && validarEdad() && validarTelefono();
    
    btnRegistrar.disabled = !valido;
    return valido;
}

inputNombre.addEventListener('input', () => {
    validarNombre();
    validarFormulario();
});

inputApellido.addEventListener('input', () => {
    validarApellido();
    validarFormulario();
});

inputUsuario.addEventListener('input', () => {
    validarUsuario();
    validarFormulario();
});

inputEmail.addEventListener('input', () => {
    validarEmail();
    validarFormulario();
});

inputPassword.addEventListener('input', () => {
    validarPassword();
    validarConfirmPassword();
    validarFormulario();
});

inputConfirmPassword.addEventListener('input', () => {
    validarConfirmPassword();
    validarFormulario();
});

inputEdad.addEventListener('input', () => {
    validarEdad();
    validarFormulario();
});

inputTelefono.addEventListener('input', () => {
    validarTelefono();
    validarFormulario();
});

const mensajeExitoso = document.getElementById("registroExitoso");
const enviarFormulario = async () => {
    mensajeExitoso.textContent = "Registrando...";
    await new Promise(resolve => setTimeout(resolve, 1500));
    mensajeExitoso.textContent = "¡Registro exitoso!";
    
    document.querySelector('form').reset();
    document.querySelectorAll('.valido').forEach(el => {
        el.classList.remove('valido');
    });
    
    btnRegistrar.disabled = true;
}

btnRegistrar.addEventListener('click', (event) => {
    event.preventDefault();
    if(validarFormulario()) {
        enviarFormulario();
    }
});
})