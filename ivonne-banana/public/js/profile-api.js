// API para manejo de perfil de usuario
class ProfileAPI {
    constructor() {
        this.baseURL = window.location.origin;
        this.currentUserId = 'default';
    }

    // Obtener datos del usuario
    async getUserData(userId = this.currentUserId) {
        try {
            const response = await fetch(`${this.baseURL}/api/user/${userId}`);
            const data = await response.json();
            
            if (data.success) {
                return data.usuario;
            } else {
                throw new Error('Error al obtener datos del usuario');
            }
        } catch (error) {
            console.error('Error en getUserData:', error);
            return this.getDefaultUserData();
        }
    }

    // Crear usuario de prueba
    async createTestUser(testData = {}) {
        try {
            const response = await fetch(`${this.baseURL}/api/test-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('✅ Usuario de prueba creado:', data.usuario);
                return data.usuario;
            } else {
                throw new Error('Error al crear usuario de prueba');
            }
        } catch (error) {
            console.error('Error en createTestUser:', error);
            return null;
        }
    }

    // Actualizar datos del usuario
    async updateUserData(userId, updateData) {
        try {
            const response = await fetch(`${this.baseURL}/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                console.log('✅ Usuario actualizado:', data.usuario);
                return data.usuario;
            } else {
                throw new Error('Error al actualizar usuario');
            }
        } catch (error) {
            console.error('Error en updateUserData:', error);
            return null;
        }
    }

    // Datos por defecto si no hay conexión
    getDefaultUserData() {
        return {
            id: 'default',
            datos: {
                nombreUsuario: '',
                edad: '',
                correoElectronico: ''
            },
            estadisticas: {
                experiencia: 0,
                diamantes: 0,
                monedas: 0,
                nivel: 1
            },
            tareas: {
                pendientes: 0,
                enProceso: 0,
                terminadas: 0,
                total: 0
            }
        };
    }

    // Generar datos de prueba aleatorios
    generateTestData() {
        const nombres = ['Ana', 'Carlos', 'María', 'José', 'Laura', 'Pedro', 'Sofia', 'Miguel'];
        const dominios = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com'];
        
        const nombre = nombres[Math.floor(Math.random() * nombres.length)];
        const edad = Math.floor(Math.random() * 40) + 18;
        const email = `${nombre.toLowerCase()}${Math.floor(Math.random() * 1000)}@${dominios[Math.floor(Math.random() * dominios.length)]}`;
        
        return {
            nombreUsuario: `${nombre}_${Math.floor(Math.random() * 9999)}`,
            edad: edad,
            correoElectronico: email,
            experiencia: Math.floor(Math.random() * 2000),
            diamantes: Math.floor(Math.random() * 100),
            monedas: Math.floor(Math.random() * 500),
            nivel: Math.floor(Math.random() * 25) + 1,
            pendientes: Math.floor(Math.random() * 10),
            enProceso: Math.floor(Math.random() * 5),
            terminadas: Math.floor(Math.random() * 100)
        };
    }
}

// Crear instancia global
window.profileAPI = new ProfileAPI();

// Funciones auxiliares para el perfil
async function loadProfileData() {
    const userData = await window.profileAPI.getUserData();
    updateProfileUI(userData);
    return userData;
}

function updateProfileUI(userData) {
    // Actualizar datos personales
    const usernameDisplay = document.getElementById('usernameDisplay');
    const ageDisplay = document.getElementById('ageDisplay');
    const emailDisplay = document.getElementById('emailDisplay');
    
    if (usernameDisplay) {
        usernameDisplay.textContent = userData.datos.nombreUsuario || 'No especificado';
    }
    if (ageDisplay) {
        ageDisplay.textContent = userData.datos.edad || 'No especificado';
    }
    if (emailDisplay) {
        emailDisplay.textContent = userData.datos.correoElectronico || 'No especificado';
    }

    // Actualizar estadísticas
    const experienceElement = document.getElementById('experience');
    const diamondsElement = document.getElementById('diamonds');
    const coinsElement = document.getElementById('coins');
    const levelElement = document.getElementById('level');
    
    if (experienceElement) experienceElement.textContent = userData.estadisticas.experiencia;
    if (diamondsElement) diamondsElement.textContent = userData.estadisticas.diamantes;
    if (coinsElement) coinsElement.textContent = userData.estadisticas.monedas;
    if (levelElement) levelElement.textContent = userData.estadisticas.nivel;

    // Actualizar tareas
    const pendingTasksElement = document.getElementById('pendingTasks');
    const inProgressTasksElement = document.getElementById('inProgressTasks');
    const completedTasksElement = document.getElementById('completedTasks');
    const totalTasksElement = document.getElementById('totalTasks');
    
    if (pendingTasksElement) pendingTasksElement.textContent = userData.tareas.pendientes;
    if (inProgressTasksElement) inProgressTasksElement.textContent = userData.tareas.enProceso;
    if (completedTasksElement) completedTasksElement.textContent = userData.tareas.terminadas;
    if (totalTasksElement) totalTasksElement.textContent = userData.tareas.total;

    console.log('🎯 Datos del perfil actualizados:', userData);
}

async function createTestUserProfile() {
    const testData = window.profileAPI.generateTestData();
    const newUser = await window.profileAPI.createTestUser(testData);
    
    if (newUser) {
        updateProfileUI(newUser);
        showNotification('¡Usuario de prueba creado exitosamente!', 'success');
        return newUser;
    } else {
        showNotification('Error al crear usuario de prueba', 'error');
        return null;
    }
}

function showNotification(message, type = 'info') {
    // Crear o actualizar notificación
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 transition-all duration-300`;
        document.body.appendChild(notification);
    }

    // Establecer color según tipo
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-medium z-50 transition-all duration-300`;
    
    if (type === 'success') {
        notification.className += ' bg-green-500';
    } else if (type === 'error') {
        notification.className += ' bg-red-500';
    } else {
        notification.className += ' bg-blue-500';
    }

    notification.textContent = message;
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';

    // Auto-ocultar después de 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
    }, 3000);
}

// Exportar para uso global
window.loadProfileData = loadProfileData;
window.updateProfileUI = updateProfileUI;
window.createTestUserProfile = createTestUserProfile;
window.showNotification = showNotification;

console.log('🔌 Profile API inicializada correctamente');
