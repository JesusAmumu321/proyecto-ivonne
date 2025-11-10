# 🚀 Inicio Rápido - Firebase

## ⚡ Pasos Rápidos (5 minutos)

### 1️⃣ Ir a Firebase Console
👉 https://console.firebase.google.com/

### 2️⃣ Crear Proyecto
- Click en "Agregar proyecto"
- Nombre: `ivonne-banana`
- Continuar hasta completar

### 3️⃣ Agregar App Web
- Click en el ícono `</>`
- Nombre: `ivonne-banana-web`
- Registrar app
- **COPIAR las credenciales que aparecen**

### 4️⃣ Habilitar Firestore
- Menú lateral: "Firestore Database"
- "Crear base de datos"
- Modo: **"Comenzar en modo de prueba"**
- Ubicación: La más cercana
- Habilitar

### 5️⃣ Habilitar Auth
- Menú lateral: "Authentication"
- "Comenzar"
- Pestaña "Sign-in method"
- Click en "Anónimo"
- **Habilitar** el switch
- Guardar

### 6️⃣ Actualizar Código
Abre: `public/js/firebase-config.js`

Reemplaza esto:
```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY_AQUI",  // ← Pega tus valores aquí
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

Con tus valores copiados del paso 3.

### 7️⃣ ¡Probar!
```bash
npm start
```

Abre: http://localhost:3000

Deberías ver:
- ✅ "✓ Conectado a Firebase" en verde
- ✅ Un ID de usuario
- ✅ Botones funcionales

---

## 🧪 Prueba Rápida

1. Click en **"Saludar"** → aparece mensaje
2. Click en **"💾 Guardar en Firebase"** → guarda
3. Mensaje aparece en "Mensajes guardados"
4. Ve a Firebase Console → Firestore → Verás tu colección "mensajes"

---

## 📖 Guía Completa
Para más detalles: **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)**

## ❓ Problemas
- **No conecta**: Revisa las credenciales en `firebase-config.js`
- **No guarda**: Verifica que Firestore esté habilitado en modo prueba
- **Error Auth**: Asegúrate de habilitar autenticación anónima

---

**¡Listo en 5 minutos! 🎉**
