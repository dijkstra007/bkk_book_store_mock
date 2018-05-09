import * as firebase from 'firebase';
import * as ENV from './config';
import "firebase/storage";

const config = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DATABASE_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const database = firebase.database();
const storage = firebase.storage();
const googleAuthProvider = new firebase
  .auth
  .GoogleAuthProvider();
const facebookAuthProvider = new firebase
  .auth
  .FacebookAuthProvider();

  export const startLogin = (email, password) => {
    return () => {
      return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          // console.log("Login Complted on nextjs");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          console.log(errorCode, errorMessage);
        });
    };
  };
  
export {firebase, googleAuthProvider, facebookAuthProvider, storage, database as default};
