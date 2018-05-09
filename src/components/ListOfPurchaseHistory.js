import React from "react";
import Router from "next/router";
import moment from "moment";
import { connect } from "react-redux";
import Link from "next/link";
import { firebase } from "../firebase/firebase";
import withRedux from "next-redux-wrapper";
import configureStore from "../store/configureStore";
import * as API from "../constants/apiURL";
import MyCartItems from "../components/MyCartItems";
import { getTotalPriceField } from "../selectors/products";
import UploadPaySlip from "./UploadPaySlip";
import Modal from "react-modal";
import commaNumber from "comma-number";
import axios from "axios";
import KBankForm from "./KBankForm";
const store = configureStore();
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "70%",
    minHeight: "60%",
    textAlign: "center",
    padding: "0px"
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)"
  }
};
class ListOfPurchaseHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusPayment: "All",
      purchase_info: [],
      modalIsOpen: false,
      modalID: 0,
      paymentURL: ""
    };
  }

  componentDidMount() {
  }
  componentWillUnmount() {
    Modal.setAppElement("tr");
  }
  async componentWillReceiveProps(props) {
    // const obj = {
    //   url: API.GET_PURCHASE_HISTORY,
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     email: this.props.user.email
    //   }
    // };
    // fetch(API.GET_PURCHASE_HISTORY,obj).then(response => {
    // return response.json()
    // }).then(data => {

    //   this.setState({products:props.myCart.products,purchase_info:data});
    // })
    //TODO: use new login
    const user = this.props.user
    if (user && user.email != "") {
      const res1 = await axios({
        url: API.GET_PURCHASE_HISTORY,
        method: "GET",
        headers: {
          email: user.email
        }
      });
      const res2 = await axios({
        url: API.GET_PAYMENT_URL,
        method: "GET"
      });
      const data = res1.data;
      const paymentURL = res2.data;
      this.setState({
        purchase_info: data,
        paymentURL: paymentURL
      });
    }
  }
  onClickpaymentSlip() {
    this.setState({ modalIsOpen: true });
}
  openModal(orderID) {
    this.setState({ modalIsOpen: true, modalID: orderID });
  }

  onCancelModal() {
    this.setState({ modalIsOpen: false });
  }
  onCloseModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    const purchaseHistory = this.state.purchase_info || [{}];
    console.log("purchaseHistory", purchaseHistory);

    return (
      <div className="col-sm-9">
        <div className="table__history__title">รายการสั่งซื้อ</div>
        {/* <div style={{position: "relative", display: "flex"}}>
          <UploadPaySlip order={"123456"} />
        </div>  */}
        <div className="purchaseHistory__table">
          <div className="filter__purchase__body">
            <input
              type="radio"
              name="delivery_type"
              onClick={() => this.setState({ statusPayment: "All" })}
              id="all_payment"
            />
            <label
              style={{ paddingRight: "5px", cursor: "pointer" }}
              htmlFor="all_payment"
            >
              ทั้งหมด
            </label>
            <input
              type="radio"
              name="delivery_type"
              onClick={() => this.setState({ statusPayment: "UnPaid" })}
              id="no_payment"
            />
            <label
              style={{ paddingRight: "5px", cursor: "pointer" }}
              htmlFor="no_payment"
            >
              ยังไม่ชำระ
            </label>
            <input
              type="radio"
              name="delivery_type"
              onClick={() => this.setState({ statusPayment: "Paid" })}
              id="already_payment"
            />
            <label
              style={{ paddingRight: "5px", cursor: "pointer" }}
              htmlFor="already_payment"
            >
              ชำระแล้ว
            </label>
            <input
              type="radio"
              name="delivery_type"
              onClick={() => this.setState({ statusPayment: "Delivery" })}
              id="already_delivery"
            />
            <label
              style={{ paddingRight: "5px", cursor: "pointer" }}
              htmlFor="already_delivery"
            >
              จัดส่งแล้ว
            </label>
          </div>

          <table className="purchaseHistory__table__body">
            <tbody>
              <tr className="purchaseHistory__table__row__title">
                <td className="purchaseHistory__table__title"> วันที่</td>
                <td className="purchaseHistory__table__title">
                  {" "}
                  หมายเลขสั่งซื้อ
                </td>
                <td className="purchaseHistory__table__title"> ราคา</td>
                <td className="purchaseHistory__table__title"> สถานะ</td>
                <td className="purchaseHistory__table__title"> Tracking No.</td>
                <td className="purchaseHistory__table__title"> </td>
              </tr>

              {/*  */}
              {purchaseHistory.map((purchaseHistory, index) => {
                const {
                  _id,
                  orderID,
                  createAt,
                  status,
                  trackingNumber,
                  products,
                  paidAmount,
                  slipImage1,
                  paymentType,
                  formData
                } = purchaseHistory;

                const status_filter = {
                  รอชำระเงิน: "UnPaid",
                  รอจัดส่ง: "Paid",
                  จัดส่งแล้ว: "Delivery",
                  คืนสินค้า: "Return",
                  รายการหมดอายุ: "Expired"
                };
                const statusPayment = this.state.statusPayment; // All, UnPaid, Paid, Delivery
                const statusText = status_filter[status];

                // const date = moment(parseInt(createAt)).format('L');
                const year = moment(parseInt(createAt)).get("year");
                const month = moment(parseInt(createAt)).get("month");
                const date = moment(parseInt(createAt)).get("date");
                if (statusPayment == "All" || statusPayment == statusText) {
                  return (
                    <tr key={index} className="purchaseHistory__table__row">
                      <Link href={{pathname: "/purchaseHistoryDetailPage", query: { name: _id } }}>
                        <td className="purchaseHistory__table__column">
                          {date + "/" + (month + 1) + "/" + year}
                        </td>
                      </Link>
                      <Link href={{pathname: "/purchaseHistoryDetailPage", query: { name: _id } }}>
                        <td className="purchaseHistory__table__column">
                          {" "}
                          {orderID}
                        </td>
                      </Link>
                      <Link href={{pathname: "/purchaseHistoryDetailPage", query: { name: _id } }}>
                        <td
                          style={{ textAlign: "left", paddingLeft: "50px" }}
                          className="purchaseHistory__table__column"
                        >
                          {" "}
                          ฿ {commaNumber(paidAmount)}
                        </td>
                      </Link>
                      <Link href={{pathname: "/purchaseHistoryDetailPage", query: { name: _id } }}>
                        <td className="purchaseHistory__table__column">
                          {" "}
                          {status}
                        </td>
                      </Link>
                      <Link href={{pathname: "/purchaseHistoryDetailPage", query: { name: _id }}}>
                        <td className="purchaseHistory__table__column">
                          {" "}
                          {trackingNumber}
                        </td>
                      </Link>
                      {statusText === "Delivery" || statusText === "Expired" || (statusText === "Paid" && paymentType === "credit") ? (
                        <td className="purchaseHistory__table__column">
                          <Link href={{pathname: "/purchaseHistoryDetailPage", query: { name: _id } }}>
                            <button className="button purchaseHistory__detail__button" style={{ color: "#95989A" }}>
                              รายละเอียด
                            </button>
                          </Link>
                        </td>
                      ) : (
                        <td className="purchaseHistory__table__column">
                          {paymentType === "credit" && formData ? (
                            <button className="button purchaseHistory__detail__button"
                              onClick={() => {document[`sendform_${formData.INVMERCHANT}`].submit();}} >
                              <KBankForm name={`sendform_${formData.INVMERCHANT}`} formData={formData} paymentURL={this.state.paymentURL} />
                              ชำระเงินผ่านบัตร
                            </button>
                          ) : (
                            <button onClick={() => this.openModal(orderID)} className="button purchaseHistory__detail__button">
                              {/* {status === "รอจัดส่ง"? "อัพโหลดแล้ว": "แจ้งการชำระ"} */}
                              {statusText === "UnPaid"? "แจ้งการชำระ": "อัพโหลดแล้ว"}
                            </button>
                          )}
                        </td>
                      )}
                      {this.state.modalIsOpen && this.state.modalID === orderID ? (
                        <div className="payslip__modal__overlay">
                          <div className="payslip__modal">
                            <div id={orderID} style={{ position: "relative", display: "flex" }}>
                              <UploadPaySlip order={orderID} onCancel={() => this.onCancelModal()} onClose={() => this.onCloseModal()} />
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};
export default connect(mapStateToProps, undefined)(ListOfPurchaseHistory);
