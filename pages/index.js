import React from "react";
import Router from "next/router";
import configureStore from "../src/store/configureStore";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";



class App extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>Hello BKK Book Store </div>
    );
  }
}

export default (App);
