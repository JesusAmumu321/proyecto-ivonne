// Configuración de Firebase
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto Firebase

const firebaseConfig = {
  apiKey: "AIzaSyD3gG3qM5A1tow777bsfZ1jJd5zmJrkQq0",
  authDomain: "yourtime-proyecto-escuela.firebaseapp.com",
  projectId: "yourtime-proyecto-escuela",
  storageBucket: "yourtime-proyecto-escuela.firebasestorage.app",
  messagingSenderId: "666837926457",
  appId: "1:666837926457:web:617ebfbaa7dd46b20a83e8",
};

// Inicializar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Inicializar la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);

console.log("🔥 Firebase inicializado correctamente");

// Exportar para usar en otros archivos
export {
  db,
  auth,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  signInAnonymously,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};
