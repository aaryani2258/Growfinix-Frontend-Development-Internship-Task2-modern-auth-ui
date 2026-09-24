import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDWomnjjbV8nEoMY6_Odtpq22z-rXwl_mk",
  authDomain: "modernauth-75f6e.firebaseapp.com",
  projectId: "modernauth-75f6e",
  storageBucket: "modernauth-75f6e.firebasestorage.app",
  messagingSenderId: "199967763750",
  appId: "1:199967763750:web:bd73725bc2892ec53325e7",
  measurementId: "G-YKZE30K1MX",
};

const app = initializeApp(firebaseConfig);

/* Firebase Authentication */
export const auth = getAuth(app);

/* Firebase Analytics */
export const analytics = getAnalytics(app);

/* Authentication providers */
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

/* Authentication functions */
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithGitHub = () => {
  return signInWithPopup(auth, githubProvider);
};

export const logOut = () => {
  return signOut(auth);
};