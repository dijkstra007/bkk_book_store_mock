import React from "react";
import { connect } from "react-redux";
import ReactStars from "react-stars";
import { addToCart } from "../actions/cart";
import Modal from "react-modal";
import Link from "next/link";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
import commaNumber from 'comma-number';

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

class PreviewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      countIdModal: 0,
      gifPicture: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onAddToCartClick = product => {
    // console.log(product);
    this.props.dispatchAddToCart(product);
    // const newCountIdModal =this.state.countIdModal+1;
    // console.log("countIdModal newCountIdModal open :",this.state.countIdModal,newCountIdModal);
    const gifPicture = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/add-to-card.gif";
    this.setState({ modalIsOpen: true,gifPicture:gifPicture });
  };
  openModal() {}

  afterOpenModal() {
    this.subtitle.style.color = "";
    const gifPicture2 = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/add-to-card-2.gif";
    this.setState({ modalIsOpen: false ,gifPicture:gifPicture2});
  }


  closeModal() {
    // const newCountIdModal =this.state.countIdModal-1;
    // console.log("countIdModal newCountIdModal close :",this.state.countIdModal,newCountIdModal);
    // this.setState({   });
  }
  render() {
    const product = this.props.product;
    const sku = product.sku;
    const name = product.productName || "";
    const shortName = name.substring(0, 44);
    const threedot =  name.length >45 ? "...": ""; 
    const prodImage = product.thumbnailImage || "";
    const rating = product.rating || 0;
    const imgSize = this.props.imgSize || { height: 200, width: 200 };
    const starSize = this.props.starSize || 15;
    const inStock = product.inStock;
    const tagOnPhoto = product.tagOnPhoto || '';
    const gif = this.state.gifPicture;
    // const tagOnPhoto = 'BESTPRICE';
    // const quantity = 0;
    const outOfStock = inStock <= 0;
    const productDetailWithSKU = "/productDetail?sku=" +sku;
    return (
      <div className="preview-product-main-body">
        {/* <Link href={{ pathname: "/productDetail", query: { sku: sku } }}> */}
        
          {outOfStock ? (
            <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none"}}>
              <BrowserView device={isBrowser}>
                <img
                  src={prodImage}
                  className="preview-product-image"
                  style={{ filter: "brightness(40%)" }}
                />
              </BrowserView>
              <MobileView device={isMobile}>
                <img
                  src={prodImage}
                  className="preview-product-image-mobile"
                  style={{ filter: "brightness(40%)" }}
                />
              </MobileView>
              <div className="preview_outOfStock_centered">
                <h3>Sold Out</h3>
              </div>
            </a>
          ) : (
            <div>
              <BrowserView device={isBrowser}>
                <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none", cursor: "pointer"}}>
                  <div style={{position:"relative",display: "inline-block"}}>
                    <img src={prodImage} className="preview-product-image" />
                    { tagOnPhoto !== "" ?
                      <div className="preview-product-image-tagonphoto">  {tagOnPhoto} </div>
                      :null
                    }
                    <a href="#addtoCart">
                    {outOfStock ? null : (
                      <button
                      className="btn preview-product-image-reg"
                      onClick={() => this.onAddToCartClick(product)}
                      >
                        <img
                          className="preview-product-image-cart"
                          src={
                            "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/cart-white-min.png"
                          }
                          /> <p className="preview-product-image-reg-text">หยิบใส่ตะกร้า</p>
                      </button>
                      
                    )}
                    </a>
                  </div>
                </a>
              </BrowserView>
              <MobileView device={isMobile}>
              <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none", cursor: "pointer"}}>
                  <div style={{position:"relative",display: "inline-block"}}>
                    <img src={prodImage} className="preview-product-image-mobile" />
                    { tagOnPhoto !== "" ?
                      <div className="preview-product-image-tagonphoto">  {tagOnPhoto} </div>
                      :null
                    }
                    <a href="#addtoCart">
                    {outOfStock ? null : (
                      <button
                      className="btn preview-product-image-reg-mobile"
                      onClick={() => this.onAddToCartClick(product)}
                      >
                        <img
                          className="preview-product-image-cart-mobile"
                          src={
                            "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/cart-white-min.png"
                          }
                          /> <p className="preview-product-image-reg-text-mobile">หยิบใส่ตะกร้า</p>
                      </button>
                      
                    )}
                    </a>
                  </div>
                </a>
               
              </MobileView>
            </div>
          )}
        {/* </Link> */}
        {/* <img className="preview-product-image-heart" src={'https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/hearth-pink-min.png'}/> */}

        {/* <BrowserView device={isBrowser}>
          
        </BrowserView>
        <MobileView device={isMobile}>
          
        </MobileView> */}
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
        <div className="preview-name-price-start-container ">
          <div style={{ width: "100%" }}>
            <BrowserView device={isBrowser}>
              {/* <Link href={{ pathname: "/productDetail", query: { sku: sku } }}> */}
              <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none", color: "#000000"}}>
                <p className="preview-product-name">{shortName+threedot}</p>
                </a>
              {/* </Link> */}
            </BrowserView>
            <MobileView device={isMobile}>
              {/* <Link href={{ pathname: "/productDetail", query: { sku: sku } }}> */}
              <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none", color: "#000000"}}>
                <p className="preview-product-name-mobile">{shortName+threedot}</p>
                </a>
              {/* </Link> */}
            </MobileView>
          </div>
          {/* <Link href={{ pathname: "/productDetail", query: { sku: sku } }}> */}
          <a href={productDetailWithSKU} target="_blank" style={{textDecoration: "none"}}>
          <div style={{ width: "100%" }}>
          
          <div className="preview-bottom-container">
            {product.onSale ? (
              <div style={{ width: "100%" }}>
                <div className="preview-product-price">
                ฿{" "}{commaNumber(product.salesPrice)}
                </div>
                <div className="preview-product-regular-price">
                  
                  ฿{" "}{commaNumber(product.regularPrice)}
                </div>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <div className="preview-product-price">
                ฿{" "}{commaNumber(product.regularPrice)}
                </div>
                <div className="preview-product-regular-price">
                  
                  {" "}
                </div>
              </div>
            )}

          </div>
          
          </div>
          </a>
          {/* </Link> */}
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
    dispatchAddToCart: (product) => dispatch(addToCart(product, 1))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PreviewProduct);
