// Funciones para gestionar usuarios en Firebase
import { db, auth, collection, addDoc, getDocs, doc, updateDoc, query, where } from './firebase-config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

console.log('👥 Módulo de usuarios cargado');

// Registrar un nuevo usuario
export async function registrarUsuario(datosUsuario) {
    try {
        // Validaciones básicas
        if (!datosUsuario.nombre || !datosUsuario.apellido) {
            throw new Error('Nombre y apellido son obligatorios');
        }
        
        if (!datosUsuario.correo || !datosUsuario.password) {
            throw new Error('Correo y contraseña son obligatorios');
        }
        
        if (!datosUsuario.edad || datosUsuario.edad < 1) {
            throw new Error('Edad debe ser un número válido');
        }
        
        if (datosUsuario.password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres');
        }
        
        // Crear usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
            auth, 
            datosUsuario.correo, 
            datosUsuario.password
        );
        
        const user = userCredential.user;
        console.log('✓ Usuario autenticado creado:', user.uid);
        
        // Guardar información adicional en Firestore
        const usuarioData = {
            uid: user.uid,
            nombre: datosUsuario.nombre.trim(),
            apellido: datosUsuario.apellido.trim(),
            correo: datosUsuario.correo.toLowerCase().trim(),
            edad: parseInt(datosUsuario.edad),
            descripcionPersonal: datosUsuario.descripcionPersonal?.trim() || '',
            fechaRegistro: new Date().toISOString(),
            activo: true
        };
        
        // Guardar en la colección 'usuarios'
        const docRef = await addDoc(collection(db, 'usuarios'), usuarioData);
        console.log('✓ Usuario guardado en Firestore:', docRef.id);
        
        return {
            success: true,
            uid: user.uid,
            docId: docRef.id,
            mensaje: 'Usuario registrado exitosamente'
        };
        
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        
        // Mensajes de error en español
        let mensajeError = error.message;
        
        if (error.code === 'auth/email-already-in-use') {
            mensajeError = 'Este correo ya está registrado';
        } else if (error.code === 'auth/invalid-email') {
            mensajeError = 'El correo no es válido';
        } else if (error.code === 'auth/weak-password') {
            mensajeError = 'La contraseña es muy débil';
        }
        
        return {
            success: false,
            error: mensajeError
        };
    }
}

// Iniciar sesión
export async function iniciarSesion(correo, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, correo, password);
        console.log('✓ Sesión iniciada:', userCredential.user.uid);
        
        return {
            success: true,
            uid: userCredential.user.uid,
            mensaje: 'Sesión iniciada correctamente'
        };
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        
        let mensajeError = error.message;
        
        if (error.code === 'auth/user-not-found') {
            mensajeError = 'Usuario no encontrado';
        } else if (error.code === 'auth/wrong-password') {
            mensajeError = 'Contraseña incorrecta';
        } else if (error.code === 'auth/invalid-email') {
            mensajeError = 'Correo inválido';
        }
        
        return {
            success: false,
            error: mensajeError
        };
    }
}

// Cerrar sesión
export async function cerrarSesion() {
    try {
        await signOut(auth);
        console.log('✓ Sesión cerrada');
        return { success: true };
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return { success: false, error: error.message };
    }
}

// Obtener todos los usuarios
export async function obtenerUsuarios() {
    try {
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        const usuarios = [];
        
        querySnapshot.forEach((doc) => {
            usuarios.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        console.log(`📋 ${usuarios.length} usuarios obtenidos`);
        return usuarios;
        
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        return [];
    }
}

// Buscar usuario por correo
export async function buscarUsuarioPorCorreo(correo) {
    try {
        const q = query(
            collection(db, 'usuarios'), 
            where('correo', '==', correo.toLowerCase().trim())
        );
        
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return null;
        }
        
        const doc = querySnapshot.docs[0];
        return {
            id: doc.id,
            ...doc.data()
        };
        
    } catch (error) {
        console.error('Error al buscar usuario:', error);
        return null;
    }
}

// Actualizar perfil de usuario
export async function actualizarPerfil(userId, datosActualizar) {
    try {
        const usuarioRef = doc(db, 'usuarios', userId);
        await updateDoc(usuarioRef, {
            ...datosActualizar,
            fechaActualizacion: new Date().toISOString()
        });
        
        console.log('✓ Perfil actualizado');
        return { success: true };
        
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        return { success: false, error: error.message };
    }
}
