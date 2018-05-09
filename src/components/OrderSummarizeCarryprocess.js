import React from "react";
import { connect } from "react-redux";
import CartProductListItem from "./CartProductListItem";
import { startCheckCoupon } from "../actions/coupon";
import { getCarrier } from "../actions/order";
import { getTransportationPrice } from "../calculator/carry";
import { asyncGetSummaryPriceFromServer } from "../calculator/products";
import Link from "next/link";
import moment from "moment";
import * as ORDER from "../constants/order";
import {

  setProductsToOrder,
  sendOrderToServer
} from "../actions/order";
import {
  removeFromCart,
  addFromCartByOne,
  removeFromCartByOne
} from "../actions/cart";
import coupon from "../reducers/coupon";
import * as TEXT from "../constants/text";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import commaNumber from 'comma-number';

const CouponMessage = ({ coupon }) => {
  let message = "";
  if (coupon.isExpired) {
    message = TEXT.COUPON_EXPIRED;
  } else if (coupon.ok) {
    if (coupon.type === "PERCENTAGE_DISCOUNT") {
      message = TEXT.COUPON_VALID + `${coupon.amount} %`;
    } else {
      message = TEXT.COUPON_VALID + `${coupon.amount} บาท`;
    }
  } else {
    message = TEXT.COUPON_INVALID;
  }
  return (
    <div className={coupon.ok ? "text_is_valid" : "text_is_invalid"}>
      {message}
    </div>
  );
};
class OrderSummarizeCarryprocess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        profileimage: "",
        name: "",
        email: "",
        password: ""
      },
      products: [],
      coupon: props.coupon || {
        name: "",
        type: "",
        amount: 0,
        expiry_date: 0,
        isValid: undefined
      },
      shouldShowCouponMessage: false,
      shouldShowCouponbox: true,
      totalPrice: 0,
      carrierFee: 0,
      paidAmount: undefined,
      shippingFee: undefined,
      priceBeforeApplyPromotion: undefined,
      priceDiscounted: undefined
    };
  }
  async componentDidMount() {
    let showCoupon = this.state.shouldShowCouponbox;
    if (this.props.showCoupon !== undefined) {
      showCoupon = this.props.showCoupon;
    }
    const products = this.props.product;
    const coupon = this.props.coupon;
    const carrierType = this.props.order.carrier;
    const res = await asyncGetSummaryPriceFromServer({
      products: products,
      coupon: coupon,
      carrierType: carrierType
    });
    const {
      paidAmount,
      shippingFee,
      priceBeforeApplyPromotion,
      priceDiscounted
    } = res.data;
    this.setState({
      shouldShowCouponbox: showCoupon,
      paidAmount,
      shippingFee,
      priceBeforeApplyPromotion,
      priceDiscounted
    });
  }
  async componentWillReceiveProps(props) {
    const products = props.products;
    const coupon = props.coupon;
    const carrierType = props.order.carrier;

    console.log("component will receive props", products);
    const res = await asyncGetSummaryPriceFromServer({
      products: products,
      coupon: coupon,
      carrierType: carrierType
    });
    const {
      paidAmount,
      shippingFee,
      priceBeforeApplyPromotion,
      priceDiscounted
    } = res.data;
    console.log("ASYNC GET SUMMARY PRICE");
    console.log({
      paidAmount,
      shippingFee,
      priceBeforeApplyPromotion,
      priceDiscounted
    });
    this.setState({
      coupon: props.coupon,
      paidAmount,
      shippingFee,
      priceBeforeApplyPromotion,
      priceDiscounted
    });
  }

  onNextHandler = async () => {
    const products = this.props.myCart.products;
    const order_address = this.props.order;
    console.log("order_address",order_address);
    this.props.dispatchSetProducts(products);
    const myOrder = {
      ...this.props.order,
      products: products.map(product => {
        return {
          productName: product.productName,
          productID: product.productID,
          sku: product.sku,
          quantity: product.quantity
        };
      }),
      customerName: name ,
      // customerName: name || email.substring(0, email.indexOf("@")),
      // email: email,
      status: ORDER.STATUS.WATING_PAYMENT_COMPLETED,
      createAt: moment().format("X")
    };
    
    this.props.onNext();

  };
  render() {
    const products = this.state.products || [];
    const totalItem = products.length;
    const {
      paidAmount,
      shippingFee,
      priceBeforeApplyPromotion,
      priceDiscounted
    } = this.state;
    const coupon = this.state.coupon;
    console.log("coupon",coupon);
    const shouldShowCouponMessage = this.state.shouldShowCouponMessage;
    const isAuthenticated = this.props.user.email != "";

    return (
      <div>
        <BrowserView device={isBrowser}>
          <div className="order__summarize">
            <p className="order__summarize__title">
              <img
                style={{ paddingRight: "10px" }}
                src={
                  "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/check-pink-min.png"
                }
              />สรุปรายการสั่งซื้อ
            </p>

            <div className="order__summarize__text">
              <div className="col-sm-12" style={{ padding: "0px" }}>
                <div className="col-sm-6">สรุปยอดรวม</div>
                <div className="col-sm-6 order__summarize__right">
                ฿ {commaNumber(priceBeforeApplyPromotion)}
                </div>
              </div>
              {!this.state.shouldShowCouponbox ? (
                <div
                  className="col-sm-12"
                  style={{ padding: "0px", color: "grey" }}
                >
                  <div className="col-sm-6">ค่าจัดส่ง</div>
                  <div className="col-sm-6 order__summarize__right">
                  ฿ {commaNumber(shippingFee)}
                  </div>
                </div>
              ) : null}

              <div className="col-sm-12 order__summarize__right order__summarize__free">
                ส่งฟรี! เมื่อซื้อครบ 499 บาท 
              </div>
              {this.state.coupon.amount !== 0 ? (
                <div
                  className="col-sm-12"
                  style={{ padding: "0px", color: "grey" }}
                >
                  <div className="col-sm-6">PROMO {this.state.coupon.name}</div>
                  <div className="col-sm-6 order__summarize__right">
                    -
                    ฿                    
                    {/* {commaNumber(this.state.coupon.amount)} */}
                    {commaNumber(priceDiscounted)}
                  </div>
                </div>
              ) : null}
              
              <div className="col-sm-5" style={{ fontSize: "35px",fontFamily: "db_heavent_med" }}>
                รวม
              </div>
              <div className="col-sm-7 order__summarize__right order__summarize__total__price">
              ฿ {commaNumber(paidAmount)}
              </div>
              
            
              <div className="col-sm-12">
                <div className="col-sm-6" style={{ paddingLeft: "0px"}}>
                  <Link href="/productOrder">
                  <button className="button order__summarize__button2 ">
                    แก้ไขรายการสินค้า
                  </button>
                  </Link>
                </div>
                <div className="col-sm-6" style={{ padding: "0px" }}>
                  <button
                    className="button order__summarize__button2 "
                    onClick={this.onNextHandler}
                  >
                    ดำเนินการต่อ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </BrowserView>
        <MobileView device={isMobile}>
          <div className="order__summarize__mobile">
            <p className="order__summarize__title">
              <img
                style={{ paddingRight: "10px" }}
                src={
                  "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/check-pink-min.png"
                }
              />สรุปรายการสั่งซื้อ
            </p>
            
            <div className="order__summarize__text">
              <div className="col-sm-12" style={{ padding: "0px" }}>
                <div className="col-sm-6">สรุปยอดรวม</div>
                <div className="col-sm-6 order__summarize__right">
                ฿ {commaNumber(priceBeforeApplyPromotion)} 
                </div>
              </div>
              {!this.state.shouldShowCouponbox ? (
                <div
                  className="col-sm-12"
                  style={{ padding: "0px", color: "grey" }}
                >
                  <div className="col-sm-6">ค่าจัดส่ง</div>
                  <div className="col-sm-6 order__summarize__right">
                  ฿ {commaNumber(shippingFee)}
                  </div>
                </div>
              ) : null}

              <div className="col-sm-12 order__summarize__right order__summarize__free">
                ส่งฟรี! เมื่อซื้อครบ 499 บาท 
              </div>
              {this.state.coupon.amount !== 0 ? (
                <div
                  className="col-sm-12"
                  style={{ padding: "0px", color: "grey" }}
                >
                  <div className="col-sm-6">PROMO {this.state.coupon.name}</div>
                  <div className="col-sm-6 order__summarize__right">
                  -
                  ฿                    
                  {/* {commaNumber(this.state.coupon.amount)} */}
                  {commaNumber(priceDiscounted)}
                </div>
                </div>
              ) : null}
              <div className="col-sm-5" style={{ fontSize: "35px", padding: "0px !important",fontFamily: "db_heavent_med" }}>
                รวม
              </div>
              <div className="col-sm-7 order__summarize__right order__summarize__total__price" style={{padding: "0px !important"}}>
              ฿ {commaNumber(paidAmount)} 
              </div>
             
              
              <div className="col-sm-12">
                <div className="col-sm-6" style={{ paddingLeft: "0px"}}>
                  <Link href="/productOrder">
                  <button className="button order__summarize__button2 ">
                    แก้ไขรายการสินค้า
                  </button>
                  </Link>
                </div>
                <div className="col-sm-6" style={{ padding: "0px" }}>
                  <button
                    className="button order__summarize__button2 "
                    onClick={this.onNextHandler}
                  >
                    ดำเนินการต่อ
                  </button>
                </div>
              </div>
             
            </div>
          </div>
        </MobileView>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.myCart.products || [],
    myCart: state.myCart,
    user: state.user,
    coupon: state.coupon,
    order: state.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchStartCheckCoupon: name => dispatch(startCheckCoupon(name)),
    dispatchSetProducts: products => dispatch(setProductsToOrder(products))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  OrderSummarizeCarryprocess
);
