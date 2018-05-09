import React from "react";
import { connect } from "react-redux";
import Router from "next/router";
import { firebase } from "../../firebase/firebase";
import {
  setUser,
  clearUser,
  setUserToken,
  saveNewUserToMongoDB,
  isUserIsInMongoDB,
  updateAndGetUserInfoFromMongoDB,
  sendUserInfoToServer
} from "../../actions/user";
import { login, logout } from "../../actions/auth";
import {
  clearMyCart,
  setMyCart,
  updateMyCartToServer,
  addLocalProductsToRedux
} from "../../actions/cart";
import { auth } from "firebase";
import * as API from "../../constants/apiURL";
import axios from "axios";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    componentDidMount() {
      const {
        onLogin,
        onSetUser,
        onLogout,
        onClearUser,
        onSetUserToken,
        onClearCart
      } = this.props;

      firebase.auth().onAuthStateChanged(async authUser => {
        const user = delete { ...authUser };
        console.log("User auth ", user);
        if (authUser) {
          localStorage.setItem("isLogin", "true");
          //check if user exist in mongo
          //if yes, get userinfomation from mongo
          //if no, create user in mongo after created get userinformation from mongo
          console.log("authUser", firebase.auth().currentUser);
          const isUserInMongo = await isUserIsInMongoDB(authUser.email);
          console.log("is user in mongo ", isUserInMongo);
          let res;
          let user;
          if (isUserInMongo) {
            // console.log("getting user info")
            res = await sendUserInfoToServer(authUser);
            user = res.data;
            onLogin(user);
            onSetUser(user);
            this.getTokenIdFromFirebaseAndSetToStore();
            this.loadProductsFromMyCart(user);
          } else {
            //check if signup with facebook?
            if (authUser.providerData[0].providerId === "facebook.com") {
              await axios({
                method: "post",
                url: API.CREATE_USER_INFO_TO_DB,
                data: authUser
              });
              onLogin(authUser);
              onSetUser(authUser);
            }
          }
        } else {
          localStorage.setItem("isLogin", "false");
          onClearCart();
          onClearUser();
          onLogout();
          this.loadProductsFromMyCart();
        }
      });
    }
    getTokenIdFromFirebaseAndSetToStore = () => {
      const { onSetUserToken } = this.props;
      firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
          // Send token to your backend via HTTPS
          // ...
          onSetUserToken(idToken);
        })
        .catch(function(error) {
          // Handle error
          console.log("Error while getting token id from firebase", error);
        });
    };

    loadProductsFromMyCart = async user => {
      if (user && user.uid != "") {
        const response = await axios({
          url: API.GET_MY_CART_ITEMS,
          method: "get",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            email: user.email
          }
        });
        const localStorageMyCart = localStorage.getItem("mycart");
        if (localStorageMyCart) {
          console.log("localStorage load ", localStorageMyCart);
          console.log(typeof localStorageMyCart);

          const products = JSON.parse(localStorageMyCart).concat(response.data);
          console.log("************************");
          console.log(response.data.length);
          console.log(JSON.parse(localStorageMyCart).length);
          console.log(products.length);
          console.log(products);
          console.log("----------------------------");
          this.props.addLocalProducts(products);
        } else {
          const products = response.data;
          this.props.onSetMyCart(products);
        }
      } else {
        const localStorageMyCart = localStorage.getItem("mycart");
        if (localStorageMyCart) {
          const products = JSON.parse(localStorageMyCart) || [];
          this.props.onSetMyCart(products);
        }
      }
    };
    render() {
      return <Component {...this.props} />;
    }
  }
  const mapStateToProps = state => ({
    user: state.user
  });
  const mapDispatchToProps = dispatch => ({
    onLogin: user => dispatch(login(user)),
    onSetUser: user => dispatch(setUser(user)),
    onLogout: () => dispatch(logout()),
    onSetUserToken: token => dispatch(setUserToken(token)),
    onClearUser: () => dispatch(clearUser()),
    onClearCart: () => dispatch(clearMyCart()),
    onSetMyCart: products => dispatch(setMyCart(products)),
    addLocalProducts: products => dispatch(addLocalProductsToRedux(products))
  });
  return connect(mapStateToProps, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
