import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
import CartProductListItem from "./CartProductListItem";
import {
  removeFromCart,
  addFromCartByOne,
  removeFromCartByOne,
  setMyCart,
  getMyCartProducts,
  changeColorProduct
} from "../actions/cart";
import { getColorName } from "../selectors/color";
import { getQueryStringToRequestProductDetailOnColor } from "../selectors/products";

import OrderSummarize from "./OrderSummarize";
import AnItemInCart from './AnItemInCart';
import * as API from "../constants/apiURL";
import axios from "axios";

class MyCartItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      colorList: []
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ user: props.user });
  }

  render() {
    const products = this.props.products || [];
    const imgSize = this.props.imgSize || { height: 150, width: 150 };

    return (
      <div>
        {products.map((product, index) => {
       
          const colorList = this.state.colorList;

          return (
            <div key={index}>
              <AnItemInCart imgSize={imgSize} product={product} />
              {index == products.length - 1 ? (
                <div className="grey-line" style={{ background: "none" }} />
              ) : (
                <div className="grey-line" style={{margin: "0px"}}/>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myCart: state.myCart,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCartItems);
