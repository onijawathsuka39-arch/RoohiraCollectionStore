/**
 * ROOHIRA COLLECTION - FIREBASE CONFIGURATION & INITIALIZATION
 * Project ID: python-store-7e509
 * Real-time Database & Firestore synchronization
 */

const firebaseConfig = {
  apiKey: "AIzaSyBRVpoxdo0fc_SnPKctaBEuG8H4g7NrphQ",
  authDomain: "python-store-7e509.firebaseapp.com",
  databaseURL: "https://python-store-7e509-default-rtdb.firebaseio.com",
  projectId: "python-store-7e509",
  storageBucket: "python-store-7e509.firebasestorage.app",
  messagingSenderId: "779484643049",
  appId: "1:779484643049:web:0223baeeccc54dd6da7a78"
};

// Initialize Firebase if library is loaded
if (typeof firebase !== "undefined") {
  if (!firebase.apps.length) {
    try {
      firebase.initializeApp(firebaseConfig);
      console.log("Firebase initialized successfully with Roohira Store credentials!");
    } catch (e) {
      console.warn("Firebase initialization notice:", e);
    }
  }
}

// Make config globally accessible
window.roohiraFirebaseConfig = firebaseConfig;
