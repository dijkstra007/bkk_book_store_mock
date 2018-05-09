import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import CartProductListItem from "./CartProductListItem";
import {
  removeFromCart,
  addFromCartByOne,
  removeFromCartByOne,
  setMyCart,
  getMyCartProducts
} from "../actions/cart";
import { getColorName } from "../selectors/color";
import { getQueryStringToRequestProductDetailOnColor } from "../selectors/products";

import OrderSummarize from "./OrderSummarize";
import * as API from "../constants/apiURL";
import commaNumber from 'comma-number';


class OrderCartItem extends React.Component {
  constructor(props) {
    super(props);

    
    this.state = {
      products: this.props.products,
      user: this.props.user
    };
  }

  componentWillReceiveProps(props) {}
  componentDidMount() {}
  
  render() {
    const props = this.props;
    const products =  this.props.products || [];
    console.log(" this.props.products", this.props.products);
    const imgSize = this.props.imgSize || { height: 150, width: 150 };

    return (
      <div>
        {products.map((product, index) => {
          const { productID, quantity, productName, thumbnailImage, url, colorName, sku } = product;
          console.log(product.onSale,product.salesPrice,product.regularPrice);
          const price =
            product.onSale === true
              ? product.salesPrice
              : product.regularPrice;
          const productDetailWithSKU = "/productDetail?sku=" +sku;
          return (
            <div key={index}>
              <div className="body__cart" style={{width:"100%"}}>
                <div className="col-sm-3" style={{ paddingRight: "0px " }}>
                  <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none", color: "#000000"}}>
                    <img src={thumbnailImage} style={imgSize} />
                  </a>
                </div>
                <div className="col-sm-9" style={{ paddingLeft: "0px ",    paddingRight: "5px" }}>
                  <div className="col-sm-12" style={{ paddingLeft: "0px ",paddingRight: "0px " }}>
                    <div className="col-sm-7">
                      <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none", color: "#000000"}}>
                        <div className="mycart_product_name">{productName}</div>
                      </a>
                    </div>
                    <div className="mycart_product_price_button_container col-sm-5" style={{ paddingRight: "0px " }}>
                      <div className="mycart_product_price">฿ {commaNumber(price)}</div>
                    </div>
                  </div>
                  <div className="col-sm-12" style={{ paddingLeft: "0px " }}>
                    <div className="col-sm-6">
                      <p className="cart__text__inline">จำนวน</p>
                      <span className="quantity__num" style={{border: "none"}}>{quantity}</span> &nbsp;
                      <p className="cart__text__inline">ชิ้น</p>
                    </div>
                    <div className="col-md-6">
                    <p className="cart__text__inline">{colorName? 'สี': ''}</p>
                      <span className="quantity__num" style={{border: "none"}}>{colorName}</span>
                    </div>
                  </div>
                </div>
              </div>
              {index == products.length - 1 ? (
                <div className="grey-line" style={{ background: "none" }} />
              ) : (
                <div className="grey-line" />
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

export default connect(mapStateToProps, undefined)(OrderCartItem);
