import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-rajeshestate.firebaseapp.com",
  projectId: "mern-rajeshestate",
  storageBucket: "mern-rajeshestate.appspot.com",
  messagingSenderId: "198352456752",
  appId: "1:198352456752:web:f8f22281f7c54151bcb1f5",
  measurementId: "G-QGM4X99K4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;