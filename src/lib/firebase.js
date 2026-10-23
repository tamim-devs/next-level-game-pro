import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

const firebaseApp = isFirebaseConfigured
  ? getApps().length
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const googleProvider = new GoogleAuthProvider();

export function getFirebaseAuthErrorMessage(error) {
  const messages = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/account-exists-with-different-credential":
      "An account with this email uses another sign-in method. Try that method instead.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/operation-not-allowed":
      "This sign-in method is disabled. Enable it in Firebase Authentication settings.",
    "auth/popup-blocked": "Allow popups for this site, then try Google sign-in again.",
    "auth/popup-closed-by-user": "The Google sign-in window was closed before finishing.",
    "auth/too-many-requests": "Too many attempts. Wait a little and try again.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account was found for this email.",
    "auth/weak-password": "Choose a stronger password with at least 8 characters.",
    "auth/wrong-password": "Incorrect email or password.",
    "auth/network-request-failed": "Network error. Check your connection and try again.",
  };

  return messages[error?.code] ?? "Authentication failed. Please try again.";
}
