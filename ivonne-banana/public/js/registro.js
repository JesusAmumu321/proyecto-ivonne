// JavaScript para el formulario de registro
import { auth, onAuthStateChanged } from './firebase-config.js';
import { registrarUsuario } from './usuarios.js';

console.log('📝 Página de registro cargada');

// Elementos del DOM
const formRegistro = document.getElementById('formRegistro');
const mensajeEstado = document.getElementById('mensajeEstado');
const btnRegistro = document.getElementById('btnRegistro');
const firebaseStatus = document.getElementById('firebaseStatus');
const descripcionPersonal = document.getElementById('descripcionPersonal');
const contadorCaracteres = document.getElementById('contadorCaracteres');

// Monitorear estado de Firebase
onAuthStateChanged(auth, (user) => {
    if (user) {
        firebaseStatus.textContent = '✓ Conectado';
        firebaseStatus.className = 'font-semibold text-green-300';
    } else {
        firebaseStatus.textContent = '⚠ Desconectado';
        firebaseStatus.className = 'font-semibold text-yellow-300';
    }
});

// Contador de caracteres para descripción
descripcionPersonal.addEventListener('input', (e) => {
    const caracteres = e.target.value.length;
    contadorCaracteres.textContent = caracteres;
    
    if (caracteres > 450) {
        contadorCaracteres.className = 'text-red-600 font-semibold';
    } else if (caracteres > 400) {
        contadorCaracteres.className = 'text-orange-600';
    } else {
        contadorCaracteres.className = '';
    }
});

// Mostrar mensaje de estado
function mostrarMensaje(mensaje, tipo = 'success') {
    mensajeEstado.classList.remove('hidden', 'bg-green-100', 'bg-red-100', 'bg-blue-100', 'text-green-700', 'text-red-700', 'text-blue-700');
    
    if (tipo === 'success') {
        mensajeEstado.classList.add('bg-green-100', 'text-green-700');
    } else if (tipo === 'error') {
        mensajeEstado.classList.add('bg-red-100', 'text-red-700');
    } else {
        mensajeEstado.classList.add('bg-blue-100', 'text-blue-700');
    }
    
    mensajeEstado.textContent = mensaje;
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        mensajeEstado.classList.add('hidden');
    }, 5000);
}

// Validar contraseñas
function validarPasswords(password, confirmar) {
    if (password !== confirmar) {
        return { valido: false, mensaje: 'Las contraseñas no coinciden' };
    }
    
    if (password.length < 6) {
        return { valido: false, mensaje: 'La contraseña debe tener al menos 6 caracteres' };
    }
    
    return { valido: true };
}

// Limpiar formulario
function limpiarFormulario() {
    formRegistro.reset();
    contadorCaracteres.textContent = '0';
}

// Manejar el envío del formulario
formRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Deshabilitar botón durante el proceso
    btnRegistro.disabled = true;
    btnRegistro.textContent = '⏳ Registrando...';
    btnRegistro.classList.add('opacity-50', 'cursor-not-allowed');
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const confirmarPassword = document.getElementById('confirmarPassword').value;
    const edad = document.getElementById('edad').value;
    const descripcion = document.getElementById('descripcionPersonal').value;
    
    // Validar contraseñas
    const validacion = validarPasswords(password, confirmarPassword);
    if (!validacion.valido) {
        mostrarMensaje(validacion.mensaje, 'error');
        btnRegistro.disabled = false;
        btnRegistro.textContent = '🚀 Registrar Usuario';
        btnRegistro.classList.remove('opacity-50', 'cursor-not-allowed');
        return;
    }
    
    // Preparar datos del usuario
    const datosUsuario = {
        nombre,
        apellido,
        correo,
        password,
        edad,
        descripcionPersonal: descripcion
    };
    
    // Intentar registrar
    mostrarMensaje('Registrando usuario...', 'info');
    
    try {
        const resultado = await registrarUsuario(datosUsuario);
        
        if (resultado.success) {
            mostrarMensaje(`✓ ${resultado.mensaje}. ¡Bienvenido ${nombre}!`, 'success');
            console.log('✓ Usuario registrado:', resultado);
            
            // Limpiar formulario
            limpiarFormulario();
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 2000);
        } else {
            mostrarMensaje(`✗ Error: ${resultado.error}`, 'error');
        }
    } catch (error) {
        console.error('Error inesperado:', error);
        mostrarMensaje('✗ Error inesperado al registrar usuario', 'error');
    } finally {
        // Rehabilitar botón
        btnRegistro.disabled = false;
        btnRegistro.textContent = '🚀 Registrar Usuario';
        btnRegistro.classList.remove('opacity-50', 'cursor-not-allowed');
    }
});

// Validación en tiempo real del correo
document.getElementById('correo').addEventListener('blur', (e) => {
    const correo = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (correo && !emailRegex.test(correo)) {
        e.target.classList.add('border-red-500');
        mostrarMensaje('El correo no parece válido', 'error');
    } else {
        e.target.classList.remove('border-red-500');
    }
});

// Validación en tiempo real de la edad
document.getElementById('edad').addEventListener('input', (e) => {
    const edad = parseInt(e.target.value);
    
    if (edad < 1 || edad > 120) {
        e.target.classList.add('border-red-500');
    } else {
        e.target.classList.remove('border-red-500');
    }
});

console.log('✓ Formulario de registro listo');
