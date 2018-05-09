import React from "react";
import { connect } from "react-redux";
import Router from "next/router";
import CartProductListItem from "./CartProductListItem";
import { startCheckCoupon } from "../actions/coupon";
import { getCarrier } from "../actions/order";
import * as headerAction from "../actions/header";
import { getTransportationPrice } from "../calculator/carry";
import { asyncGetSummaryPriceFromServer } from "../calculator/products";
import Link from "next/link";
import commaNumber from 'comma-number';

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

const CouponMessage = ({ coupon }) => {
  let message = "";
  if (coupon.isExpired) {
    message = TEXT.COUPON_EXPIRED;
  } else if (coupon.ok) {
    if (coupon.type === "PERCENTAGE_DISCOUNT") {
      message = TEXT.COUPON_VALID + ` ${coupon.amount} %`;
    } else {
      message = TEXT.COUPON_VALID + ` ${coupon.amount} บาท`;
    }
  } else {
    message = coupon.message;
  }
  return (
    <div className={coupon.ok ? "text_is_valid" : "text_is_invalid"}>
      {message}
    </div>
  );
};
class OrderSummarize extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        profileimage: "",
        name: "",
        email: "",
        password: ""
      },
      coupon: props.coupon || {
        name: "",
        type: "",
        amount: 0,
        expiry_date: 0,
        isValid: undefined
      },
      shouldShowCouponMessage: false,
      shouldShowCouponbox: true,
      paidAmount: undefined,
      shippingFee: undefined,
      priceBeforeApplyPromotion: undefined,
      priceDiscounted: undefined
    };
  }
  async componentDidMount() {
    let showCoupon = this.state.shouldShowCouponbox;
    const products = this.props.myCart.products || []
    if (this.props.showCoupon !== undefined) {
      showCoupon = this.props.showCoupon;
    }
    const res = await asyncGetSummaryPriceFromServer({
      products: products,
      coupon: coupon
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
    console.log("props coupon",props.coupon)
    const res = await asyncGetSummaryPriceFromServer({
      products: products,
      coupon: coupon
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
  onCouponTextChange = e => {
    const coupon = {
      ...this.state.coupon,
      name: e.target.value
    };
    this.setState({ coupon: coupon });
  };
  onCheckCouponClick = () => {
    const couponName = this.state.coupon.name;
    this.props.dispatchStartCheckCoupon(couponName, this.state.priceBeforeApplyPromotion).then(() => {
      this.setState({ shouldShowCouponMessage: true });
    });
  };

  onNextClick = () => {
    const user = this.props.user;
    if (user && user.uid != "") {
      Router.replace({
        pathname: "/carryProcess"
      });
    } else {
      this.props.showQuickLoginForm();
    }
  };
  render() {
    const products = this.props.products || [];
    const coupon = this.state.coupon;
    const {
      paidAmount,
      shippingFee,
      priceBeforeApplyPromotion,
      priceDiscounted
    } = this.state;
    const shouldShowCouponMessage = this.state.shouldShowCouponMessage;
    const isAuthenticated = this.props.user.email != "";

    return (
      <div>
        <BrowserView device={isBrowser}>
        
          <div id="sum-box" className="order__summarize">
            <p className="order__summarize__title">
              <img
                style={{ paddingRight: "10px" }}
                src={
                  "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/check-pink-min.png"
                }
              />สรุปรายการสั่งซื้อ
            </p>
            {this.state.shouldShowCouponbox ? (
              <div>
                <p className="order__summarize__code">
                  ใส่โค้ด / รหัสโปรโมชั่น
                </p>
                <input
                  type="text"
                  placeholder="Enter Code"
                  className="order__summarize__input"
                  onChange={this.onCouponTextChange}
                  value={this.state.coupon.name}
                />
                <button
                  className="button order__summarize__button1 "
                  onClick={this.onCheckCouponClick}
                >
                  ยืนยันรหัส
                </button>

                {shouldShowCouponMessage ? (
                  <CouponMessage coupon={coupon} />
                ) : null}
                <hr style={{margin: "6px 0px"}} />
              </div>
            ) : null}
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
                  ฿ {commaNumber(CarrierFee)} 
                  </div>
                </div>
              ) : null}

              <div className="col-sm-12 order__summarize__right order__summarize__free" style={{lineHeight: "10px"}}>
                ส่งฟรี! เมื่อซื้อครบ 499 บาท 
              </div>
              {this.state.coupon.amount !== 0 ? (
                <div
                  className="col-sm-12"
                  style={{ padding: "0px", color: "grey" }}
                >
                  <div className="col-sm-6">PROMO {this.state.coupon.name}</div>
                  <div className="col-sm-6 order__summarize__right">
                    - ฿{" "}
                    {/* {commaNumber(this.state.coupon.amount)} */}
                    {commaNumber(priceDiscounted)}
                  </div>
                </div>
              ) : null}
              <div className="col-sm-5" style={{ fontSize: "35px" ,fontFamily: "db_heavent_med"}}>
                รวม
              </div>
              <div className="col-sm-7 order__summarize__right order__summarize__total__price">
              ฿ {commaNumber(paidAmount)}
              </div>
              {this.state.shouldShowCouponbox ? (
                <div>
                  <div className="col-sm-6" style={{ padding: "5px" }}>
                    <Link href="/">
                      <button className="button order__summarize__button2 ">
                        กลับไปหน้าสินค้า
                      </button>
                    </Link>
                  </div>
                  <div className="col-sm-6" style={{ padding: "5px" }}>
                    {priceBeforeApplyPromotion !== 0 && products !== [] ? (
                      <button
                        className="button order__summarize__button2 "
                        onClick={this.onNextClick}
                      >
                        ดำเนินการต่อ
                      </button>
                    ) : (
                      <button className="button order__summarize__button2 ">
                        ดำเนินการต่อ
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
           
              {priceBeforeApplyPromotion !== 0 && products !== [] ? null : (
              <div style={{ color: "red", fontSize: "20px" }}>
                {"*จำนวนไม่เพียงพอที่จะสั่งซื้อ"}
              </div>
            )}
          </div>
          <div className="col-sm-12" style={{ height: "50px" }} />
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
            {this.state.shouldShowCouponbox ? (
              <div style={{ textAlign: "center" }}>
                <p className="order__summarize__code">
                  ใส่โค้ด / รหัสโปรโมชั่น
                </p>
                <input
                  type="text"
                  placeholder="Enter Code"
                  className="order__summarize__input"
                  onChange={this.onCouponTextChange}
                  value={this.state.coupon.name}
                />
                <button
                  className="button order__summarize__button1 "
                  onClick={this.onCheckCouponClick}
                >
                  ยืนยันรหัส
                </button>

                {shouldShowCouponMessage ? (
                  <CouponMessage coupon={coupon} />
                ) : null}
                <hr />
              </div>
            ) : null}
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
                  ฿ {commaNumber(CarrierFee)}
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
                  - ฿{" "}
                  {/* {commaNumber(this.state.coupon.amount)} */}
                  {commaNumber(priceDiscounted)}
                </div>
                </div>
              ) : null}
              <div className="col-sm-5" style={{ fontSize: "35px" ,fontFamily: "db_heavent_med" }}>
                รวม
              </div>
              <div className="col-sm-7 order__summarize__right order__summarize__total__price">
              ฿ {commaNumber(paidAmount)}
              </div>
              {this.state.shouldShowCouponbox ? (
                <div>
                  <div className="col-sm-6" style={{ padding: "5px" }}>
                    <Link href="/">
                      <button className="button order__summarize__button2 ">
                        กลับไปหน้าสินค้า
                      </button>
                    </Link>
                  </div>
                  <div className="col-sm-6" style={{ padding: "5px" }}>
                    {priceBeforeApplyPromotion !== 0 && products !== [] ? (
                      <button
                        className="button order__summarize__button2 "
                        onClick={this.onNextClick}
                      >
                        ดำเนินการต่อ
                      </button>
                    ) : (
                      <button className="button order__summarize__button2 ">
                        ดำเนินการต่อ
                      </button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
            {priceBeforeApplyPromotion !== 0 && products !== [] ? null : (
              <div style={{ color: "red", fontSize: "20px" }}>
                {"*จำนวนไม่เพียงพอที่จะสั่งซื้อ"}
              </div>
            )}
          </div>
        </MobileView>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myCart: state.myCart,
    user: state.user,
    coupon: state.coupon,
    order: state.order
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchStartCheckCoupon: (name, total) => dispatch(startCheckCoupon(name, total)),
    showQuickLoginForm: () => dispatch(headerAction.forceShowQuickLoginForm())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummarize);
