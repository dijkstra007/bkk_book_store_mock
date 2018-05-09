import axios from "axios";
import * as API from "../constants/apiURL";
import * as _ from "lodash";
import { updateDisplayNameOnFirebase } from "./auth";
import { firebase } from "../firebase/firebase";
export const setUser = user => {
  return async (dispatch, state) => {
    const idToken = await firebase.auth().currentUser.getIdToken(true);
    console.log("Token ",idToken)
    dispatch({
      type: "SET_USER",
      user: {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        profileImage: user.profileImage,
        fbid: user.fbid,
        token: idToken
      }
    });
  };
};

export const changeDisplayName = name => ({
  type: "CHANGE_DISPLAYNAME",
  displayName: name
});

export const changeProfileImage = url => ({
  type: "CHANGE_PROFILEIMAGE",
  profileImage: url
});

export const clearUser = () => ({
  type: "CLEAR_USER"
});

export const setUserToken = token => ({
  type: "SET_USER_TOKEN",
  token: token
});

export const addAddressInfoToUser = address => {
  return {
    type: "ADD_ADDRESS",
    address: address
  };
};

export const editAddressInfoToUser = (address, index) => {
  return {
    type: "EDIT_ADDRESS",
    address: address,
    index: index
  };
};

export const deleteAddressInfoToUser = index => {
  return {
    type: "DELETE_ADDRESS",
    index: index
  };
};

export const setAddressInfoToUser = addressList => {
  return {
    type: "SET_ADDRESS",
    addressList: addressList
  };
};

export const isUserIsInMongoDB = async email => {
  return new Promise(async (resolve, reject) => {
    //   axios({
    //     method: "get",
    //     url: API.GET_A_USER_EMAIL + `/${email}`
    //   })
    //     .then(res => {
    //       console.log("res -> ", res);
    //       if (res.data == "USER NOT FOUND") {
    //         resolve(false);
    //       } else {
    //         resolve(true);
    //       }
    //     })
    //     .catch(err => {
    //       const code = err.response.status;
    //       reject(err);
    //     });
    //   });

    try {
      let res = await axios({
        method: "get",
        url: API.GET_A_USER_EMAIL + `/${email}`
      });
      if (res.data == "USER NOT FOUND") {
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (err) {
      console.log("isUserIsInMongoDB error ", err);
      throw new Error("error while check user is in mongo");
    }
  });
};

export const updateAndGetUserInfoFromMongoDB = email => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        method: "put",
        url: API.PUT_USER_INFO_TO_SERVER
      });
      const user = res.data;
      if (user == "USER NOT FOUND") {
        reject(new Error("error while check user is in mongo"));
      } else {
        console.log("get user info from mongodb", user);
        resolve(user);
      }
    } catch (err) {
      const failPage =
        "http://" +
        window.location.hostname +
        ":" +
        window.location.port +
        "/failPage?code=" +
        code;
      window.location.replace(failPage);
      reject(new Error("error while check user is in mongo"));
    }
  });
};

export const sendUserInfoToServer = info => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await axios({
        method: "put",
        url: API.PUT_USER_INFO_TO_SERVER,
        headers: {
          "Content-type": "application/json",
          email: info.email
        },
        data: info
      });
      await updateDisplayNameOnFirebase(info.displayName);
      // console.log("Send UserInfo to server completed");

      resolve(res);
    } catch (error) {
      // console.log("ERROR -> ", error);
      reject(false);
    }
  });
};

export const saveNewUserToMongoDB = user => {
  return new Promise(async (resolve, reject) => {
    try {
      let res1 = await axios({
        method: "post",
        url: API.CREATE_USER_INFO_TO_DB,
        data: user
      });
      console.log("USER NAME", user.displayName);
      let res2 = await updateDisplayNameOnFirebase(user.displayName);
      // console.log("updateUserInfoToMongoDB completed");
      // console.log("RES2DATA",res2.data);
      resolve(user);
    } catch (error) {
      console.log("Error updateUserInfoToMongoDB xxx", error);
      reject(error);
    }
  });
};

// export const sendProfilePicToS3 = profilePic => {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: "post",
//       url: API.PUT_PROFILE_PICTURE_TO_SERVER,
//       data: profilePic,
//       dataType: "json"
//     })
//       .then(res => {
//         console.log("Send UserInfo to server completed", res);
//         resolve(res);
//       })
//       .catch(error => {
//         console.log("ERROR -> ", error);
//         reject(false);
//       });
//   });
// };
