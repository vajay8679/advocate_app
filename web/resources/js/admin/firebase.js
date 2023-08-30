import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken } from "firebase/messaging";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDntU78Z8qEK8Qs5H7BAg-75BaxiTiqFAQ",
  authDomain: "chatappdemo-7301e.firebaseapp.com",
  projectId: "chatappdemo-7301e",
  storageBucket: "chatappdemo-7301e.appspot.com",
  messagingSenderId: "835122346412",
  appId: "1:835122346412:web:48f1f0df894538692f2209",
  measurementId: "G-92HR3HL563"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app);

export const messaging = getMessaging(app);
export const requestForToken = () => {
  // const messaging = getMessaging();
  console.log('messaging', messaging);
  return getToken(messaging, { vapidKey: 'BLIaBpp7rhCoo_wdvm9hbz9XeXiAQZs7vDYi4jUbUsC9TJ9XS1AM246djz5unutusao-RcSsOXZrmtZFDoa9nLM' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
}

// messaging.requestPermission()
//
//   .then(function () {
//
//     return messaging.getToken()
//
//   })
