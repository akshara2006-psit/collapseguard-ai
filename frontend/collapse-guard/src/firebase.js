import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcj8JLD_5TSYk1ZAaRtFPeR3SxqBwEcKM",
  authDomain: "collapse-guard.firebaseapp.com",
  projectId: "collapse-guard",
  storageBucket: "collapse-guard.firebasestorage.app",
  messagingSenderId: "380005838648",
  appId: "1:380005838648:web:c065ddf74800f24dde1bcd",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);