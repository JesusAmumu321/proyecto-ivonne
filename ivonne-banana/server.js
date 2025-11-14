const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5201;

// Middleware para servir archivos estáticos
app.use(express.static('public'));
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Ruta de estadísticas
app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Página de pruebas de API
app.get('/test-api', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'test-api.html'));
});

// Ruta para crear tareas
app.get('/create-tasks', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'create-tasks.html'));
});

// Endpoint de prueba para crear usuario con datos completos
app.post('/api/test-user', (req, res) => {
    // Datos de prueba para el usuario
    const testUser = {
        // Datos personales
        datos: {
            nombreUsuario: req.body.nombreUsuario || "usuario_prueba",
            edad: req.body.edad || 25,
            correoElectronico: req.body.correoElectronico || "test@example.com"
        },
        // Estadísticas de juego
        estadisticas: {
            experiencia: req.body.experiencia || 425,
            diamantes: req.body.diamantes || 59,
            monedas: req.body.monedas || 145,
            nivel: req.body.nivel || 12
        },
        // Gestión de tareas
        tareas: {
            pendientes: req.body.pendientes || 3,
            enProceso: req.body.enProceso || 2,
            terminadas: req.body.terminadas || 47,
            total: function () {
                return this.pendientes + this.enProceso + this.terminadas;
            }
        },
        // Metadatos
        fechaCreacion: new Date().toISOString(),
        ultimaActualizacion: new Date().toISOString()
    };

    // Calcular total de tareas
    testUser.tareas.total = testUser.tareas.pendientes + testUser.tareas.enProceso + testUser.tareas.terminadas;

    res.json({
        success: true,
        message: 'Usuario de prueba creado exitosamente',
        usuario: testUser
    });
});

// Endpoint para obtener datos del usuario
app.get('/api/user/:id?', (req, res) => {
    const userId = req.params.id || 'default';

    // Simulando datos desde una base de datos
    const userData = {
        id: userId,
        datos: {
            nombreUsuario: "JuanPerez2024",
            edad: 28,
            correoElectronico: "juan.perez@email.com"
        },
        estadisticas: {
            experiencia: 1250,
            diamantes: 89,
            monedas: 320,
            nivel: 18
        },
        tareas: {
            pendientes: 5,
            enProceso: 3,
            terminadas: 67,
            total: 75
        },
        fechaCreacion: "2024-01-15T10:30:00.000Z",
        ultimaActualizacion: new Date().toISOString()
    };

    res.json({
        success: true,
        usuario: userData
    });
});

// Endpoint para actualizar datos del usuario
app.put('/api/user/:id', (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;

    // Simular actualización en base de datos
    const updatedUser = {
        id: userId,
        datos: {
            nombreUsuario: updateData.nombreUsuario || "usuario_actualizado",
            edad: updateData.edad || 30,
            correoElectronico: updateData.correoElectronico || "actualizado@email.com"
        },
        estadisticas: {
            experiencia: updateData.experiencia || 0,
            diamantes: updateData.diamantes || 0,
            monedas: updateData.monedas || 0,
            nivel: updateData.nivel || 1
        },
        tareas: {
            pendientes: updateData.pendientes || 0,
            enProceso: updateData.enProceso || 0,
            terminadas: updateData.terminadas || 0,
            total: (updateData.pendientes || 0) + (updateData.enProceso || 0) + (updateData.terminadas || 0)
        },
        ultimaActualizacion: new Date().toISOString()
    };

    res.json({
        success: true,
        message: 'Usuario actualizado exitosamente',
        usuario: updatedUser
    });
});



app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
