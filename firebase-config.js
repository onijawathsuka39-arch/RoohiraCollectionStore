// Firebase Configuration for Roohira Store
const firebaseConfig = {
    apiKey: "AIzaSyBRVpoxdo0fc_SnPKctaBEuG8H4g7NrphQ",
    authDomain: "python-store-7e509.firebaseapp.com",
    databaseURL: "https://python-store-7e509-default-rtdb.firebaseio.com",
    projectId: "python-store-7e509",
    storageBucket: "python-store-7e509.firebasestorage.app",
    messagingSenderId: "779484643049",
    appId: "1:779484643049:web:0223baeeccc54dd6da7a78"
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db   = typeof firebase !== 'undefined' ? firebase.firestore() : null;
const auth = typeof firebase !== 'undefined' ? firebase.auth() : null;
const rtdb = typeof firebase !== 'undefined' && firebase.database ? firebase.database() : null;
