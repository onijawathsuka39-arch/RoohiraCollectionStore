// Firebase Configuration for Roohira Store
const firebaseConfig = {
    apiKey: "AIzaSyBCiDkYVnK4BTuYvbGuxN_PD8XTVd7hX9k",
    authDomain: "roohira-collection.firebaseapp.com",
    projectId: "roohira-collection",
    storageBucket: "roohira-collection.firebasestorage.app",
    messagingSenderId: "816288596637",
    appId: "1:816288596637:web:f566e57be1f98a0dbe8a74"
};

// Initialize Firebase
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db   = typeof firebase !== 'undefined' ? firebase.firestore() : null;
const auth = typeof firebase !== 'undefined' ? firebase.auth() : null;
const rtdb = typeof firebase !== 'undefined' && firebase.database ? firebase.database() : null;
