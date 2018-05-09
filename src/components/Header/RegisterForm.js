import React from "react";
import { connect } from "react-redux";
import { startRegister, startFacebookRegister } from "../../actions/auth";
var Recaptcha = require("react-recaptcha");

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      rePassword: "",
      validateCaptcha: false,
      error: {
        email: false,
        name: false,
        password: false,
        rePassword: false,
        captcha: false
      },
      errorAlert: ""
    };
  }
  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  onNameChange = e => {
    this.setState({ name: e.target.value });
  };
  onPasswordChange = e => {
    this.setState({ password: e.target.value });
  };
  onRePasswordChange = e => {
    this.setState({ rePassword: e.target.value });
  };
  onFacebookRegisterClick = () => {
    this.props.startFacebookRegister();
    this.props.onClose();
  };
  validateData = () => {
    const valEmail = this.validateEmail(this.state.email);
    const valName = this.state.name.length >= 4 && this.state.name.length <= 16;
    const valPassword = this.state.password.length >= 6;
    const valRePassword =
      this.state.password === this.state.rePassword &&
      this.state.rePassword.length > 0;
    const valCaptcha = this.state.validateCaptcha;
    // const valCaptcha = true;
    const errorObject = {
      email: !valEmail,
      name: !valName,
      password: !valPassword,
      rePassword: !valRePassword,
      captcha: !valCaptcha
    };
    const newState = {
      email: valEmail ? this.state.email : "",
      name: valName ? this.state.name : "",
      password: valPassword ? this.state.password : "",
      rePassword: valRePassword ? this.state.rePassword : "",
      validateCaptcha: valCaptcha,
      error: errorObject
    };

    this.setState(newState);
    return valEmail && valName && valPassword && valRePassword && valCaptcha;
  };
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validateCaptcha = res => {
    console.log("captcha-> ", res.length > 0);
    this.setState({ validateCaptcha: res.length > 0 });
  };
  onRegisterClick = async () => {
    if (this.validateData()) {
      const startRegisterUser = this.props.startRegisterUser;
      try {
        const res = await startRegisterUser(
          this.state.email,
          this.state.password,
          this.state.name
        );
        // console.log("startRegisterUser res",res);
        console.log("startRegisterUser", this.props);
        this.props.onClose();
      } catch (err) {
        console.log("startRegisterUser error", err);
        document.getElementById("err_msg_register").innerHTML = err;
        // alert(err.message);
      }
    }
  };

  render() {
    const error = this.state.error;
    const emailError = error.email;
    const nameError = error.name;
    const passwordError = error.password;
    const rePasswordError = error.rePassword;
    // console.log("error -> ",error);
    return (
      <div>
        <div className="register-header">ลงทะเบียน </div>
        <div>
          <div className="register-block">
            <div className="register-input-container vertical-center">
              <div className="register-input-label">E-mail</div>
              <input
                type="email"
                className={error.email ? "input-form-error" : "input-form"}
                placeholder={
                  error.email ? "กรุณาใส่อีเมลให้ถูกต้อง" : "กรุณากรอกอีเมล"
                }
                onChange={this.onEmailChange}
                value={this.state.email}
              />
            </div>
            <div>
              <div className="register-input-container vertical-center">
                <div className="register-input-label">ชื่อ</div>
                <input
                  type="text"
                  className={error.name ? "input-form-error" : "input-form"}
                  placeholder={
                    error.name
                      ? "กรุณาใส่ชื่อให้ถูกต้อง (4 - 16 ตัวอักษร)"
                      : "ใส่ชื่อ 4 - 16 ตัวอักษร"
                  }
                  onChange={this.onNameChange}
                  value={this.state.name}
                />{" "}
              </div>
            </div>
            <div>
              <div className="register-input-container vertical-center">
                <div className="register-input-label">รหัสผ่าน</div>
                <input
                  type="password"
                  className={error.password ? "input-form-error" : "input-form"}
                  placeholder={
                    error.password
                      ? "กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร"
                      : "กรอกรหัสผ่านอย่างน้อย 6 ตัวอักษร"
                  }
                  onChange={this.onPasswordChange}
                  value={this.state.password}
                />{" "}
              </div>
            </div>
            <div>
              <div className="register-input-container vertical-center">
                <div className="register-input-label" />
                <input
                  type="password"
                  className={
                    error.rePassword ? "input-form-error" : "input-form"
                  }
                  placeholder={
                    rePasswordError
                      ? "รหัสผ่านไม่ตรงกัน กรุณายืนยันรหัสผ่านอีกครั้ง"
                      : "ยืนยันรหัสผ่านอีกครั้ง"
                  }
                  onChange={this.onRePasswordChange}
                  value={this.state.rePassword}
                />
              </div>
            </div>
            <div
              className={
                error.captcha
                  ? "register-input-captcha-container-error"
                  : "register-input-captcha-container"
              }
            >
              <Recaptcha
                sitekey={process.env.reCAPTCHA_SITE_KEY}
                render="explicit"
                verifyCallback={this.validateCaptcha}
              />
            </div>
            <div
              id="err_msg_register"
              style={{
                color: "#ff0000",
                textAlign: "center",
                fontSize: "20px",
                paddingBottom: "20px"
              }}
            />
            <div className="register-button-container">
              <button
                style={{ marginRight: 10 }}
                onClick={() => {
                  this.onRegisterClick();
                }}
                className="button register-normal-button"
              >
                ลงทะเบียน
              </button>
              <button
                className="button register-facebook-button"
                onClick={this.onFacebookRegisterClick}
              >
                ลงชื่อเข้าใช้ด้วย Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startRegisterUser: (email, password, displayName) =>
      dispatch(startRegister(email, password, displayName)),
    startFacebookRegister: () => dispatch(startFacebookRegister())
  };
};

export default connect(undefined, mapDispatchToProps)(RegisterForm);
