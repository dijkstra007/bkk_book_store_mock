import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import moment from "moment";

import { firebase } from "../firebase/firebase";
import withRedux from "next-redux-wrapper";
import configureStore from "../store/configureStore";
import * as API from "../constants/apiURL";
import OrderCartItem from "../components/OrderCartItem";
import {getTotalPriceField} from '../selectors/products';
import commaNumber from 'comma-number';
const store = configureStore();

class PurchaseHistoryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchase_info: []
    }
  }


  componentDidMount() {}
  componentWillUnmount() {}
  componentWillReceiveProps(props) {
    const id = this.props.purchaseNumber;
    console.log("id",id);
    const obj = {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        email: this.props.user.email
      }
    };
    fetch(API.GET_PURCHASE_HISTORY+"/"+id,obj).then(response => {
      return response.json()
    }).then( data => {
      this.setState({purchase_info:data});
    })
  }

  getTextOfPaymentType = (paymentType) => {
    switch(paymentType) {
      case "credit": return "บัตรเครดิต/เดบิต";
      case "bank": return "โอนเงินผ่านธนาคาร";
      default: return "";
    }
  }
  getTextOfCarryType = (carryType) => {
    switch(carryType) {
      case "EMS": return "แบบ EMS";
      case "register": return "แบบ ลงทะเบียน";
      case "Common": return "รับด้วยตนเอง";
      default: return "";
    }
  }
  render() {
    
    const purchase_info = this.state.purchase_info ||  {};
    console.log("purchase_info",purchase_info);
    const paymentType = this.getTextOfPaymentType(purchase_info.paymentType);
    const address = purchase_info.address || {};
    const Name = address.name;
    const AddressDetail = address.addressDetail;
    const zipCode = address.zipCode;
    const quarter = address.quarter;
    const district = address.district;
    const province = address.province;
    const Tel = address.phoneNumber;
    const products = purchase_info.products || [];
    const ProductPrice = getTotalPriceField(products);
    const shippingFee = purchase_info.shippingFee || 0;
    const coupon  = purchase_info.coupon || {};
    const PromoName = coupon.name || '';
    const PromoDiscount = coupon.amount || 0;
    const priceBeforeApplyPromotion = purchase_info.priceBeforeApplyPromotion;
    const priceDiscounted = purchase_info.priceDiscounted;
    const paidAmount = purchase_info.paidAmount;
    const carrier =  this.getTextOfCarryType(purchase_info.carrier);
    // const date = moment(parseInt(purchase_info.createAt)).format('L');
    const year = moment(parseInt(purchase_info.createAt)).get('year');
    const month = moment(parseInt(purchase_info.createAt)).get('month');
    const date = moment(parseInt(purchase_info.createAt)).get('date');
    const time = moment(parseInt(purchase_info.createAt)).get('hours');
    console.log("time",time);
    return (
      <div className="col-sm-9" >
        <div className="table__history__title">
            รายละเอียดการสั่งซื้อ
        </div>
        <div className="purchaseHistory__table">
          <div className="purchaseHistory__detail__body">
               <div>
                    <div className="purchaseHistory__detail__address">
                      <div className="col-sm-6">
                        <p style={{fontFamily: "db_heavent"}}>ข้อมูลการสั่งซื้อ</p>
                        <p>เลขที่สั่งซื้อ : {purchase_info.orderID}  </p>
                        <p>Tracking No. : {purchase_info.trackingNumber}</p>
                        <p>วันที่ : {date+"/"+(month+1)+"/"+year}</p>
                        <p>สถานะ : {purchase_info.status}</p>
                        <p>วิธีการชำระเงิน : {paymentType}</p>
                        <p>วิธีการจัดส่ง : {carrier}</p>

                      </div>
                      <div className="col-sm-6">
                        <p style={{fontFamily: "db_heavent"}}>ข้อมูลที่อยู่สำหรับจัดส่ง</p>
                        <p>ชื่อผู้รับสินค้า:{Name} </p>
                        <p>ที่อยู่: {AddressDetail} {quarter} {district} {zipCode} {province}</p>
                        <p>เบอร์โทร: {Tel}</p>
                      </div>
                    </div>
                    <div className="purchase__cart__body col-sm-10">      
                      <p style={{fontSize: "26px"}}>รายการสินค้า</p>
                      <OrderCartItem products={products} />
                    </div>
                    <div className="purchase__summarize__text">
                    <div className="col-sm-4" ></div><div className="col-sm-2" >ยอดรวม</div>
                    <div className="col-sm-6 order__summarize__right">
                    ฿ {commaNumber(priceBeforeApplyPromotion)}
                    </div>
                    <div className="col-sm-4" ></div><div className="col-sm-2"  >ค่าจัดส่ง</div>
                      <div className="col-sm-6 order__summarize__right"  >฿ {commaNumber(shippingFee)}</div>

                    
                      <div style={{ color:"grey"}}>
                      <div className="col-sm-4" ></div>
                        <div className="col-sm-6"  >PROMO {PromoName}</div>
                        <div className="col-sm-2 order__summarize__right">- ฿ {commaNumber(priceDiscounted)}</div>
                      </div>

                    <div className="col-sm-4" ></div>
                    <div className="col-sm-2 order__summarize__total__price" >
                      รวม
                    </div>
                    <div className="col-sm-6 order__summarize__right order__summarize__total__price">
                    ฿ {commaNumber(paidAmount)} 
                    </div>
                    { this.state.shouldShowCouponbox ?
                      <div>
                        <div className="col-sm-6">
                          <button className="button order__summarize__button2 ">
                            กลับไปหน้าสินค้า
                          </button>
                        </div>
                        <div className="col-sm-6">
                          <button className="button order__summarize__button2 ">
                            ดำเนินการต่อ
                          </button>
                        </div>
                      </div>
                    :null}
                  </div>
                  </div>
           

        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("Cart",state.myCart);
  return {
    myCart : state.myCart,
    user: state.user
  };
}
export default connect(mapStateToProps,undefined)(PurchaseHistoryDetail);
