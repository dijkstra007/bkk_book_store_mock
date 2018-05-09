import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import { clearMyCart } from "../actions/cart";
import { setPaymentType, sendOrderToServer } from "../actions/order";
import * as ORDER from "../constants/order";
import moment from "moment";
import axios from "axios";
import * as API from "../constants/apiURL";
import KBankForm from './KBankForm';
class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_type: "",
      error: "",
      formData: {
        MERCHANT2: "",
        TERM2: "",
        AMOUNT2: "",
        URL2: "",
        RESPURL: "",
        IPCUST2: "",
        DETAIL2: "",
        INVMERCHANT: "",
        CHECKSUM: "",
        TIMEOUT: null,
      },
      paymentURL: null
    };
  }
  async componentDidMount() {
    const res = await axios({
      url: API.GET_PAYMENT_URL,
      method: "GET"
    });
    const paymentURL = res.data;
    this.setState({
      paymentURL: paymentURL
    });
  }
  mapPaymentTypeToValue = type => {
    return this.state.payment_type === type;
  };
  onNextHandler = async () => {
    if (this.state.payment_type !== "") {
      const user = this.props.user;
      this.props.setOrderPaymentType(this.state.payment_type);
      const data = await this.confirmOrder(this.state);
      console.log("submitPaymentForm", data);
      if (data.ok) {
        if (this.state.payment_type == "credit") {
          this.setState({
            formData: data.kapiFormData
          });
          document.sendform.submit();
          Router.push(`/purchaseHistory`, "/purchaseHistory", {
            shallow: true
          });
        } else {
          this.props.onNext();
        }
      } else {
        if (data.error === "EMPTY_STOCK") {
          alert("ไม่มีสินค้า");
        }else if (data.error === "STOCK_NOT_ENOUGH"){
          alert("จำนวนสินค้าในสต็อกไม่เพียงพอ")
        }
      }
    } else {
      this.setState({ error: "*กรุณากรอกช่องทางการชำระเงิน" });
      // console.log("this.state.payment_type", this.state.payment_type);
      // alert("this.state.payment_type",this.state.payment_type);
    }
  };
  confirmOrder = async state => {
    // console.log(state,this.state);
    const products = this.props.myCart.products;
    const name = this.props.user.displayName;
    const email = this.props.user.email;
    const coupon = this.props.coupon.name;
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
      paymentType: state.payment_type,
      customerName: name || email.substring(0, email.indexOf("@")),
      email: email,
      coupon: coupon
    };
    // console.log(myOrder);
    return sendOrderToServer(myOrder);
  };
  onPreviousHandler = () => {
    this.props.onPre();
  };

  render() {
    return (
      <div>
        <div className="col-sm-12 product__cart__table">
          <KBankForm
            name = {'sendform'}
            formData={this.state.formData}
            paymentURL={this.state.paymentURL}
          />
          <p className="table__title">
            <img
              style={{ paddingRight: "10px" }}
              src={
                "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/payment-pink-min.png"
              }
            />
            ช่องทางการชำระเงิน
          </p>
          <div className="payment__body">
            <div id="shipping">
              <div>
                <p style={{ fontSize: "24px" }} className="warning__carry">
                  {this.state.error}
                </p>
                <input
                  type="radio"
                  name="payment"
                  id="credit"
                  checked={this.mapPaymentTypeToValue("credit")}
                  onChange={() => {
                    this.setState({ payment_type: "credit" });
                  }}
                />
                <label htmlFor="credit" style={{ cursor: "pointer" }}>
                  {" "}
                  บัตรเครดิต/เดบิต{" "}
                </label>
                <br />
              </div>
              <div>
                <input
                  type="radio"
                  name="payment"
                  id="bank"
                  checked={this.mapPaymentTypeToValue("bank")}
                  onChange={() => {
                    this.setState({ payment_type: "bank" });
                  }}
                />
                <label htmlFor="bank" style={{ cursor: "pointer" }}>
                  {" "}
                  โอนเงินผ่านธนาคาร{" "}
                </label>
                <br />
              </div>
              {/* <div>
                <input type="radio" name="payment" id="cash" checked={this.mapPaymentTypeToValue("cash")} 
                  onChange={() => {this.setState({ payment_type: "cash" });}} />
                <label htmlFor="cash" style={{cursor: "pointer"}}> เก็บเงินปลายทาง </label><br />
              </div> */}
            </div>
            {this.state.payment_type == "cash" ? (
              <div className="paymeny__by__cash">
                <h4> ชำระเงินเมื่อได้รับสินค้า </h4>
                <p>
                  1. บริษัทขนส่งจะติดต่อท่านเพื่อนัดวัน และเวลาการจัดส่งสินค้า
                </p>
                <p>
                  2. เมื่อสินค้าได้รับการจัดส่ง
                  ท่านหรือตัวแทนต้องลงนามรับสินค้าและชำระเงินเพื่อรับสินค้า
                </p>
                <p>3. ตรวจสอบสถานะสินค้าจาก บัญชีของฉัน </p>
                <p>ขอให้สนุกกับการช้อปปิ้ง!</p>
              </div>
            ) : null}
            {this.state.payment_type == "bank" ? (
              <div className="col-sm-12 paymeny__by__cash">
                <div className="col-sm-12" style={{ padding: "30px 0px" }}>
                  <div className="col-sm-6">
                    <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {" "}
                      บริษัท ซี.เจ. เอ็กซ์เพรส กรุ๊ป จำกัด{" "}
                    </span>
                    <br />
                    {/* <img className="img__bank"
                      src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/kbank-min.png"}/>
                    ธนาคารกสิกรไทย สาขาสำนักสีลม<br/> */}
                    <img
                      className="img__bank"
                      src={
                        "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/scb-min.png"
                      }
                    />
                    ธนาคารไทยพาณิชย์ สาขาปาโซ่ ทาวเวอร์
                  </div>
                  <div className="col-sm-6">
                    {/* <br/>001-1-36731-3 */}
                    <br />245-2-08524-2
                  </div>
                </div>
                <div
                  className="col-sm-12"
                  style={{ textAlign: "center" }}
                >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thbody>
                    <tr style={{ verticalAlign: "middle" }}>
                      <td
                        colSpan="2"
                        style={{
                          textAlign: "center",
                          fontSize: "24px",
                          fontWeight: "bold"
                        }}
                      >
                        สำหรับธนาคารอื่น
                      </td>
                    </tr>
                    <tr style={{ verticalAlign: "middle" }}>
                      <td style={{ textAlign: "right" }}>
                        <img
                          width="200px"
                          src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/prompt-pay-min.png"
                        />
                      </td>
                      <td style={{ textAlign: "left" }}>
                        สามารถชำระผ่านพร้อมเพย์
                        (โอนผ่านธนาคารไม่เสียค่าธรรมเนียม)<br />เลขประจำตัวผู้เสียภาษี
                        0-1055-56055-49-1 หรือ สแกน QR Code
                      </td>
                    </tr>
                    <tr style={{ verticalAlign: "middle" }}>
                      <td colSpan="2" style={{ textAlign: "center" }}>
                        <img src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/QR-min.JPG" />
                      </td>
                    </tr>
                  </thbody>
                </table>
                </div>
                <div
                  className="col-sm-12"
                  style={{ textAlign: "center", padding: "35px 0px" }}
                >
                  หลังจากโอนเงินชำระค่าสินค้าเรียบร้อยแล้ว
                  รบกวนลูกค้าแจ้งชำระเงิน<br />โดยส่งหลักฐานการชำระเงินทางช่องทางนี้
                  บัญชีของฉัน > รายการสั่งซื้อ > แจ้งชำระเงิน<br />
                  หรือส่งหลักฐานการชำระเงินพร้อมระบุเลขที่สั่งซื้อมาที่ Line ,
                  E-mail หรือ Page Facebook<br />
                  <span className="check__status">
                    Line : @nineti9 | E-mail : contact@nineti9.com | Facebook :
                    Nineti9{" "}
                  </span>
                  <br />
                </div>
              </div>
            ) : null}
            <div className="col-sm-12" style={{ textAlign: "right" }}>
              <button
                className="button process__button choose__address__button__selected"
                onClick={() => this.onPreviousHandler()}
              >
                แก้ไขช่องทางการจัดส่ง
              </button>
              <button
                className="button process__button choose__address__button__selected"
                onClick={() => {
                  this.onNextHandler();
                }}
              >
                ยืนยันการสั่งซื้อ
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12" style={{ height: "50px" }} />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  setOrderPaymentType: paymentType => {
    return dispatch(setPaymentType(paymentType));
  },
  dispatchClearMyCart: () => dispatch(clearMyCart())
});

const mapStateToProps = state => {
  return {
    user: state.user,
    myCart: state.myCart,
    order: state.order,
    coupon: state.coupon
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
