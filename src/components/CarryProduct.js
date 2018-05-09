import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import {
  setCarrier,
  set,
  setProductsToOrder,
  sendOrderToServer
} from "../actions/order";
import * as CARRY from "../constants/carry";
import * as ORDER from "../constants/order";
import { isInBangkokAndMetropolitianRegion } from "../calculator/carry";

import Link from 'next/link';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import { asyncGetSummaryPriceFromServer } from "../calculator/products";


class CarryProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delivery_type: "",
      error: "",
      setDefault: true,
      isNearBangkok: true,
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

  onCarrierSelect = type => {
    this.props.dispatchSetCarrier(type);
   
    this.setState({ delivery_type: type, setDefault: false });
  };
  onNextHandler = async () => {
    const products = this.props.myCart.products;
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
    const order_address = this.props.order.addresss;
    console.log("order_address",order_address);
    this.props.onNext();

  };
  mapDeliveryTypeToValue = type => {
    return this.state.delivery_type === type;
  };
  async componentDidMount() {
    this.onCarrierSelect(CARRY.THAILAND_POST.EMS.type);
    const products = this.props.products;
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
   console.log("paidAmount++",paidAmount);
    this.setState({
      paidAmount:paidAmount,
      shippingFee:shippingFee,
      priceBeforeApplyPromotion:priceBeforeApplyPromotion,
      priceDiscounted:priceDiscounted,
      idSelected: 0 
    });
  }
  componentWillUnmount() {}
  componentWillReceiveProps(props) {
    const address = props.order.address;
    const province = address.province;
    const isNearBangkok = isInBangkokAndMetropolitianRegion(province);
    // console.log("isNearBangkok",isNearBangkok);
    if(isNearBangkok){
      this.setState({ isNearBangkok: true });
    } else {
      this.setState({ isNearBangkok: false });
    }
  }
  render() {
    console.log("this.state",this.state);
    const paidAmount = this.state.paidAmount || "";
    return (
      <div>
      <BrowserView device={isBrowser}>
        <div className="order__summarize" style={{marginTop: "60px", height: "350px"}}>
          <p className="order__summarize__title">
            <img
              style={{ paddingRight: "10px" , width: "50px", height: "25px"}}
              src={
                "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/shipping-pink-min.png"
              }
            />วิธีการจัดส่ง
          </p>
          <div className="carry_option">
            <img
            className="img_shipping"
            src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/thaipost-logo-min.png"
          />  <br/>
            <input
              type="radio"
              name="delivery_type"
              checked={  this.mapDeliveryTypeToValue(CARRY.THAILAND_POST.EMS.type)}
              onChange={() => {
                this.onCarrierSelect(CARRY.THAILAND_POST.EMS.type);
              }}
              id="THAILAND_POST_EMS"
            />
            <label htmlFor="THAILAND_POST_EMS" style={{cursor: "pointer"}}>
              {CARRY.THAILAND_POST.EMS.label + " "}
              <p className="carry_option__subtitle">
                {CARRY.THAILAND_POST.EMS.deliveryTimeString}
              </p>{" "}
            </label>
          </div>
          <div className="carry_option">
            
            <input
              type="radio"
              name="delivery_type"
              checked={  this.mapDeliveryTypeToValue(CARRY.THAILAND_POST.COMMON.type)}
              onChange={() => {
                this.onCarrierSelect(CARRY.THAILAND_POST.COMMON.type);
              }}
              id="THAILAND_POST_COMMON"
            />
            <label htmlFor="THAILAND_POST_COMMON" style={{cursor: "pointer"}}>
              {CARRY.THAILAND_POST.COMMON.label + " "}
              <p className="carry_option__subtitle">
                {CARRY.THAILAND_POST.COMMON.deliveryTimeString}
              </p>{" "}
            </label>
          </div>
         { paidAmount >= 499
           ? <div className="carry_option" style={{height:"32px"}} ></div>:
          <div className="carry_option">
            <input
              type="radio"
              name="delivery_type"
              checked={this.mapDeliveryTypeToValue(
                CARRY.THAILAND_POST.REGISTER.type
              )}
              onChange={() => {
                this.onCarrierSelect(CARRY.THAILAND_POST.REGISTER.type);
              }}
              id="THAILAND_POST_REGISTER"
            />
            
            <label htmlFor="THAILAND_POST_REGISTER" style={{cursor: "pointer"}}>
              {CARRY.THAILAND_POST.REGISTER.label + " "}
              <p className="carry_option__subtitle">
                {CARRY.THAILAND_POST.REGISTER.deliveryTimeString}
              </p>{" "}
            </label>
          </div> 

         }
         
          { this.state.isNearBangkok ?
            <div  className="carry_option" style={{height:"7px"}}>
              {/* <p style={{margin: "0px"}}>เลือกวิธีการจัดส่ง</p> */}
              {/* <img
                className="img_shipping"
                src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/quantium-logo-min.png"
              /> <br/>
              <input
              type="radio"
              name="delivery_type"
              checked={this.mapDeliveryTypeToValue(CARRY.QUANTIUM_SOLUTIONS.type)}
              onChange={() => {
                this.onCarrierSelect(CARRY.QUANTIUM_SOLUTIONS.type);
              }}
              id="quantitium_solution"
            />
            <label htmlFor="quantitium_solution" style={{cursor: "pointer"}}>
              
              {CARRY.QUANTIUM_SOLUTIONS.label+ " "}
              <p className="carry_option__subtitle">{CARRY.QUANTIUM_SOLUTIONS.deliveryTimeString}</p>
            </label> */}
              
            </div>
          : <div  className="carry_option" style={{height:"7px"}}></div>}
          {/* <div className="carry_option">
            <input
              type="radio"
              name="delivery_type"
              checked={this.mapDeliveryTypeToValue(
                CARRY.THAILAND_POST.COMMON.type
              )}
              onChange={() => {
                this.onCarrierSelect(CARRY.THAILAND_POST.COMMON.type);
              }}
            />
            <label htmlFor="shipping_1">
              {CARRY.THAILAND_POST.COMMON.label}
              <p className="carry_option__subtitle">
                {CARRY.THAILAND_POST.COMMON.deliveryTimeString}
              </p>
            </label>
          </div> */}
          
          <p className="warning__carry">*กรณีที่อยู่สำหรับจัดส่งอยู่นอกเหนือจากกรุงเทพและปริมณฑลสามารถเลือกวิธีการจัดส่งเป็นไปรษณีย์ไทยได้อย่างเดียวเท่านั้น</p>
        </div>
      </BrowserView>
      <MobileView device={isMobile}>
      
        <div className="order__summarize__mobile">
        <p className="order__summarize__title">
            <img
              style={{ paddingRight: "10px" , width: "50px", height: "25px"}}
              src={
                "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/shipping-pink-min.png"
              }
            />วิธีการจัดส่ง
          </p>
          <div className="carry_option">
            <img
            className="img_shipping"
            src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/thaipost-logo-min.png"
          />  <br/>
            <input
              type="radio"
              name="delivery_type"
              checked={  this.mapDeliveryTypeToValue(CARRY.THAILAND_POST.EMS.type)}
              onChange={() => {
                this.onCarrierSelect(CARRY.THAILAND_POST.EMS.type);
              }}
              id="THAILAND_POST_EMS"
            />
            <label htmlFor="THAILAND_POST_EMS" style={{cursor: "pointer"}}>
              {CARRY.THAILAND_POST.EMS.label + " "}
              <p className="carry_option__subtitle">
                {CARRY.THAILAND_POST.EMS.deliveryTimeString}
              </p>{" "}
            </label>
          </div>

          <div className="carry_option">
            
            <input
              type="radio"
              name="delivery_type"
              checked={  this.mapDeliveryTypeToValue(CARRY.THAILAND_POST.COMMON.type)}
              onChange={() => {
                this.onCarrierSelect(CARRY.THAILAND_POST.COMMON.type);
              }}
              id="THAILAND_POST_COMMON"
            />
            <label htmlFor="THAILAND_POST_COMMON" style={{cursor: "pointer"}}>
              {CARRY.THAILAND_POST.COMMON.label + " "}
              <p className="carry_option__subtitle">
                {CARRY.THAILAND_POST.COMMON.deliveryTimeString}
              </p>{" "}
            </label>
          </div>
          
         { paidAmount >= 499
           ? <div className="carry_option" style={{height:"32px"}} ></div>:
          <div className="carry_option">
            <input
              type="radio"
              name="delivery_type"
              checked={this.mapDeliveryTypeToValue(
                CARRY.THAILAND_POST.REGISTER.type
              )}
              onChange={() => {
                this.onCarrierSelect(CARRY.THAILAND_POST.REGISTER.type);
              }}
              id="THAILAND_POST_REGISTER"
            />
            
            <label htmlFor="THAILAND_POST_REGISTER" style={{cursor: "pointer"}}>
              {CARRY.THAILAND_POST.REGISTER.label + " "}
              <p className="carry_option__subtitle">
                {CARRY.THAILAND_POST.REGISTER.deliveryTimeString}
              </p>{" "}
            </label>
          </div> 

         }
          { this.state.isNearBangkok ?
            <div  className="carry_option" style={{height:"7px"}}>
              {/* <p style={{margin: "0px"}}>เลือกวิธีการจัดส่ง</p> */}
              {/* <img
                className="img_shipping"
                src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/quantium-logo-min.png"
              /> <br/>
              <input
              type="radio"
              name="delivery_type"
              checked={this.mapDeliveryTypeToValue(CARRY.QUANTIUM_SOLUTIONS.type)}
              onChange={() => {
                this.onCarrierSelect(CARRY.QUANTIUM_SOLUTIONS.type);
              }}
              id="quantitium_solution"
            />
            <label htmlFor="quantitium_solution" style={{cursor: "pointer"}}>
              
              {CARRY.QUANTIUM_SOLUTIONS.label+ " "}
              <p className="carry_option__subtitle">{CARRY.QUANTIUM_SOLUTIONS.deliveryTimeString}</p>
            </label> */}
              
            </div>
          : <div  className="carry_option" style={{height:"7px"}}></div>} 
          {/* <div className="carry_option">
            <input
              type="radio"
              name="delivery_type"
              checked={this.mapDeliveryTypeToValue(
                CARRY.THAILAND_POST.COMMON.type
              )}
              onChange={() => {
                this.onCarrierSelect(CARRY.THAILAND_POST.COMMON.type);
              }}
            />
            <label htmlFor="shipping_1">
              {CARRY.THAILAND_POST.COMMON.label}
              <p className="carry_option__subtitle">
                {CARRY.THAILAND_POST.COMMON.deliveryTimeString}
              </p>
            </label>
          </div> */}
          
          <p className="warning__carry">*กรณีที่อยู่สำหรับจัดส่งอยู่นอกเหนือจากกรุงเทพและปริมณฑลสามารถเลือกวิธีการจัดส่งเป็นไปรษณีย์ไทยได้อย่างเดียวเท่านั้น</p>
        
        </div>
        
      </MobileView>
      </div>
      
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.myCart.products || [],
    user: state.user,
    myCart: state.myCart,
    order: state.order,
    coupon:state.coupon
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSetCarrier: carrier => dispatch(setCarrier(carrier)),
    dispatchSetProducts: products => dispatch(setProductsToOrder(products))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarryProduct);
