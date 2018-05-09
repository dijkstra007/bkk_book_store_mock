import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import {
  startLogout,
} from "../../actions/auth";
import * as  headerAction from '../../actions/header'
import NavigationBar from "./NavigationBar";
import QuickRegister from "./QuickRegister";
import MyAccountHeader from "./MyAccountHeader";
import CartSidebar from "./CartSidebar";
import Router from "next/router";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import NavigationBarMobile from "./NavigationBarMobile";
import NavigationBarTest from "./NavigationBarTest";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: undefined
    };
  }
  closeQuickRegisterBox = () => {
    this.props.closeAll()
  };
  onQuickRegisterClick = () => {
    this.props.showQuickRegisterForm()
  };
  onQuickLoginClick = () => {
    this.props.showQuickLoginForm();
  };
  onLogoutClick = () => {
    this.props.closeAll()
    this.props.onLogout();
    Router.push("/");
  };
  onMyAccountClick = () => {
    this.props.showMyAccount()
  };
  onCartClick = () => {
   this.props.showMyCart()
  };
  onCartClose = () => {
    this.props.closeAll()
  };
  getTotalProductsItem = products => {
    try {
      const res = products
        .map(product => product.quantity)
        .reduce((a, b) => a + b, 0);
      return res;
    } catch (err) {
      return 0;
    }
  };
  componentDidMount(){
    this.props.closeAll()
  }
  render() {
    const query = this.props.query
    const { startLogout, myCart = {}, user = {} } = this.props;
    const isAuthenticated = user.email != "";
    const helloName = user.displayName != null ? user.displayName : user.email;
    const displayUrl =
      user.profileImage ||
      "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/nineti9-pink-min.png";
    const parent = "#my_account";
    const totalProductsItem = this.getTotalProductsItem(myCart.products);
    const {
      showQuickLogin,
      showQuickRegister,
      showMyAccount,
      showMyCart
    } = this.props.header;
    const formType = showQuickLogin?"LOGIN":"REGISTER"
    let numberOfItems =
      typeof myCart.products === "undefined"
        ? 0
        : myCart.products.length === 0
          ? 0
          : myCart.products
              .map(product => product.quantity)
              .reduce((a, b) => a + b);
    return (
      <div>
       
        <MobileView device={isMobile}>
          <header style={{minWidth: "1200px"}} >
            <div style={{minWidth: "auto"}} className="content-container">
              
              <div className="header__content">
                <div className="col-sm-3">
                <ul className="social-nav">
                    <li>
                      <a href="https://www.facebook.com/messages/t/nineti9" target="_blank" className="facebook">
                        <div className="socail-nav__image-container ">
                          <img src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/messager-black-icon-min.png" } />
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/nineti9" target="_blank" className="facebook">
                        <div className="socail-nav__image-container ">
                          <img src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/facebook-icon-min.png" } />
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/nineti9.th" target="_blank" className="instagram">
                        <div className="socail-nav__image-container ">
                          <img src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/instagram-icon-min.png" } />
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="https://line.me/R/ti/p/%40pgk8406w" target="_blank" className="facebook">
                        <div className="socail-nav__image-container ">
                          <img src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/line-black-icon-min.png" } />
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-4" style={{ textAlign: "right" }}>
                  <div className="header__logo__mobile">
                      <h1>
                        <a href="/">
                          <img  style={{ width: "234px" }}
                            src={ "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/logo-main-min.png"} />
                        </a>
                      </h1>
                    </div>
        
                </div>
                <div align="right" className="col-sm-5 header_sub_right" style={{ textAlign: "right" }} >
                  <div>
                    <div  className="header-button-container">
                    
                      <button className="button button--my-basket" id="cart__sidebar" onClick={() => {this.onCartClick();}}>
                        <img className="button button--image"
                          src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/cart-min.png" } />
                        {totalProductsItem !== 0 ? ( <span className="badge"> {totalProductsItem}</span>) : null}
                      </button>
                          {showMyCart ? ( <CartSidebar showCart={showMyCart} onCartClose={this.onCartClose}/> ) : null}
                    </div>
                    <div className="header-content-row-spliter header_inline" />
                    {isAuthenticated ? (
                      <div className="div-header-sub-content-right">
                        <button id="my_account" className="button header-my-account-button header_inline"
                          onClick={this.onMyAccountClick}>บัญชีของฉัน</button>
                        <div  className="header_inline"  >
                          {"  "}
                        </div>
                        <div id="cart_parent" className="header__title">สวัสดี {helloName}</div>
                        <img src={displayUrl} className="header-display-image" />
                      </div>
                    ) : (
                      <div className="div-header-sub-content-right">
                        <button id="quick_register" className="header-register-button header_inline"
                          onClick={() => { this.onQuickRegisterClick(); }} > &nbsp;ลงทะเบียน&nbsp; </button>
                        <button id="quick_login" className="header-login-button"
                          onClick={() => { this.onQuickLoginClick(); }}>เข้าสู่ระบบ&nbsp;/</button>
                        <div id="cart_parent" className="header_inline" >
                          {" "}
                        </div>
                        
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <NavigationBarMobile pathname={this.props.pathname} query={query} />
            
              {showQuickRegister || showQuickLogin ? (
                <QuickRegister
                  type={formType}
                  showQuickRegister={
                    showQuickRegister || showQuickLogin
                  }
                  onClose={this.closeQuickRegisterBox}
                />
              ) : null}
              {showMyAccount ? (
                <MyAccountHeader
                  show={showMyAccount}
                  onLogout={this.onLogoutClick}
                />
              ) : null}
            </div>
            <hr style={{ borderBottomWidth: "0px" }} />
          </header>    
      </MobileView>
      <BrowserView device={isBrowser}>
          <header className="my_header">
            <div className="content-container">
              <div className="header__content">
                <div className="col-sm-3">
                  <ul className="social-nav">
                    <li>
                      <a href="https://www.facebook.com/messages/t/nineti9" target="_blank" className="facebook">
                        <div className="socail-nav__image-container ">
                          <img src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/messager-black-icon-min.png" } />
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/nineti9" target="_blank" className="facebook">
                        <div className="socail-nav__image-container ">
                          <img src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/facebook-icon-min.png" } />
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/nineti9.th" target="_blank" className="instagram">
                        <div className="socail-nav__image-container ">
                          <img src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/instagram-icon-min.png" } />
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="https://line.me/R/ti/p/%40pgk8406w" target="_blank" className="facebook">
                        <div className="socail-nav__image-container ">
                          <img src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/line-black-icon-min.png" } />
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-4" style={{ textAlign: "right" }}>
                    <div className="header__logo ">
                      {/* <h1> */}
                        <a href="/">
                          <img  style={{ width: "234px" }}
                            src={ "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/logo-main-min.png"} />
                        </a>
                      {/* </h1> */}
                    </div>
        
                </div>
                <div align="right" className="col-sm-5 header_sub_right" style={{ textAlign: "right" }} >
                  <div>
                    <div  className="header-button-container">
                    
                      <button className="button button--my-basket" id="cart__sidebar" onClick={() => {this.onCartClick();}}>
                        <img className="button button--image"
                          src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/cart-min.png" } />
                        {totalProductsItem !== 0 ? ( <span className="badge"> {totalProductsItem}</span>) : null}
                      </button>
                          {showMyCart ? ( <CartSidebar showCart={showMyCart} onCartClose={this.onCartClose}/> ) : null}
                    </div>
                    <div className="header-content-row-spliter header_inline" />
                    {isAuthenticated ? (
                      <div className="div-header-sub-content-right">
                        <div id="cart_parent" className="header_inline"  >
                        {"  "}
                      </div>
                        <button id="my_account" className="button header-my-account-button header_inline"
                          onClick={this.onMyAccountClick}>บัญชีของฉัน</button>
                        <div className="header__title">สวัสดี {helloName}</div>
                        <img src={displayUrl} className="header-display-image" />
                      </div>
                    ) : (
                      <div className="div-header-sub-content-right">
                          <div id="cart_parent" className="header_inline"  >
                          {"  "}
                        </div>
                        <button id="quick_register" className="header-register-button header_inline"
                          onClick={() => { this.onQuickRegisterClick(); }} > &nbsp;ลงทะเบียน&nbsp; </button>
                        <button id="quick_login" className="header-login-button"
                          onClick={() => { this.onQuickLoginClick(); }}>เข้าสู่ระบบ&nbsp;/</button>
                        
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
                <NavigationBar pathname={this.props.pathname} query={query} />
            
              {showQuickRegister || showQuickLogin ? (
                <QuickRegister
                  type={formType}
                  showQuickRegister={
                    showQuickRegister || showQuickLogin
                  }
                  onClose={this.closeQuickRegisterBox}
                />
              ) : null}
              {showMyAccount ? (
                <MyAccountHeader
                  show={showMyAccount}
                  onLogout={this.onLogoutClick}
                />
              ) : null}
            </div>
            <hr style={{ borderBottomWidth: "0px" }} />
          </header>    
        </BrowserView>
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(startLogout()),
  showQuickLoginForm: () => dispatch(headerAction.showQuickLoginForm()),
  showQuickRegisterForm: () => dispatch(headerAction.showQuickRegisterForm()),
  showMyAccount: () => dispatch(headerAction.showMyAccount()),
  showMyCart: () => dispatch(headerAction.showMyCart()),
  closeAll: () => dispatch(headerAction.closeAll())
});

const mapStateToProps = state => {
  return { header: state.header, user: state.user, myCart: state.myCart };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

