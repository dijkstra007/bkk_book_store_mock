import axios from "axios";
import * as API from "../constants/apiURL";

const userDefaultState = {
  uid: "",
  displayName: "",
  email: "",
  profileImage: "",
  token: "",
  addressList: [],
  fbid: undefined,
  token: undefined
};

const updateAddressListToServer = (addressList = [], user) => {
  axios({
    method: "put",
    url: API.PUT_ADDRESS_LIST_TO_SERVER,
    headers: {
      email: user.email || ""
    },
    data: {
      addressList: addressList
    }
  })
    .then(res => {
      // console.log("AddressList Res", res.status);
    })
    .catch(error => {
      console.log("AddressList  Error", error);
      const code = err.response.status;
      const failPage = "http://" +window.location.hostname +":" +window.location.port +"/failPage?code=" +code;
      window.location.replace(failPage);
    });
};

const userReducer = (state = userDefaultState, action) => {
  let nextState = {};
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.user
      };
    case "CHANGE_DISPLAYNAME":
      return {
        ...state,
        displayName: action.displayName
      }
    case "CHANGE_PROFILEIMAGE":
      return {
        ...state,
        profileImage: action.profileImage
      }
    case "CLEAR_USER":
      return userDefaultState;
    case "SET_USER_TOKEN":
      return {
        ...state,
        token: action.token
      };
    case "ADD_ADDRESS":
      const addedAddressList = [...state.addressList, action.address];
      nextState = {
        ...state,
        addressList: addedAddressList
      };
      updateAddressListToServer(addedAddressList, state);
      return nextState;
    case "EDIT_ADDRESS":
      const editedAddressList = state.addressList.map((addr, idx) => {
        if (idx === action.index) {
          return action.address;
        } else {
          return addr;
        }
      });
      nextState = {
        ...state,
        addressList: editedAddressList
      };

      updateAddressListToServer(editedAddressList, state);
      return nextState;
    case "DELETE_ADDRESS":
      const deletedAddressList = state.addressList.filter((addr, idx) => {
        return idx != action.index;
      });
      nextState = {
        ...state,
        addressList: deletedAddressList
      };

      updateAddressListToServer(deletedAddressList, state);
      return nextState;
    case "SET_ADDRESS":
      return {
          ...state,
          addressList: action.addressList
      }
    default:
      return state;
  }
};

export default userReducer;
