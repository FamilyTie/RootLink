"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
const storage_1 = require("firebase/storage");
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
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
const storage = (0, storage_1.getStorage)(app);
