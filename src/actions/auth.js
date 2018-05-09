import {
  firebase,
  googleAuthProvider,
  facebookAuthProvider
} from "../firebase/firebase";
import axios from "axios";
import * as API from "../constants/apiURL";

export const login = uid => ({ type: "LOGIN", uid })

export const startLogin = (email, password) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const res1 = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        const idToken = await firebase.auth().currentUser.getIdToken(false);
        // console.log("ID Token", idToken)
        const res2 = await axios({
          url: API.SAVE_PASSWORD_AND_HASH_TO_DB,
          method: "put",
          headers: {
            username: email,
            password: password,
            idtoken: idToken
          }
        });
        // console.log("Login Complted on nextjs", res2.data);
        resolve(true);
      } catch (err) {
        console.log("Error register", err);
        var errorMessage = err.message;
        document.getElementById("err_msg_login").innerHTML = err.message;
        // reject(errorMessage);
        reject(true);
      }
    });
  };
};

export const updateUserProfile = (user, { displayName }) => {
  console.log("Updating profile -> ", displayName);
  const updatedUser = {
    ...user,
    displayName: displayName
  };
  return dispatch => {
    return user
      .updateProfile({
        displayName: displayName
      })
      .then(function(user) {
        dispatch(setUser(updatedUser));
        console.log("Update Completed", updatedUser);
      })
      .catch(function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorCode, errorMessage);
      });
  };
};

export const startRegister = (email, password, displayName) => {
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      try {
        const res1 = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        const user = firebase.auth().currentUser;
        await updateDisplayNameOnFirebase(displayName);
        await axios({
          method: "post",
          url: API.CREATE_USER_INFO_TO_DB,
          data: user
        });
        dispatch(startLogout());
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("Register Completed", res1.displayName);
        resolve(true);
      } catch (err) {
        var errorMessage = err.message;
        console.log("Error regiter", err);
        reject(errorMessage);
      }
    });
  };
};

export const updateDisplayNameOnFirebase = name => {
  const user = firebase.auth().currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      const res = await user.updateProfile({
        displayName: name
      });
      // dispatch(changeDisplayName(name))
      resolve(true);
    } catch (err) {
      console.log("Error in update display name firebase", res);
      reject(err);
    }
  });
};

export const startFacebookLogin = () => {
  console.log("Start facebook login");
  return async () => {
    try {
      const res = await firebase.auth().signInWithPopup(facebookAuthProvider);
      console.log("Login fb res ", res);
      return res;
    } catch (err) {
      console.log("Error when loging facebook", err);
    }
  };
};

export const startFacebookRegister = () => {
  console.log("Start facebook register");
  return async () => {
    try {
      const res = await firebase.auth().signInWithPopup(facebookAuthProvider);
      console.log("Register fb res ", res);
      return res;
    } catch (err) {
      console.log("Error when register facebook", err);
    }
  };
};

export const logout = () => ({ type: "LOGOUT" });

export const startLogout = () => {
  return () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // console.log("Logout completed");
      })
      .catch(error => {
        console.log(error);
      });
  };
};
