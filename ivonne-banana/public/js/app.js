// JavaScript principal con Firebase
import { db, auth, collection, addDoc, getDocs, signInAnonymously, onAuthStateChanged } from './firebase-config.js';

console.log('🍌 Ivonne Banana cargado correctamente!');

const btnSaludar = document.getElementById('btnSaludar');
const btnCambiarColor = document.getElementById('btnCambiarColor');
const btnGuardarFirebase = document.getElementById('btnGuardarFirebase');
const btnCargarMensajes = document.getElementById('btnCargarMensajes');
const mensaje = document.getElementById('mensaje');
const firebaseStatus = document.getElementById('firebaseStatus');
const authStatus = document.getElementById('authStatus');
const mensajesGuardados = document.getElementById('mensajesGuardados');

const colores = [
    'text-red-600',
    'text-blue-600',
    'text-green-600',
    'text-purple-600',
    'text-pink-600',
    'text-yellow-600'
];

let colorActual = 0;

// Evento para saludar
btnSaludar.addEventListener('click', () => {
    const hora = new Date().getHours();
    let saludo;
    
    if (hora < 12) {
        saludo = '¡Buenos días! 🌅';
    } else if (hora < 18) {
        saludo = '¡Buenas tardes! ☀️';
    } else {
        saludo = '¡Buenas noches! 🌙';
    }
    
    mensaje.textContent = saludo;
    mensaje.className = `text-center text-lg font-semibold ${colores[colorActual]}`;
});

// Evento para cambiar color
btnCambiarColor.addEventListener('click', () => {
    colorActual = (colorActual + 1) % colores.length;
    mensaje.textContent = `Color cambiado! ${['🔴', '🔵', '🟢', '🟣', '🩷', '🟡'][colorActual]}`;
    mensaje.className = `text-center text-lg font-semibold ${colores[colorActual]}`;
});

// Verificar conexión con el servidor cada 5 segundos
const verificarServidor = async () => {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        document.getElementById('serverStatus').textContent = `✓ ${data.message}`;
        document.getElementById('serverStatus').className = 'text-green-600';
    } catch (error) {
        document.getElementById('serverStatus').textContent = '✗ Servidor desconectado';
        document.getElementById('serverStatus').className = 'text-red-600';
    }
};

// Verificar al cargar
verificarServidor();

// Verificar cada 5 segundos
setInterval(verificarServidor, 5000);

// ========== FIREBASE ==========

// Autenticación anónima
signInAnonymously(auth)
    .then(() => {
        console.log('🔥 Usuario autenticado anónimamente');
    })
    .catch((error) => {
        console.error('Error de autenticación:', error);
        firebaseStatus.textContent = '✗ Error de autenticación';
        firebaseStatus.className = 'text-red-600';
    });

// Monitorear estado de autenticación
onAuthStateChanged(auth, (user) => {
    if (user) {
        firebaseStatus.textContent = '✓ Conectado a Firebase';
        firebaseStatus.className = 'text-green-600';
        authStatus.textContent = `Usuario: ${user.uid.substring(0, 8)}...`;
        
        // Cargar mensajes al conectarse
        cargarMensajes();
    } else {
        firebaseStatus.textContent = '✗ No conectado';
        firebaseStatus.className = 'text-red-600';
        authStatus.textContent = '';
    }
});

// Guardar mensaje en Firebase
btnGuardarFirebase.addEventListener('click', async () => {
    const textoMensaje = mensaje.textContent || 'Mensaje de prueba desde Ivonne Banana 🍌';
    
    if (!textoMensaje.trim()) {
        alert('No hay mensaje para guardar');
        return;
    }
    
    try {
        const docRef = await addDoc(collection(db, 'mensajes'), {
            texto: textoMensaje,
            timestamp: new Date().toISOString(),
            color: colores[colorActual]
        });
        
        console.log('Documento guardado con ID:', docRef.id);
        mensaje.textContent = '✓ Guardado en Firebase!';
        mensaje.className = 'text-center text-lg font-semibold text-green-600';
        
        // Recargar mensajes
        cargarMensajes();
    } catch (error) {
        console.error('Error al guardar:', error);
        mensaje.textContent = '✗ Error al guardar';
        mensaje.className = 'text-center text-lg font-semibold text-red-600';
    }
});

// Cargar mensajes de Firebase
async function cargarMensajes() {
    try {
        const querySnapshot = await getDocs(collection(db, 'mensajes'));
        mensajesGuardados.innerHTML = '';
        
        if (querySnapshot.empty) {
            mensajesGuardados.innerHTML = '<p class="text-gray-400 text-sm">No hay mensajes guardados aún</p>';
            return;
        }
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const mensajeDiv = document.createElement('div');
            mensajeDiv.className = 'bg-white p-3 rounded shadow-sm';
            mensajeDiv.innerHTML = `
                <p class="${data.color || 'text-gray-700'} font-medium">${data.texto}</p>
                <p class="text-xs text-gray-400 mt-1">${new Date(data.timestamp).toLocaleString('es-ES')}</p>
            `;
            mensajesGuardados.appendChild(mensajeDiv);
        });
        
        console.log(`📝 ${querySnapshot.size} mensajes cargados`);
    } catch (error) {
        console.error('Error al cargar mensajes:', error);
        mensajesGuardados.innerHTML = '<p class="text-red-500 text-sm">Error al cargar mensajes</p>';
    }
}

// Botón para recargar mensajes manualmente
btnCargarMensajes.addEventListener('click', cargarMensajes);
