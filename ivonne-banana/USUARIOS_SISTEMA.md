# 👥 Sistema de Usuarios - Documentación

## 📋 Estructura de la Colección `usuarios`

La colección `usuarios` en Firestore contiene los siguientes campos:

### Campos Obligatorios:

| Campo | Tipo | Descripción | Validación |
|-------|------|-------------|------------|
| `uid` | string | ID único de Firebase Authentication | Generado automáticamente |
| `nombre` | string | Nombre del usuario | Requerido, no vacío |
| `apellido` | string | Apellido del usuario | Requerido, no vacío |
| `correo` | string | Correo electrónico | Formato email válido, único |
| `edad` | number | Edad del usuario | 1-120 años |
| `fechaRegistro` | string | Fecha de registro (ISO 8601) | Generado automáticamente |
| `activo` | boolean | Estado del usuario | true por defecto |

### Campos Opcionales:

| Campo | Tipo | Descripción | Validación |
|-------|------|-------------|------------|
| `descripcionPersonal` | string | Biografía del usuario | Máximo 500 caracteres |
| `fechaActualizacion` | string | Última actualización | ISO 8601 |

## 📁 Archivos del Sistema

```
public/
├── registro.html           # Formulario de registro
├── usuarios.html           # Lista de usuarios
├── js/
│   ├── usuarios.js        # Funciones CRUD de usuarios
│   ├── registro.js        # Lógica del formulario
│   └── lista-usuarios.js  # Lógica para mostrar usuarios
```

## 🔧 Funciones Disponibles

### `usuarios.js`

#### `registrarUsuario(datosUsuario)`
Registra un nuevo usuario en Firebase Authentication y Firestore.

**Parámetros:**
```javascript
{
    nombre: string,          // Requerido
    apellido: string,        // Requerido
    correo: string,          // Requerido, formato email
    password: string,        // Requerido, mínimo 6 caracteres
    edad: number,            // Requerido, 1-120
    descripcionPersonal: string  // Opcional
}
```

**Retorna:**
```javascript
{
    success: boolean,
    uid: string,            // Si success = true
    docId: string,          // ID del documento en Firestore
    mensaje: string,        // Mensaje de éxito
    error: string           // Si success = false
}
```

**Ejemplo:**
```javascript
import { registrarUsuario } from './usuarios.js';

const resultado = await registrarUsuario({
    nombre: 'Juan',
    apellido: 'Pérez',
    correo: 'juan@ejemplo.com',
    password: 'password123',
    edad: 25,
    descripcionPersonal: 'Desarrollador web apasionado'
});

if (resultado.success) {
    console.log('Usuario registrado:', resultado.uid);
}
```

#### `iniciarSesion(correo, password)`
Inicia sesión con correo y contraseña.

**Retorna:**
```javascript
{
    success: boolean,
    uid: string,
    mensaje: string,
    error: string
}
```

#### `cerrarSesion()`
Cierra la sesión actual.

#### `obtenerUsuarios()`
Obtiene todos los usuarios de la colección.

**Retorna:** Array de objetos usuario.

#### `buscarUsuarioPorCorreo(correo)`
Busca un usuario por su correo electrónico.

**Retorna:** Objeto usuario o `null` si no existe.

#### `actualizarPerfil(userId, datosActualizar)`
Actualiza los datos de un usuario.

## 🎨 Páginas del Sistema

### 1. Registro de Usuarios (`/registro.html`)

**Funcionalidades:**
- ✅ Formulario con validación en tiempo real
- ✅ Contador de caracteres para descripción
- ✅ Validación de contraseñas coincidentes
- ✅ Validación de formato de email
- ✅ Mensajes de error claros en español
- ✅ Redirección automática tras registro exitoso

**Validaciones:**
- Todos los campos obligatorios deben estar llenos
- Correo debe tener formato válido
- Contraseña mínimo 6 caracteres
- Ambas contraseñas deben coincidir
- Edad entre 1 y 120 años
- Descripción máximo 500 caracteres

### 2. Lista de Usuarios (`/usuarios.html`)

**Funcionalidades:**
- ✅ Muestra todos los usuarios registrados
- ✅ Tarjetas con diseño atractivo y colores variados
- ✅ Avatar con iniciales
- ✅ Información completa del usuario
- ✅ Ordenamiento por fecha de registro
- ✅ Botón de recarga
- ✅ Contador total de usuarios
- ✅ Indicador de estado activo

## 🔐 Configuración de Seguridad en Firebase

### Habilitar Email/Password Authentication

1. Ve a Firebase Console
2. Authentication → Sign-in method
3. Habilita **"Correo electrónico/contraseña"**
4. Guarda los cambios

### Reglas de Firestore para Usuarios

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Colección de mensajes (desarrollo)
    match /mensajes/{messageId} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
    
    // Colección de usuarios
    match /usuarios/{userId} {
      // Cualquiera puede leer (para la lista pública)
      allow read: if true;
      
      // Solo usuarios autenticados pueden crear
      allow create: if request.auth != null 
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.nombre is string
                    && request.resource.data.apellido is string
                    && request.resource.data.correo is string
                    && request.resource.data.edad is number
                    && request.resource.data.edad > 0
                    && request.resource.data.edad <= 120;
      
      // Solo el dueño puede actualizar su perfil
      allow update: if request.auth != null 
                    && resource.data.uid == request.auth.uid;
      
      // Solo el dueño puede eliminar su perfil
      allow delete: if request.auth != null 
                    && resource.data.uid == request.auth.uid;
    }
  }
}
```

### Reglas de Seguridad para Producción (Más Estrictas)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /usuarios/{userId} {
      // Solo usuarios autenticados pueden leer
      allow read: if request.auth != null;
      
      // Validación completa al crear
      allow create: if request.auth != null 
                    && request.resource.data.uid == request.auth.uid
                    && request.resource.data.nombre.size() > 0
                    && request.resource.data.apellido.size() > 0
                    && request.resource.data.correo.matches('.*@.*\\..*')
                    && request.resource.data.edad >= 13  // COPPA compliance
                    && request.resource.data.edad <= 120
                    && (!request.resource.data.keys().hasAny(['descripcionPersonal']) 
                        || request.resource.data.descripcionPersonal.size() <= 500);
      
      // Solo actualizar campos permitidos
      allow update: if request.auth != null 
                    && resource.data.uid == request.auth.uid
                    && !request.resource.data.diff(resource.data).affectedKeys().hasAny(['uid', 'correo', 'fechaRegistro']);
      
      allow delete: if request.auth != null 
                    && resource.data.uid == request.auth.uid;
    }
  }
}
```

## 🧪 Ejemplos de Uso

### Registrar un usuario desde consola del navegador

```javascript
import { registrarUsuario } from '/js/usuarios.js';

const resultado = await registrarUsuario({
    nombre: 'María',
    apellido: 'González',
    correo: 'maria@ejemplo.com',
    password: 'password123',
    edad: 28,
    descripcionPersonal: 'Me encanta programar en JavaScript'
});

console.log(resultado);
```

### Obtener todos los usuarios

```javascript
import { obtenerUsuarios } from '/js/usuarios.js';

const usuarios = await obtenerUsuarios();
console.log(`Total de usuarios: ${usuarios.length}`);
usuarios.forEach(u => {
    console.log(`${u.nombre} ${u.apellido} - ${u.correo}`);
});
```

### Buscar un usuario por correo

```javascript
import { buscarUsuarioPorCorreo } from '/js/usuarios.js';

const usuario = await buscarUsuarioPorCorreo('juan@ejemplo.com');
if (usuario) {
    console.log('Usuario encontrado:', usuario);
} else {
    console.log('Usuario no encontrado');
}
```

## 🎯 Características del Sistema

✅ **Registro completo** con todos los campos requeridos  
✅ **Validación robusta** del lado del cliente  
✅ **Autenticación de Firebase** integrada  
✅ **Almacenamiento en Firestore** para datos adicionales  
✅ **Interfaz moderna** con Tailwind CSS  
✅ **Mensajes de error** claros en español  
✅ **Responsive design** funciona en móviles  
✅ **Estado en tiempo real** de Firebase  
✅ **Lista visual atractiva** de usuarios  
✅ **Ordenamiento** por fecha de registro  

## 📱 Navegación del Sistema

```
Página Principal (/)
    ↓
    ├─→ Registrar Usuario (/registro.html)
    │       ↓ (después de registro exitoso)
    │       └─→ Volver a Principal (/)
    │
    └─→ Ver Usuarios (/usuarios.html)
            ↓
            ├─→ Nuevo Usuario (/registro.html)
            └─→ Inicio (/)
```

## 🚀 Próximas Mejoras Sugeridas

- [ ] Página de login separada
- [ ] Editar perfil propio
- [ ] Cambiar contraseña
- [ ] Recuperar contraseña
- [ ] Subir foto de perfil
- [ ] Buscar/filtrar usuarios
- [ ] Paginación de usuarios
- [ ] Roles y permisos
- [ ] Eliminar cuenta
- [ ] Dashboard de usuario

---

**¡Sistema de usuarios completamente funcional!** 👥🔥
