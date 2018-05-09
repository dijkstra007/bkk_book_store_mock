import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import * as _ from 'lodash'
import { firebase } from "../firebase/firebase";
import withRedux from "next-redux-wrapper";
import configureStore from "../store/configureStore";
import * as API from "../constants/apiURL";
import MyCartItems from "../components/MyCartItems";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const store = configureStore();

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
  }
  componentDidMount() {}
  
  componentWillUnmount() {}
  componentWillReceiveProps(props) {
  }
  
  render() {
    
    const products = this.props.products || [];
    const nProducts = _.sum(products.map( p => p.quantity))

    return (
      <div>
        <MobileView device={isMobile}>
          <div className="col-sm-12 product__cart__table">
           
            <p className="table__title">
              <img
                style={{ paddingRight: "10px" }}
                src={
                  "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/cart-pink-min.png"
                }
              />สินค้าในตะกร้า
            </p>
            <div className="table__product">
              <div className="table__count">
                จำนวนสินค้าทั้งหมด ({nProducts})
                <br />
                <MyCartItems products={products}/>
              </div>
            </div>
          </div>
        </MobileView>
        <BrowserView device={isBrowser}>
          <div className="col-sm-8 product__cart__table">
            <p className="table__title">
              <img
                style={{ paddingRight: "10px" }}
                src={
                  "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/cart-pink-min.png"
                }
              />สินค้าในตะกร้า
            </p>
            <div className="table__product">
              <div className="table__count">
                จำนวนสินค้าทั้งหมด ({nProducts})
                <br />
                <MyCartItems products={products}/>
              </div>
            </div>
          </div>
        </BrowserView>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("Cart",state.myCart);
  return {
    user: state.user,
    myCart : state.myCart
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMyCart : (products) => dispatch( setMyCart(products) )
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);
