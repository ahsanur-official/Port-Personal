window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyA4kGtEH8yhiFgGibHX5kHSmJc2k-jaaMc",
  authDomain: "personal-portfolio-f599e.firebaseapp.com",
  databaseURL: "https://personal-portfolio-f599e-default-rtdb.firebaseio.com",
  projectId: "personal-portfolio-f599e",
  storageBucket: "personal-portfolio-f599e.firebasestorage.app",
  messagingSenderId: "214011669595",
  appId: "1:214011669595:web:c13753f44337d12ef1a37e",
  measurementId: "G-P1NT4KZK74"
};

window.initializeFirebaseApp = function() {
  if (typeof window.firebase === "undefined") {
    console.warn("Firebase SDK not loaded yet");
    return false;
  }

  if (typeof firebase.apps === "undefined") {
    console.warn("Firebase apps array not initialized");
    return false;
  }

  if (firebase.apps.length > 0) {
    console.log("Firebase already initialized");
    return true;
  }

  try {
    const config = window.FIREBASE_CONFIG || {};
    firebase.initializeApp(config);
    console.log("Firebase initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing Firebase:", error);
    return false;
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", window.initializeFirebaseApp);
} else {
  window.initializeFirebaseApp();
}
