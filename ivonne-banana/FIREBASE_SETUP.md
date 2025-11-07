# 🔥 Guía de Configuración de Firebase

## Pasos para configurar Firebase en tu proyecto

### 1. Crear un proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Escribe el nombre de tu proyecto: `ivonne-banana` (o el que prefieras)
4. (Opcional) Puedes deshabilitar Google Analytics si no lo necesitas
5. Haz clic en **"Crear proyecto"**
6. Espera a que se cree el proyecto y haz clic en **"Continuar"**

### 2. Registrar tu aplicación web

1. En la página principal de tu proyecto, haz clic en el ícono **</>** (Web)
2. Dale un nombre a tu app: `ivonne-banana-web`
3. **NO** marques "Firebase Hosting" por ahora
4. Haz clic en **"Registrar app"**

### 3. Obtener las credenciales de configuración

Después de registrar la app, verás un código similar a este:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB1234567890abcdefghijklmnop",
  authDomain: "ivonne-banana.firebaseapp.com",
  projectId: "ivonne-banana",
  storageBucket: "ivonne-banana.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

**COPIA ESTOS VALORES** - Los necesitarás en el siguiente paso.

### 4. Configurar Firestore Database

1. En el menú lateral izquierdo, ve a **"Compilación"** → **"Firestore Database"**
2. Haz clic en **"Crear base de datos"**
3. Selecciona **"Comenzar en modo de prueba"** (para desarrollo)
   - Esto permite leer/escribir sin autenticación compleja inicialmente
4. Selecciona una ubicación (elige la más cercana, por ejemplo: `us-central` o `southamerica-east1`)
5. Haz clic en **"Habilitar"**

**IMPORTANTE - Reglas de seguridad para desarrollo:**
Ve a la pestaña **"Reglas"** y asegúrate de tener algo como esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

⚠️ **ADVERTENCIA:** Estas reglas son solo para desarrollo. Para producción, implementa reglas más estrictas.

### 5. Habilitar autenticación anónima

1. En el menú lateral, ve a **"Compilación"** → **"Authentication"**
2. Haz clic en **"Comenzar"** o **"Get started"**
3. Ve a la pestaña **"Sign-in method"**
4. Haz clic en **"Anónimo"** (Anonymous)
5. Activa el interruptor para **"Habilitar"**
6. Guarda los cambios

### 6. Actualizar el código con tus credenciales

Abre el archivo `public/js/firebase-config.js` y reemplaza los valores de ejemplo con los que copiaste:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",              // ← Pega aquí tu apiKey
    authDomain: "tu-proyecto.firebaseapp.com",  // ← Pega aquí tu authDomain
    projectId: "tu-proyecto-id",            // ← Pega aquí tu projectId
    storageBucket: "tu-proyecto.appspot.com", // ← Pega aquí tu storageBucket
    messagingSenderId: "123456789",         // ← Pega aquí tu messagingSenderId
    appId: "1:123456789:web:abcdef123456"   // ← Pega aquí tu appId
};
```

### 7. Probar la conexión

1. Guarda todos los archivos
2. Asegúrate de que el servidor esté corriendo: `npm start`
3. Abre tu navegador en `http://localhost:3000`
4. Deberías ver:
   - ✓ Conectado a Firebase (en verde)
   - Un ID de usuario anónimo

### 8. Probar Firestore

1. Haz clic en el botón **"Saludar"** para generar un mensaje
2. Haz clic en **"💾 Guardar en Firebase"**
3. Deberías ver "✓ Guardado en Firebase!"
4. El mensaje aparecerá en la sección de "Mensajes guardados"

### 9. Verificar en Firebase Console

1. Ve a Firebase Console → Firestore Database
2. Deberías ver una colección llamada `mensajes`
3. Dentro verás los documentos que has guardado con:
   - `texto`: El mensaje
   - `timestamp`: Fecha y hora
   - `color`: Clase de color de Tailwind

## 🔒 Seguridad para Producción

Cuando vayas a producción, actualiza las reglas de Firestore:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /mensajes/{messageId} {
      // Permitir lectura a todos
      allow read: if true;
      
      // Permitir escritura solo a usuarios autenticados
      allow create: if request.auth != null;
      
      // Permitir actualizar/eliminar solo al creador
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## 📚 Recursos adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

## ❓ Solución de problemas

**Error: "Firebase: Error (auth/configuration-not-found)"**
- Verifica que hayas habilitado Authentication en Firebase Console
- Asegúrate de haber activado el método de autenticación anónima

**Error: "Missing or insufficient permissions"**
- Ve a Firestore → Reglas
- Asegúrate de que las reglas permitan lectura/escritura en modo de prueba

**No se guardan los mensajes**
- Abre la consola del navegador (F12) y busca errores
- Verifica que las credenciales en `firebase-config.js` sean correctas
- Confirma que Firestore Database esté creada y habilitada

---

¡Listo! Ahora tienes Firebase completamente integrado en tu proyecto 🔥🍌
