import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAscFpzZji301d8MXujLSi87yAbNIQIfxw",
  authDomain: "modern-auth-ai.firebaseapp.com",
  projectId: "modern-auth-ai",
  storageBucket: "modern-auth-ai.firebasestorage.app",
  messagingSenderId: "554867163479",
  appId: "1:554867163479:web:8de50acd4cd0ea221a3e12",
  measurementId: "G-38MB1L209S",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithGitHub = () => {
  return signInWithPopup(auth, githubProvider);
};

export const logOut = () => {
  return signOut(auth);
};