const firebaseConfig = {
  apiKey: "AIzaSyCIyByoZatiJno8fsVoaEsKHnYq75er6AE",
  authDomain: "bharatcomfort-46bac.firebaseapp.com",
  projectId: "bharatcomfort-46bac",
  storageBucket: "bharatcomfort-46bac.firebasestorage.app",
  messagingSenderId: "566612210879",
  appId: "1:566612210879:web:25dfd26a5444f08c9d820a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
