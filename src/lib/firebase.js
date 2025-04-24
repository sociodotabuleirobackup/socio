
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC95CwjjGB4BV57s5lA9pMiTdzkGmlDjnw",
  authDomain: "saas-socio-do-tabuleiro.firebaseapp.com",
  projectId: "saas-socio-do-tabuleiro",
  storageBucket: "saas-socio-do-tabuleiro.firebasestorage.app",
  messagingSenderId: "112299538658",
  appId: "1:112299538658:web:389455123736d9733706bb",
  measurementId: "G-J1ZG9W6230"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google provider to request more information
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
