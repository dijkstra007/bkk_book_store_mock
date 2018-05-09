import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { startLogin, startFacebookLogin } from "../../actions/auth";
import Link from "next/link";
import * as headerAction from "../../actions/header";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: {
        email: false,
        password: false
      }
    };
  }
  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };
  checkStateBeforeLogin = () => {
    return this.state.email !== "" && this.state.password !== "";
  };
  onLoginClick = async () => {
    const isValidInput = this.validateData();
    if (isValidInput) {
      const startLogin = this.props.startLogin;
      try {
        const res = await startLogin(this.state.email, this.state.password);
        Router.push("/");
        this.props.onClose();
      } catch (err) {
        console.log("LoginForm err", err);
      }
    }
  };
  onQuickRegisterClick = () => {
    this.props.showQuickRegisterForm();
  };
  onFacebookLoginClick = () => {
    this.props.startFacebookLogin();
    this.props.onClose();
  };
  validateData() {
    const valEmail = this.validateEmail(this.state.email);
    const valPassword = this.state.password.length >= 6;

    const errorObject = {
      email: !valEmail,
      password: !valPassword
    };
    const newState = {
      email: valEmail ? this.state.email : "",
      password: valPassword ? this.state.password : "",
      error: errorObject
    };
    this.setState(newState);
    return valEmail && valPassword;
  }
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  render() {
    const error = this.state.error;
    // console.log("error -> ", error);
    return (
      <div id="login_box">
        <div className="login-header">เข้าสู่ระบบ </div>
        <div>
          <div className="login-block">
            <div className="login-input-container vertical-center">
              <div className="login-input-label">E-mail</div>
              <input
                type="email"
                autoFocus
                // autoComplete="off"
                placeholder={
                  error.email ? "กรุณาใส่อีเมลให้ถูกต้อง" : "กรุณากรอกอีเมล"
                }
                value={this.state.email}
                onChange={this.onEmailChange}
                className={error.email ? "input-form-error" : "input-form"}
              />
            </div>
            <div className="login-input-container vertical-center">
              <div className="login-input-label">รหัสผ่าน</div>
              <input
                placeholder={
                  error.password
                    ? "กรุณาใส่รหัสผ่านให้ถูกต้อง"
                    : "กรุณากรอกรหัสผ่าน"
                }
                type="password"
                // autoComplete="off"
                value={this.state.password}
                onChange={this.onPasswordChange}
                className={error.password ? "input-form-error" : "input-form"}
              />
            </div>
            <div className="login-forget-password-container">
              <Link prefetch href="/resetPassword">
                <a className="navbar__menu">ลืมรหัสผ่าน</a>
              </Link>
            </div>
            <div
              id="err_msg_login"
              style={{
                color: "#ff0000",
                textAlign: "center",
                fontSize: "20px"
              }}
            ></div>
            <div className="login-button-container">
              <button
                style={{ marginRight: 10 }}
                onClick={() => {
                  this.onLoginClick();
                }}
                className="button login-normal-button"
              >
                เข้าสู่ระบบ
              </button>
              <br />
              <button
                className="button login-facebook-button"
                onClick={this.onFacebookLoginClick}
              >
                เข้าสู่ระบบผ่าน Facebook
              </button>
            </div>
            <div className="login-footer-container">
              สมาชิกใหม่สามารถ{" "}
              <button
                className="login-register-button"
                onClick={() => {this.onQuickRegisterClick()}}
              >
                ลงทะเบียน
              </button>{" "}
              ที่นี่
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startFacebookLogin: () => dispatch(startFacebookLogin()),
  startLogin: (email, password) => dispatch(startLogin(email, password)),
  showQuickRegisterForm: () => dispatch(headerAction.showQuickRegisterForm())
});

export default connect(undefined, mapDispatchToProps)(LoginForm);
