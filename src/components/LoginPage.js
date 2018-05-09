import React from 'react';
import { connect } from 'react-redux';
import { startLogin,startFacebookLogin } from '../actions/auth';
import Carousel from "./Carousel";


export const LoginPage = ({ startLogin,startFacebookLogin }) => (
  <div className="box-layout">

    <div className="box-layout__box">
      <h1 className="box-layout__title">BNK48_Shop</h1>
      <p>Welcome to bnkshop.</p>
      <button className="button" onClick={
        startFacebookLogin
      }>Login with Facebook</button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startFacebookLogin: () => dispatch(startFacebookLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
