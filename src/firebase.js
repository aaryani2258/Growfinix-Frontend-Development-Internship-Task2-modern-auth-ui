import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
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

/* Social authentication providers */
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const githubProvider = new GithubAuthProvider();

/* Google authentication */
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

/* GitHub authentication */
export const signInWithGitHub = () => {
  return signInWithPopup(auth, githubProvider);
};

/* Normal email/password registration */
export const registerWithEmail = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  return userCredential;
};

/* Normal email/password login */
export const loginWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/* Logout */
export const logOut = () => {
  return signOut(auth);
};