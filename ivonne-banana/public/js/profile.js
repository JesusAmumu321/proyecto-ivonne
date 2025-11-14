// Profile functionality
let isEditing = false;
let userData = {
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

// Load user data from API or localStorage
async function loadUserData() {
    try {
        // Intentar cargar desde API
        if (window.profileAPI) {
            userData = await window.profileAPI.getUserData();
        } else {
            // Fallback a localStorage
            const savedData = localStorage.getItem('userData');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                // Convertir formato antiguo a nuevo si es necesario
                if (parsed.username) {
                    userData = convertOldFormat(parsed);
                } else {
                    userData = parsed;
                }
            }
        }
    } catch (error) {
        console.error('Error cargando datos:', error);
        // Usar datos por defecto
    }
    
    updateDisplay();
}

// Convert old format to new structure
function convertOldFormat(oldData) {
    return {
        datos: {
            nombreUsuario: oldData.username || '',
            edad: oldData.age || '',
            correoElectronico: oldData.email || ''
        },
        estadisticas: {
            experiencia: oldData.achievements?.experience || 0,
            diamantes: oldData.achievements?.diamonds || 0,
            monedas: oldData.achievements?.coins || 0,
            nivel: 1
        },
        tareas: {
            pendientes: oldData.achievements?.uncompletedTasks || 0,
            enProceso: 0,
            terminadas: oldData.achievements?.completedTasks || 0,
            total: oldData.achievements?.totalTasks || 0
        }
    };
}

// Save user data to localStorage
function saveUserData() {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Update display with current data
function updateDisplay() {
    // Update user info displays
    document.getElementById('usernameDisplay').textContent = userData.datos.nombreUsuario || 'No especificado';
    document.getElementById('ageDisplay').textContent = userData.datos.edad || 'No especificado';
    document.getElementById('emailDisplay').textContent = userData.datos.correoElectronico || 'No especificado';

    // Update statistics
    document.getElementById('experience').textContent = userData.estadisticas.experiencia;
    document.getElementById('diamonds').textContent = userData.estadisticas.diamantes;
    document.getElementById('coins').textContent = userData.estadisticas.monedas;
    
    // Update level if element exists
    const levelElement = document.getElementById('level');
    if (levelElement) {
        levelElement.textContent = userData.estadisticas.nivel;
    }

    // Update tasks
    document.getElementById('pendingTasks').textContent = userData.tareas.pendientes;
    document.getElementById('inProgressTasks').textContent = userData.tareas.enProceso;
    document.getElementById('completedTasks').textContent = userData.tareas.terminadas;
    document.getElementById('totalTasks').textContent = userData.tareas.total;

    // Update input fields
    document.getElementById('usernameInput').value = userData.datos.nombreUsuario;
    document.getElementById('ageInput').value = userData.datos.edad;
    document.getElementById('emailInput').value = userData.datos.correoElectronico;
}

// Toggle edit mode
function toggleEdit() {
    isEditing = !isEditing;
    
    if (isEditing) {
        // Show inputs, hide displays
        document.querySelectorAll('.form-display').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.form-input').forEach(el => el.classList.remove('hidden'));
        document.getElementById('saveBtn').classList.remove('hidden');
    } else {
        // Show displays, hide inputs
        document.querySelectorAll('.form-display').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.form-input').forEach(el => el.classList.add('hidden'));
        document.getElementById('saveBtn').classList.add('hidden');
    }
}

// Save user information
async function saveUserInfo() {
    // Get values from input fields
    const newData = {
        nombreUsuario: document.getElementById('usernameInput').value.trim(),
        edad: document.getElementById('ageInput').value,
        correoElectronico: document.getElementById('emailInput').value.trim()
    };

    // Update userData structure
    userData.datos = { ...userData.datos, ...newData };

    try {
        // Save to API if available
        if (window.profileAPI) {
            const updatedUser = await window.profileAPI.updateUserData('default', userData);
            if (updatedUser) {
                userData = updatedUser;
            }
        }
        
        // Also save to localStorage as backup
        saveUserData();
        
        // Update display
        updateDisplay();
        
        // Exit edit mode
        toggleEdit();
        
        // Show success message
        if (window.showNotification) {
            showNotification('Información guardada correctamente', 'success');
        } else {
            console.log('Información guardada correctamente');
        }
    } catch (error) {
        console.error('Error saving user info:', error);
        if (window.showNotification) {
            showNotification('Error al guardar la información', 'error');
        }
    }
}

// Show notification (simple implementation)
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #5B7257;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update achievements (this could be called from other parts of the app)
function updateAchievements(achievements) {
    userData.achievements = { ...userData.achievements, ...achievements };
    saveUserData();
    updateDisplay();
}

// Simulate some achievements for demo purposes
function simulateAchievements() {
    updateAchievements({
        diamonds: Math.floor(Math.random() * 100),
        coins: Math.floor(Math.random() * 500),
        experience: Math.floor(Math.random() * 1000),
        completedTasks: Math.floor(Math.random() * 50),
        uncompletedTasks: Math.floor(Math.random() * 20),
        totalTasks: function() { 
            return this.completedTasks + this.uncompletedTasks; 
        }()
    });
}

// Add keyboard event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load user data when page loads
    loadUserData();
    
    // Add enter key listener to save form
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && isEditing) {
            saveUserInfo();
        }
        
        if (e.key === 'Escape' && isEditing) {
            toggleEdit();
            updateDisplay(); // Reset to original values
        }
    });
    
    // Simulate some achievements after a short delay for demo
    setTimeout(() => {
        if (userData.achievements.totalTasks === 0) {
            simulateAchievements();
        }
    }, 1000);
});

// Back to home function (if needed)
function goBack() {
    window.location.href = '/';
}

// Export functions for potential use in other scripts
window.profileApp = {
    loadUserData,
    saveUserData,
    updateAchievements,
    toggleEdit,
    saveUserInfo,
    goBack
};
