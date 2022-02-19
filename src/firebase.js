import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAtHWJskHCmV1-Yr2MVkN0ZhDl866sRJM",
    authDomain: "connect-app-3aa82.firebaseapp.com",
    projectId: "connect-app-3aa82",
    storageBucket: "connect-app-3aa82.appspot.com",
    messagingSenderId: "84770634447",
    appId: "1:84770634447:web:27e5f9d0a1f1f6086d95ba",
    measurementId: "G-J67VBQT2B8"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = app.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;