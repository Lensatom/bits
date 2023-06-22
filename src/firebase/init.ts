import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBHR66SPrCCxyM2niiGRTOx86DNQOYHlnY",
  authDomain: "uclid-30537.firebaseapp.com",
  projectId: "uclid-30537",
  storageBucket: "uclid-30537.appspot.com",
  messagingSenderId: "825241354186",
  appId: "1:825241354186:web:1483d09912f92059395933",
  measurementId: "G-TJ5HPFQ9L7"
};

export const FirebaseApp = initializeApp(firebaseConfig);
getAnalytics(FirebaseApp);