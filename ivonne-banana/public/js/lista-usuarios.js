// JavaScript para mostrar la lista de usuarios
import { auth, onAuthStateChanged } from './firebase-config.js';
import { obtenerUsuarios } from './usuarios.js';

console.log('👥 Página de lista de usuarios cargada');

// Elementos del DOM
const listaUsuarios = document.getElementById('listaUsuarios');
const mensajeCarga = document.getElementById('mensajeCarga');
const mensajeVacio = document.getElementById('mensajeVacio');
const totalUsuarios = document.getElementById('totalUsuarios');
const btnRecargar = document.getElementById('btnRecargar');
const firebaseStatus = document.getElementById('firebaseStatus');

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

// Formatear fecha
function formatearFecha(isoString) {
    const fecha = new Date(isoString);
    return fecha.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Crear tarjeta de usuario
function crearTarjetaUsuario(usuario, index) {
    const colores = [
        'from-purple-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-green-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-500',
        'from-yellow-500 to-orange-500'
    ];
    
    const colorGradiente = colores[index % colores.length];
    
    const div = document.createElement('div');
    div.className = 'bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-102 hover:shadow-2xl';
    
    const iniciales = `${usuario.nombre.charAt(0)}${usuario.apellido.charAt(0)}`.toUpperCase();
    
    div.innerHTML = `
        <div class="flex">
            <!-- Avatar -->
            <div class="w-24 bg-gradient-to-br ${colorGradiente} flex items-center justify-center">
                <span class="text-white text-3xl font-bold">${iniciales}</span>
            </div>
            
            <!-- Información -->
            <div class="flex-1 p-6">
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <h3 class="text-2xl font-bold text-gray-800">
                            ${usuario.nombre} ${usuario.apellido}
                        </h3>
                        <p class="text-gray-600 flex items-center gap-2 mt-1">
                            <span class="text-purple-600">📧</span>
                            ${usuario.correo}
                        </p>
                    </div>
                    <div class="text-right">
                        <span class="inline-block bg-purple-100 text-purple-800 text-sm font-semibold px-3 py-1 rounded-full">
                            ${usuario.edad} años
                        </span>
                    </div>
                </div>
                
                ${usuario.descripcionPersonal ? `
                    <div class="bg-gray-50 rounded-lg p-3 mb-3">
                        <p class="text-gray-700 text-sm italic">
                            "${usuario.descripcionPersonal}"
                        </p>
                    </div>
                ` : ''}
                
                <div class="flex gap-4 text-sm text-gray-500">
                    <div>
                        <span class="font-semibold">📅 Registrado:</span>
                        ${formatearFecha(usuario.fechaRegistro)}
                    </div>
                    <div>
                        <span class="font-semibold">🆔 ID:</span>
                        <code class="bg-gray-100 px-2 py-1 rounded text-xs">${usuario.uid.substring(0, 8)}...</code>
                    </div>
                </div>
                
                ${usuario.activo ? `
                    <div class="mt-3">
                        <span class="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Activo
                        </span>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    return div;
}

// Cargar y mostrar usuarios
async function cargarUsuarios() {
    // Mostrar mensaje de carga
    mensajeCarga.classList.remove('hidden');
    listaUsuarios.innerHTML = '';
    mensajeVacio.classList.add('hidden');
    
    try {
        const usuarios = await obtenerUsuarios();
        
        // Ocultar mensaje de carga
        mensajeCarga.classList.add('hidden');
        
        if (usuarios.length === 0) {
            mensajeVacio.classList.remove('hidden');
            totalUsuarios.textContent = '0';
            return;
        }
        
        // Actualizar contador
        totalUsuarios.textContent = usuarios.length;
        
        // Ordenar por fecha de registro (más recientes primero)
        usuarios.sort((a, b) => {
            return new Date(b.fechaRegistro) - new Date(a.fechaRegistro);
        });
        
        // Crear y agregar tarjetas
        usuarios.forEach((usuario, index) => {
            const tarjeta = crearTarjetaUsuario(usuario, index);
            listaUsuarios.appendChild(tarjeta);
        });
        
        console.log(`✓ ${usuarios.length} usuarios mostrados`);
        
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
        mensajeCarga.classList.add('hidden');
        
        listaUsuarios.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p class="text-red-700 font-semibold mb-2">
                    ✗ Error al cargar usuarios
                </p>
                <p class="text-red-600 text-sm">
                    ${error.message}
                </p>
                <button 
                    onclick="location.reload()"
                    class="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                    Reintentar
                </button>
            </div>
        `;
    }
}

// Botón recargar
btnRecargar.addEventListener('click', () => {
    console.log('🔄 Recargando usuarios...');
    cargarUsuarios();
});

// Cargar usuarios al inicio
console.log('📥 Cargando usuarios...');
cargarUsuarios();
