# ⚡ Guía Rápida - Sistema de Usuarios

## 🚀 Configuración en 3 Pasos

### 1️⃣ Habilitar Email/Password en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. **Authentication** → **Sign-in method**
4. Click en **"Correo electrónico/contraseña"**
5. **Habilitar** el switch
6. Guardar

### 2️⃣ Actualizar Reglas de Firestore

1. Ve a **Firestore Database** → **Reglas**
2. Copia y pega estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Colección de mensajes
    match /mensajes/{messageId} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
    
    // Colección de usuarios
    match /usuarios/{userId} {
      allow read: if true;  // Cualquiera puede leer
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
      allow update, delete: if request.auth != null && resource.data.uid == request.auth.uid;
    }
  }
}
```

3. **Publicar** las reglas

### 3️⃣ ¡Probar!

```bash
npm start
```

1. Abre: http://localhost:3000
2. Click en **"➕ Registrar Usuario"**
3. Llena el formulario:
   - Nombre: Juan
   - Apellido: Pérez
   - Correo: juan@ejemplo.com
   - Contraseña: 123456
   - Edad: 25
   - Descripción: (opcional)
4. Click en **"🚀 Registrar Usuario"**
5. ✅ ¡Listo! Usuario creado

## 📋 Campos del Usuario

| Campo | Tipo | Obligatorio | Notas |
|-------|------|-------------|-------|
| Nombre | Texto | ✅ Sí | - |
| Apellido | Texto | ✅ Sí | - |
| Correo | Email | ✅ Sí | Debe ser único |
| Contraseña | Texto | ✅ Sí | Mínimo 6 caracteres |
| Edad | Número | ✅ Sí | 1-120 años |
| Descripción | Texto | ❌ No | Máximo 500 caracteres |

## 🎯 Páginas Disponibles

### 1. Registro (`/registro.html`)
- Formulario completo con validación
- Contador de caracteres
- Mensajes de error claros

### 2. Lista de Usuarios (`/usuarios.html`)
- Tarjetas visuales de todos los usuarios
- Avatar con iniciales
- Información completa
- Botón de recarga

### 3. Página Principal (`/index.html`)
- Acceso a registro y lista
- Mensajes de Firebase
- Estado del servidor

## 🔍 Ver en Firebase Console

Después de registrar usuarios:

1. Ve a **Firestore Database**
2. Verás la colección `usuarios`
3. Cada documento tiene:
   - uid (ID de autenticación)
   - nombre
   - apellido
   - correo
   - edad
   - descripcionPersonal
   - fechaRegistro
   - activo

## ❓ Problemas Comunes

**Error: "Este correo ya está registrado"**
- El correo debe ser único
- Usa otro correo diferente

**Error: "La contraseña es muy débil"**
- Debe tener mínimo 6 caracteres
- Usa una contraseña más larga

**Error: "Missing or insufficient permissions"**
- Verifica que hayas actualizado las reglas de Firestore
- Asegúrate de habilitar Email/Password en Authentication

**No aparecen los usuarios**
- Verifica la conexión a Firebase (debe estar verde)
- Abre la consola del navegador (F12) y busca errores
- Recarga la página con el botón "🔄 Recargar"

## 📚 Documentación Completa

Para más detalles: **[USUARIOS_SISTEMA.md](./USUARIOS_SISTEMA.md)**

---

**¡Sistema de usuarios listo en 3 pasos!** 👥✨
