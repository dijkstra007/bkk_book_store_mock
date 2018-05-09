import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import {
  addToCart,
} from "../actions/cart";

import { firebase } from "../firebase/firebase";
import withRedux from "next-redux-wrapper";
import configureStore from "../store/configureStore";
import * as API from "../constants/apiURL";
import Modal from "react-modal";

import {
  getStar,
  getQueryStringToRequestProductDetailOnColor
} from "../selectors/products";

import ReactStars from "react-stars";

import PriceWithDiscount from "../components/PriceWithDiscount";
import axios from "axios";

const store = configureStore();

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // width                 : '40%',
    // height                : '50%',
    textAlign: "center"
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

class ProductPricingandDetail extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  constructor(props) {
    super(props);

    this.state = {
      colorList: [],
      quantity: 1,
      modalIsOpen: false,
      gifPicture: ""
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {}
  componentWillReceiveProps(props) {
    this.setState({ colorList: props.colorList });
  }
  componentWillUnmount() {}
  onColorClick = async color => {
    const id = this.props.product.productID;
    try {
      const res1 = await axios({
        method: "get",
        url:
          API.GET_A_PRODUCT_BY_COLOR +
          `?color=${encodeURIComponent(color)}&productID=${id}`
      });
      const product = res1.data;
      Router.replace({
        pathname: "/productDetail",
        query: { sku: product.sku },
      });
    } catch (err) {
      // const code = err.response.status;
      // const failPage =
      //   "http://" +
      //   window.location.hostname +
      //   ":" +
      //   window.location.port +
      //   "/failPage?code=" +
      //   code;
      // window.location.replace(failPage);
      // return process.exit(1);
      console.log("Error",err)
      const code = err.response.status;
      res.writeHead(302,{Location: `/failPage?code=${code}`})
      res.end()
    }
  };

  onAddClick = (quantity) => {
    const newQuantity = quantity + 1;
    if (newQuantity <= 20) {
      this.setState({ quantity: newQuantity });
    }
  };
  onRemoveClick = (quantity) => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 0) {
      this.setState({ quantity: newQuantity  });
    }
  };
  onAddToCartClick = (product, quantity) => {
    this.props.addToCart(product, quantity);
    const gifPicture = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/add-to-card.gif";
    this.setState({ modalIsOpen: true ,gifPicture:gifPicture});
  };
  openModal() {}

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "";
    const gifPicture2 = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/add-to-card-2.gif";
    this.setState({ modalIsOpen: false ,gifPicture:gifPicture2 });
  }

  closeModal() {}
  render() {
    const product = this.props.product;
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
    const add_products = this.state.product || [];
    const add_quantity = this.state.quantity;
    const outOfStock = product.inStock <= 0;
    // const colorList = this.props.colorList;
    const rating = getStar(product.star);
    // const productID = add_products.productID;
    const gif = this.state.gifPicture;
    // console.log("COLOR LIST",colorList)

    return (
      <div className="col-sm-6" style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "42px",lineHeight: "108%", fontFamily: "db_heavent_bd" }}>{product.productName}</h2>
        <div className="div-row product__price__container">
          <PriceWithDiscount
            onSale={product.onSale}
            price={product.regularPrice}
            salesPrice={product.salesPrice}
          />
        </div>
        <div className="product__detail__status">
          สถานะ :
          <p
            className={
              !outOfStock
                ? "product__detail__status__product"
                : "product__detail__status__product__out__of__stock"
            }
          >
            {!outOfStock != 0 ? "มีสินค้า" : "ไม่มีสินค้า"}
          </p>
          {/* <ReactStars
            className="product__detail_product_star"
            count={5}
            size={20}
            edit={false}
            value={rating}
          /> */}
          {/* <p className="product__detail_product_star">{rating}</p> */}
        </div>
        <hr />
        <div className="product__detail__description">
          {product.shortDescription
            ? product.shortDescription.split(",").map(text => (
                <div key={text.toString()}>
                  {" "}
                  <h3>∙</h3>
                  {text}{" "}
                </div>
              ))
            : ""}
        </div>

        <div className="product__detail__color__container">
          {colorList.map((color, idx) => {
            return (
              <div key={idx} className="product__color__div">
                {color.color !== null ? (
                  <button
                    key={idx}
                    className={
                      color.color === product.color
                        ? "product__detail__color__button__selected"
                        : "product__detail__color__button"
                    }
                    style={{ backgroundColor: color.color }}
                    onClick={() => {
                      this.onColorClick(color.color);
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          closeTimeoutMS={2000}
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>
            สินค้าถูกเพิ่มลงในตะกร้า
          </h2>
          <img id={sku}
          style={{ width: "100%", height: "100%", padding: "20px 50px" }}
          src={gif}
        />
        </Modal>

        <div style={{ fontSize: "20px", textAlign: "left" }}>
          <div className="col-sm-6">
            <p className="cart__text__inline" style={{ fontSize: "20px" }}>จำนวน</p>
            {add_quantity > 1 ? (
              <button onClick={() => { this.onRemoveClick(add_quantity);}} className="minus-btn" type="button" name="button" >
                <span style={{fontSize: "20px"}}> - </span>
              </button>
            ) : (
              <button className="minus-btn" type="button" name="button" >
                <span style={{fontSize: "20px"}}> - </span>
              </button>
            )}
            <span className="quantity__num" style={{ fontSize: "20px",paddingTop: "6px",paddingBottom: "2px"}}>{add_quantity}</span>
            {add_quantity < inStock? (
              <button onClick={() => { this.onAddClick(add_quantity); }} className="plus-btn" type="button" name="button">
                <span style={{fontSize: "20px"}}> + </span>
              </button>
            ) : (
              <button className="plus-btn" type="button" name="button">
                <span style={{fontSize: "20px"}}> + </span>
              </button>
            )}
            <p className="cart__text__inline" style={{ fontSize: "20px", textAlign: "left" }}>&nbsp;&nbsp; ชิ้น</p>
          </div>
          {outOfStock || add_quantity <= 0 ? (
            <button
              className="button product__detail__button"
              style={{ backgroundColor: "grey", cursor: "no-drop"}}
            >
              ใส่ตะกร้า
            </button>
          ) : (
            <button
              className="button product__detail__button "
              onClick={() => {
                this.onAddToCartClick(this.props.product, add_quantity);
              }}
            >
              ใส่ตะกร้า
            </button>
          )}
          {/* <button className="button button--heart">
            <img
              className="button product__detail__button__heart"
              src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/heart-icon-min.png"
            />
          </button>
          เพิ่มในรายการโปรด */}
        </div>
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
    addToCart: (product, quantity) => dispatch(addToCart(product, quantity)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  ProductPricingandDetail
);
