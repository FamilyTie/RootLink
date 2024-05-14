
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDmPnPprhqbkH_k3VUWsrsNY1k5DTzman4",
  authDomain: "rootlink-photo.firebaseapp.com",
  projectId: "rootlink-photo",
  storageBucket: "rootlink-photo.appspot.com",
  messagingSenderId: "129071994673",
  appId: "1:129071994673:web:64ad4152f8231600f78210",
  measurementId: "G-3NRCBEMG16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);