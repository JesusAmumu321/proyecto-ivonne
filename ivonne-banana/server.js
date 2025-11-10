const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static('public'));
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de estadísticas
app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});


// API de ejemplo
app.get('/api/status', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// API para obtener un saludo personalizado
app.get('/api/saludo/:nombre', (req, res) => {
    const { nombre } = req.params;
    res.json({
        mensaje: `¡Hola ${nombre}! Bienvenido a Ivonne Banana 🍌`
    });
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🍌 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📝 Presiona Ctrl+C para detener el servidor`);
});
