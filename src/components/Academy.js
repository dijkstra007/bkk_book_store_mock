import React from "react";
import { connect } from "react-redux";
import database from "../firebase/firebase";
import PreviewProduct from "./PreviewProduct";
import ProductListItem from "./ProductListItem";
import { addToCart } from "../actions/cart";
import * as API from "../constants/apiURL";
const Carousel = require("react-responsive-carousel").Carousel;
import * as PRODUCT from '../constants/products';
import ProductsSlider from "./ProductsSlider";

const OFF_SET_TRANSLATE_VALUE = 33.33;
class Academy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      showProducts: [],
      slideCount: 1,
      translateValue: 0,
      showLeftArrow: false,
      showRightArrow: true,
    };
  }
  componentDidMount() {
    console.log("API",API.GET_PRODUCTS + "/type/" + PRODUCT.TYPE.BLOGGER1);
    fetch(API.GET_PRODUCTS + "/type/" + PRODUCT.TYPE.BLOGGER1)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const showProducts = this.getNextShowProduct(data, 0, 3);
        console.log("data aca",data);
        this.setState({ products: data, showProducts: showProducts });
      });
  }
  getChunckedProducts = (products, perPage) => {
    return _.chunk(products, perPage);
  };
 
  onNextClick = () => {
    const limit = this.state.products.length -2;
    const slideCount = this.state.slideCount;
    // console.log('products length', this.state.products.length)
    // console.log(slideCount+1,limit,slideCount + 1 < limit )
    if (slideCount + 1 < limit) {
      this.setState({
        slideCount: slideCount + 1,
        translateValue: this.state.translateValue - OFF_SET_TRANSLATE_VALUE,
        showLeftArrow: true,
      });
    }
    else if (slideCount + 1 === limit) {
      this.setState({
        slideCount: slideCount + 1,
        translateValue: this.state.translateValue - OFF_SET_TRANSLATE_VALUE,
        showRightArrow: false,
        showLeftArrow: true,
      });
    } 
    else {
      this.setState({
        showRightArrow: false,
      })
    }
  };


  onPrevClick = () => {
    const slideCount = this.state.slideCount;
    if (slideCount - 1 > 1) {
      this.setState({
        slideCount: slideCount - 1,
        translateValue: this.state.translateValue + OFF_SET_TRANSLATE_VALUE,
        showRightArrow: true,
      });
    } 
    else if (slideCount - 1 === 1) {
      this.setState({
        slideCount: slideCount - 1,
        translateValue: this.state.translateValue + OFF_SET_TRANSLATE_VALUE,
        showRightArrow: true,
        showLeftArrow: false
      });
    }
    else {
      this.setState({showLeftArrow: false})
    }
  };

  getNextShowProduct = (products, start, end) => {
    const arr = products;
    console.log("arr",arr);
    if (start < end) {
      return arr.filter((x, idx) => {
        return idx >= start && idx <= end;
      });
    } else {
      let arr1 = arr.filter((x, idx) => {
        return idx >= start;
      });
      let arr2 = arr.filter((x, idx) => {
        return idx <= end;
      });
      return arr1.concat(arr2);
    }
  };
  render() {
    const title = this.props.title || "untitle";
    const topic = this.props.topic || "untopic";
    const academyImage = this.props.img;
    const products = this.state.products || [];
    console.log("products academy",products);
    const bgColor = this.props.bgColor || "#D24083";
    const previewSize = { height: 210, width: 210 };
    const translateValue = this.state.translateValue;
    const showLeftArrow = this.state.showLeftArrow
    const showRightArrow = this.state.showRightArrow

    
    return (
      <div className="academy-main-body">
        <div className="academy-slider-body">
          <div
            className="academy-title-container"
            
          >
            <div className="academy-box-title-container">
              {title.split("").map((ch, idx) => {
                return (
                  <p className="academy-title" key={idx}>
                    {ch}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="academy-profile-products-container">
            <div className="academy-profile-container">
              <img className="academy-profile-image" src={academyImage} />
              <p>
                <div className="academy-topic-container">{topic}</div>
              </p>
            </div>

            <div className="academy-carousel__body" style={{width:"72%"}}>
              <button
                className="academy-next-prev-button" style={{paddingRight:"0px",paddingLe:"0px"}}
                onClick={this.onPrevClick}
              >
                <div style={{width:"46px"}}>
                  <img  src={showLeftArrow?"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/prev-min.png": ""} />
                </div>
              </button>
              
                {/* <Carousel
                  showArrows={false}
                  autoPlay={false}
                  infiniteLoop={true}
                  interval={2000}
                  centerSlidePercentage={25}
                  onChange={this.onChange}
                  showIndicators={false}
                  showStatus={false}
                >
                  <div className="academy-product-list-container">
                    {products.map((product, idx) => {
                      return (
                        <PreviewProduct
                          key={idx}
                          product={product}
                          imgSize={previewSize}
                        />
                      );
                    })}
                  </div>
                </Carousel> */}
                <ProductsSlider
                products={products}
                translateValue={translateValue}
              />
              
              <button
                className="academy-next-prev-button"
                onClick={this.onNextClick}
              >
                <div style={{width:"46px"}}>
                  <img  src={showRightArrow?"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/next-min.png":""} />
                </div>
              </button>

              
            </div>
          </div>
          <div className="academy-end"  />
        </div>
      </div>
    );
  }
}

export default Academy;
