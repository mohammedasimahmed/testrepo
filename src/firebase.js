// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5xK8GVMp5Kq9I1kEAVabiSHry3ShAIgY",
  authDomain: "notifi-29a87.firebaseapp.com",
  projectId: "notifi-29a87",
  storageBucket: "notifi-29a87.appspot.com",
  messagingSenderId: "415869179269",
  appId: "1:415869179269:web:8b54847bc7115693cf60ec",
  measurementId: "G-QLBNRND78S",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);
