import React from "react";
import { connect } from "react-redux";
import database from "../firebase/firebase";
import PreviewProduct from "./PreviewProduct";
import ProductsSlider from "./ProductsSlider";
import ProductListItem from "./ProductListItem";
import { addToCart } from "../actions/cart";
import * as API from "../constants/apiURL";

const Carousel = require("react-responsive-carousel").Carousel;

const OFF_SET_TRANSLATE_VALUE = 25;
class HighLightItems extends React.Component {
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
    fetch(API.GET_PRODUCTS + "/type/" + this.props.productType)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const showProducts = this.getNextShowProduct(data, 0, 3);
        this.setState({ products: data, showProducts: showProducts });
      });
  }
  getChunckedProducts = (products, perPage) => {
    return _.chunk(products, perPage);
  };

  onNextClick = () => {
    const limit = this.state.products.length -3;
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
    const title = this.props.title;
    const subTitle = this.props.subTitle;
    const adsImg = this.props.adsImg;
    const products = this.state.products;
    const previewSize = { height: 210, width: 210 };
    const translateValue = this.state.translateValue;
    const showLeftArrow = this.state.showLeftArrow
    const showRightArrow = this.state.showRightArrow

    return (
      <div className="hightlight-main-body">
        <div className="col-sm-9">
          <div className="highlight-slider-body">
            <div className="highlight-title-container">
              <div className="hightlight-title">{title}</div>
              <div/>
              <div className="highlight-subtitle">{subTitle}</div>
            </div>
            <div className="hightlight-carousel__body">
              <button
                className="hightlight-prev-button"
                onClick={this.onPrevClick}
              >
                <div style={{width:"47px"}}>
                  <img
                    width="47px"
                    src={showLeftArrow?"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/prev-min.png":""}
                  />
                </div>
              </button>
              {/* <div className="hightlight-carousel"> */}
              <ProductsSlider
                products={products}
                translateValue={translateValue}
              />
              {/* </div> */}
              <button
                className="hightlight-next-button"
                onClick={this.onNextClick}
              >
                <div style={{width:"47px"}}>
                  <img
                    width="47px"
                    src={showRightArrow?"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/next-min.png":""}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-3 hightlight-ads-image-body" style={{padding:"0px"}}>
          { this.props.productType == "hotitem" ?
            <a href="http://nineti9.com/productCategory?activeSearch=noona" target="_blank">
              <img className="hightlight-ads-image img__promotion" width="303px" src={adsImg} />
            </a>
            :
            <a href="https://www.facebook.com/nineti9" target="_blank">
              <img className="hightlight-ads-image img__promotion" width="303px" src={adsImg} />
            </a>
          }
        </div>
      </div>
    );
  }
}

export default HighLightItems;
