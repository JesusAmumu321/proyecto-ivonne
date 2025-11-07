# 🍌 Proyecto Ivonne Banana

Proyecto web con HTML, Tailwind CSS, JavaScript, servidor Express y Firebase 🔥

## 📋 Requisitos

- Node.js (versión 14 o superior)
- npm (viene con Node.js)
- Cuenta de Firebase (gratis)

## 🚀 Instalación

```bash
# Las dependencias ya están instaladas, pero si necesitas reinstalarlas:
npm install
```

## 🔥 Configurar Firebase

**¡IMPORTANTE!** Antes de ejecutar el proyecto, debes configurar Firebase:

1. Lee la guía completa en: **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**
2. Crea tu proyecto en [Firebase Console](https://console.firebase.google.com/)
3. Copia tus credenciales y actualiza `public/js/firebase-config.js`
4. Habilita Firestore Database y Authentication (Anonymous)

Ver guía paso a paso: **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** 📖

## 🎨 Compilar Tailwind CSS

```bash
# Compilar una vez
npm run build:css

# O modo watch (recompila automáticamente al hacer cambios)
npm run watch:css
```

## 🖥️ Iniciar el servidor

```bash
# Iniciar servidor Express
npm start

# O usar el comando dev
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

## 📁 Estructura del Proyecto

```
ivonne-banana/
├── public/                 # Archivos públicos
│   ├── index.html         # Página principal
│   ├── js/
│   │   ├── app.js         # JavaScript principal
│   │   └── firebase-config.js  # Configuración de Firebase
│   └── styles/
│       └── output.css     # CSS compilado de Tailwind
├── src/
│   └── input.css          # CSS fuente de Tailwind
├── server.js              # Servidor Express
├── tailwind.config.js     # Configuración de Tailwind
├── FIREBASE_SETUP.md      # 🔥 Guía de configuración de Firebase
├── .env.example           # Ejemplo de variables de entorno
└── package.json           # Dependencias y scripts
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura de la página
- **Tailwind CSS**: Framework de estilos utility-first
- **JavaScript ES6+**: Interactividad del frontend (módulos ES6)
- **Express.js**: Servidor web backend
- **Node.js**: Entorno de ejecución
- **Firebase**: Backend as a Service
  - **Firestore**: Base de datos NoSQL en tiempo real
  - **Firebase Auth**: Autenticación de usuarios

## 📡 API Endpoints

- `GET /` - Página principal
- `GET /api/status` - Estado del servidor
- `GET /api/saludo/:nombre` - Saludo personalizado

## 👥 Páginas del Sistema de Usuarios

- `/registro.html` - Formulario de registro de usuarios
- `/usuarios.html` - Lista de usuarios registrados
- `/index.html` - Página principal con acceso a todo

Ver documentación completa: **[USUARIOS_SISTEMA.md](./USUARIOS_SISTEMA.md)**

## 🎯 Características

- ✅ Diseño responsive con Tailwind CSS
- ✅ Servidor Express funcional
- ✅ JavaScript interactivo con módulos ES6
- ✅ API REST básica
- ✅ Verificación de estado del servidor en tiempo real
- ✅ 🔥 Integración completa con Firebase
- ✅ Base de datos Firestore para guardar mensajes
- ✅ Autenticación anónima de usuarios
- ✅ Actualizaciones en tiempo real
- ✅ 👥 **Sistema completo de usuarios con:**
  - Registro con validación
  - Autenticación con correo y contraseña
  - Almacenamiento en Firestore
  - Lista visual de usuarios
  - Perfil completo (nombre, apellido, correo, edad, descripción)

## 📝 Comandos Disponibles

- `npm start` - Inicia el servidor
- `npm run dev` - Inicia el servidor en modo desarrollo
- `npm run build:css` - Compila Tailwind CSS una vez
- `npm run watch:css` - Compila Tailwind CSS en modo watch

## 🎨 Personalización

Para modificar los estilos de Tailwind, edita:
- `tailwind.config.js` - Configuración de Tailwind
- `src/input.css` - Estilos personalizados

Después de hacer cambios, ejecuta `npm run build:css` para recompilar.

## 🤝 Autor

Proyecto Ivonne - Jesus-work

---

¡Disfruta desarrollando! 🚀
