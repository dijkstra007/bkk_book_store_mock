import React from "react";
import { connect } from "react-redux";
import database from "../firebase/firebase";
import PreviewProduct from "./PreviewProduct";
import ProductListItem from "./ProductListItem";
import { addToCart } from "../actions/cart";
import Academy from "./Academy";
import * as API from "../constants/apiURL";
import * as _ from "lodash";
import { groupProductsToArrayofChunckProduct } from "../selectors/products";
import axios from "axios";
import moment from 'moment';
const Carousel = require("react-responsive-carousel").Carousel;

class FlashDeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      arrayOfChunckProduct: [],
      endAt: null,
      hour: 0,
      minute: 0,
      second: 0,
    };
  }

  async componentDidMount() {
    const res = await axios.get(API.GET_FLASHDEAL);
    const chunckProducts = groupProductsToArrayofChunckProduct(res.data.products, 5, 1);
    this.setState({ arrayOfChunckProduct: chunckProducts ,endAt: res.data.endAt});
    this.timer = setInterval(()=>{
      function pad(v){
        if(v.toString().length == 1) return '0' + v;
        return v;
      }
      const duration = moment.duration(this.state.endAt - new Date());
      this.setState({
        hour: pad(Math.floor(duration.hours())),
        minute: pad(Math.floor(duration.minutes())),
        second: pad(Math.floor(duration.seconds()))
      })
    },1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  getRandomProduct(products) {
    const index = this.randomIntFromInterval(0, products.length - 1);
    return products[index];
  }

  render() {
    const arrayOfChunckProduct = this.state.arrayOfChunckProduct;
    const previewSize = { width: 210, height: 210 };
    return (
      <div>
        <div className="flash-deal-structure">
          <div className="col-sm-12 flash-deal-title">
            <div className="col-sm-3 flash-deal-logo">
              <img
                src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/flash-deal.png"
                width="300"
              />
            </div>
            <div className="col-sm-9 flash-deal-time">
              เหลือเวลา &nbsp; &nbsp;
              <div className="flash-deal-time-box">{this.state.hour}</div>
              &nbsp; : &nbsp;
              <div className="flash-deal-time-box">{this.state.minute}</div>
              &nbsp; : &nbsp;
              <div className="flash-deal-time-box">{this.state.second}</div>
            </div>
            <div className="flash-deal-title-right" />
          </div>
        </div>
        <div className="hightlight-main-body">
          <div className="col-sm-12">
            <div className="col-sm-1">
              <img src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/prev-min.png" />
            </div>
            <div className="col-sm-10 flash-deal-content">
              <Carousel
              showArrows={true}
              autoPlay={false}
              infiniteLoop={false}
              interval={8000}
              showStatus={false}
              showIndicators={false}
            >
              {arrayOfChunckProduct.map((chunckProduct, idx) => {
                return (
                  <div key={idx} className="flash-deal-all-products">
                    {chunckProduct.map((productList, idx) => {
                      return (
                        <div key={idx} className="flash-deal-each-product">
                          {productList.map((product, idx) => {
                            return (
                              <PreviewProduct
                                key={idx}
                                product={product}
                                imgSize={previewSize}
                              />
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Carousel>
            </div>
            <div className="col-sm-1">
              <img src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/next-min.png" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlashDeal;
