import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Router from "next/router";
import { firebase } from "../firebase/firebase";
import withRedux from "next-redux-wrapper";
import configureStore from "../store/configureStore";
import * as API from "../constants/apiURL";
import { addAddressInfoToUser, deleteAddressInfoToUser } from "../actions/user";
import { setAddressToOrder, removeAddressToOrder } from "../actions/order";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


class AddressForm extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      idSelected: -1
    };
  }
  onAddAddress = () => {
    this.props.onAdd();
  };
  onEditAddress = index => {
    this.props.onEdit(index);
  };
  onDeleteAddress = index => {
    // console.log("im in");
    this.props.dispatchDeleteAddressInfoToUser(index);
  };
  onSelectedAddress = id => {
    // console.log("im in");
    const {
      dispatchSetAddressToOrder,
      dispatchRemoveAddressToOrder
    } = this.props;
    if (id === this.state.idSelected) {
      dispatchRemoveAddressToOrder();
      // console.log("address remove");
      this.setState({ idSelected: -1 });
    } else {
      // console.log("Click", this.props.user.addressList[id]);
      const addressList = this.props.user.addressList;
      const address = addressList[id]
      dispatchSetAddressToOrder( address )
      // console.log("address",address);
      this.setState({ idSelected: id });
    }
  };
  onclickTest = (e) => {
    console.log("test");
  }
  componentDidMount() {
    this.onSelectedAddress(0);
    this.setState({ idSelected: 0 });
  }
  componentWillUnmount() {}

  render() {
    const address = this.props.user.addressList || [{}];
    return (
      <div>
        <BrowserView device={isBrowser}>
        <div className="col-sm-8 address__table">
          {this.state.error && <p>{this.state.error}</p>}
          <div className="col-sm-12">
            <p className="table__title">
              <img
                style={{ paddingRight: "10px" }}
                src={
                  "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/address-pink-min.png"
                }
              />ที่อยู่สำหรับจัดส่ง
            </p>
          </div>
          <div className="choose__address__body">
            <div className="col-sm-12 choose__address__title">
              เลือกที่อยู่ที่ต้องการจัดส่ง
            </div>
            <div className="col-sm-12" style={{padding:"0px"}}>
              {address.map((address, index) => {
                const {
                  name,
                  province,
                  district,
                  quarter,
                  zipCode,
                  addressDetail,
                  phoneNumber
                } = address;
                const longAddress = addressDetail +" " +quarter +" " +district +" " +province +" " +zipCode;
                const longAddressBriefly = longAddress.length > 70? longAddress.substring(0, 69) +" ...": longAddress;
                return (
                  
                  <div key={index} className="col-sm-6" style={{padding:"0px"}}>
                    <div className="choose__address__container">
                      <div className="col-sm-12 choose__address__edit_delete">
                        <a onClick={() => this.onEditAddress(index)} style={{cursor: "pointer", marginRight: "15px"}}>แก้ไข</a>
                        <button
                          className="button button--my-basket"
                          onClick={() => this.onDeleteAddress(index)}
                        >
                          <img
                            style={{ width: "10px", height: "10px" }}
                            src={
                              "https://image.flaticon.com/icons/png/128/59/59836.png"
                            }
                          />
                        </button>
                      </div>
                      <p style={{lineHeight: "27px"}}>ชื่อผู้รับสินค้า: {name} </p>
                      <p style={{lineHeight: "27px"}}>เบอร์โทร: {phoneNumber} </p>
                      <p style={{lineHeight: "27px"}}>
                        ที่อยู่: {longAddressBriefly}
                      </p>
                      <div className="choose__address__button__body">
                        <button
                          className={
                            "button choose__address__button " +
                            (this.state.idSelected == index
                              ? "choose__address__button__selected "
                              : "")
                          }
                          onClick={() => this.onSelectedAddress(index)} 
                        >
                          จัดส่งที่อยู่ตามนี้
                        </button>
                      </div>
                    </div>
                  </div>
                
                );
              })}
              <div className="col-sm-6 " style={{padding:"0px"}}>
              <div className="add__more__address">
                <button onClick={() => this.onAddAddress()}>
                  <img
                    src={
                      "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/add-address-pink-min.png"
                    }
                  />
                  <p style={{fontSize: "20px"}}>เพิ่มที่อยู่จัดส่ง</p>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
        </BrowserView>
        <MobileView device={isMobile}>
          <div className="col-sm-12 address__table">
            {this.state.error && <p>{this.state.error}</p>}
            <div className="col-sm-12">
              <p className="table__title">
                <img
                  style={{ paddingRight: "10px" }}
                  src={
                    "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/address-pink-min.png"
                  }
                />ที่อยู่สำหรับจัดส่ง
              </p>
            </div>
            <div className="choose__address__body">
              <div className="col-sm-12 choose__address__title">
                เลือกที่อยู่ที่ต้องการจัดส่ง
              </div>
              <div className="col-sm-12" style={{padding:"0px"}}>
                {address.map((address, index) => {
                  const {
                    name,
                    province,
                    district,
                    quarter,
                    zipCode,
                    addressDetail,
                    phoneNumber
                  } = address;
                  return (
                    
                    <div key={index} className="col-sm-6" style={{padding:"0px"}}>
                      <div className="choose__address__container">
                        <div className="col-sm-12 choose__address__edit_delete">
                          <a onClick={() => this.onEditAddress(index)}>แก้ไข</a>
                          <button
                            className="button button--my-basket"
                            onClick={() => this.onDeleteAddress(index)}
                          >
                            <img
                              style={{ width: "10px", height: "10px" }}
                              src={
                                "https://image.flaticon.com/icons/png/128/59/59836.png"
                              }
                            />
                          </button>
                        </div>
                        <p>ชื่อผู้รับสินค้า: {name} </p>
                        <p>เบอร์โทร: {phoneNumber} </p>
                        <p style={{height:"49px" ,lineHeight: "110%" ,overflow: "hidden"}}>
                          ที่อยู่: {addressDetail} {quarter} {district} {province}{" "}
                          {zipCode}{" "}
                        </p>
                        <div
                          className="choose__address__button__body"
                        
                        >
                          <button
                            className={
                              "button choose__address__button " +
                              (this.state.idSelected == index
                                ? "choose__address__button__selected "
                                : "")
                            }
                            onClick={() => this.onSelectedAddress(index)} 
                          >
                            จัดส่งที่อยู่ตามนี้
                          </button>
                        </div>
                      </div>
                    </div>
                  
                  );
                })}
                <div className="col-sm-6 ">
                  <div className="add__more__address">
                    <button onClick={() => this.onAddAddress()}>
                      <img
                        src={
                          "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/add-address-pink-min.png"
                        }
                      />
                      <p style={{fontSize: "20px"}}>เพิ่มที่อยู่จัดส่ง</p>
                    </button>
                  </div>
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
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchAddAddressInfoToUser: address =>
      dispatch(addAddressInfoToUser(address)),
    dispatchDeleteAddressInfoToUser: index =>
      dispatch(deleteAddressInfoToUser(index)),
    dispatchSetAddressToOrder: address => dispatch(setAddressToOrder(address)),
    dispatchRemoveAddressToOrder: () => dispatch(removeAddressToOrder())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
