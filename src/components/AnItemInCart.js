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
import * as API from "../constants/apiURL";
import axios from "axios";
import commaNumber from 'comma-number';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";




class AnItemInCart extends React.Component {
  constructor(props){
    super(props)
  }

  onAddClick = sku => {
    const dispatchAddFromCart = this.props.dispatchAddFromCart;
    dispatchAddFromCart(sku);
  };
  onRemoveClick = sku => {
    const dispatchRemoveFromCart = this.props.dispatchRemoveFromCart;
    const user = this.props.user;
    dispatchRemoveFromCart(sku);
  };
  onRemoveProductClick = sku => {
    const user = this.props.user;
    this.props.dispatchRemoveItemFromCart(sku);
  };
 
  onColorSelectedChange = async (e) => {
    const color = e.target.value;
    const product = this.props.product
    const url =
      API.GET_A_PRODUCT_BY_COLOR +
      `?color=${encodeURIComponent(color)}&productID=${product.productID}`;
    try {
      const res = await axios.get(url);
      const newProduct = res.data;
      const updatedProduct = {
        ...newProduct,
        quantity: product.quantity == 0? 1: product.quantity
      }
      this.props.dispatchChangeColorProduct(product,newProduct, product.quantity);
    } catch (err) {
      const code = err.response.status;
      const failPage =
        "http://" +
        window.location.hostname +
        ":" +
        window.location.port +
        "/failPage?code=" +
        code;
      window.location.replace(failPage);
    }
  };

  render() {
    const imgSize = this.props.imgSize || { height: 150, width: 150 };

    const product = this.props.product
    const {
      productID,
      sku,
      quantity,
      inStock,
      productName,
      thumbnailImage,
      url,
      colorList
    } = product;
    const price =
      product.onSale == true ? product.salesPrice : product.regularPrice;
      console.log("COLORNAME PRODUCT",product.colorName)
    const productDetailWithSKU = "/productDetail?sku=" +sku;
    const outOfStock = inStock <= 0;
    return (
              <div className="body__cart">
                <div className="col-sm-3" style={{ paddingRight: "0px " }}>
                {outOfStock ? (
                  <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none"}}>
                    <img className="mycart_product_image" src={thumbnailImage} style={{imgSize, filter: "brightness(40%)"}}  />
                    <div style={{position: "absolute", top: "35%", left: "30%", color: "#ffffff", fontSize: "120%"}}>
                      Sold Out
                    </div>
                  </a>
                ) : (
                  <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none"}}>
                    <img className="mycart_product_image" src={thumbnailImage} style={{imgSize}}  />
                  </a>
                )}
                </div>
                <div className="col-sm-9" style={{ paddingLeft: "0px " }}>
                  <div className="col-sm-12" style={{ padding: "0px " }}>
                    <div className="col-sm-7">
                      <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none"}}>
                        <div className="mycart_product_name">{productName}</div>
                      </a>
                    </div>
                    <div className="mycart_product_price_button_container col-sm-5">
                      <div className="mycart_product_price">฿ {commaNumber(price)}</div>
                    </div>
                  </div>
                  <div className="col-sm-12" style={{ padding: "0px" }}>
                    <div className="col-sm-6" style={{paddingRight:"0px"}}>
                        <p className="cart__text__inline">จำนวน</p>
                        { quantity <=1 ?
                            <button className="minus-btn" type="button" name="button">
                              <span >- </span>
                            </button>
                          :
                          <button onClick={() => {this.onRemoveClick(sku);}} className="minus-btn" type="button" name="button">
                              <span>- </span>
                            </button>
                          
                          }
                        <span className="quantity__num">{quantity}</span>
                          { quantity <20 ?
                            <button onClick={() => { this.onAddClick(sku); }} className="plus-btn" type="button" name="button">
                              <span > + </span>
                            </button>
                            :
                            <button className="plus-btn" type="button" name="button" >
                              <span >+ </span>
                            </button>
                          } &nbsp; <p className="cart__text__inline">ชิ้น</p>
                      </div>
                    {colorList.length != 0 ? (
                      <div>
                    <MobileView device={isMobile}>
                      
                      <div className="col-sm-12" style={{ marginTop: "10px" }}>
                        
                        <div className="col-sm-1 cart__text__inline">
                          {"สี"}
                        </div>
                        <div className="col-sm-10" style={{ padding: "0px" }}>
                          <div className="select form-control">
                            <select
                              name="slct"
                              id="slct"
                              onChange={e => {
                                this.onColorSelectedChange(e);
                              }}
                            >
                              {colorList.map((color, index) => {
                                console.log("COLOR NAME",color.colorName)
                                return product.color === color.color?(
                                  <option key={index} value={color.color} selected>
                                    {color.colorName}
                                  </option>
                                ) : (
                                  <option key={index} value={color.color} >
                                    {color.colorName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        
                      </div>
                    </MobileView>
                    <BrowserView device={isBrowser}>
                    <div className="col-md-6" style={{paddingLeft:"0px"}}>
                        
                        <div className="col-md-1 cart__text__inline">
                          {"สี"}
                        </div>
                        <div className="col-md-10" style={{ padding: "0px" }}>
                          <div className="select form-control">
                            <select
                              name="slct"
                              id="slct"
                              onChange={e => {
                                this.onColorSelectedChange(e);
                              }}
                            >
                              {colorList.map((color, index) => {
                                console.log("COLOR NAME",color.colorName)
                                return product.color === color.color?(
                                  <option key={index} value={color.color} selected>
                                    {color.colorName}
                                  </option>
                                ) : (
                                  <option key={index} value={color.color} >
                                    {color.colorName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        
                      </div>
                    </BrowserView>
                  </div>

                    ) : (
                      <div className="col-md-6" />
                    )}
                  </div>
                  <div
                    className=" col-sm-12 order__summarize__right"
                    style={{ paddingTop: "10px" }}
                  >
                    <button
                      className="button cart__remove__button"
                      onClick={() => {
                        this.onRemoveProductClick(sku);
                      }}
                    >
                      {" "}
                      ลบสินค้า{" "}
                    </button>
                  </div>
                </div>
              </div>
              
    )
  }
}


const mapDispatchToProps = dispatch => {
  return {
    dispatchRemoveFromCart: (sku) =>
      dispatch(removeFromCartByOne(sku)),
    dispatchAddFromCart: (sku) => dispatch(addFromCartByOne(sku)),
    dispatchRemoveItemFromCart: (sku) =>
      dispatch(removeFromCart(sku)),
    dispatchChangeColorProduct: (oldProduct, newProduct, quantity) =>
      dispatch(changeColorProduct(oldProduct, newProduct, quantity))
  };
};
const mapStateToProps = state => {
  return {
    myCart: state.myCart,
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnItemInCart);
