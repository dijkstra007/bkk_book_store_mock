import React from "react";
import { connect } from "react-redux";
import database from "../firebase/firebase";
import PreviewProduct from "./PreviewProduct";
import ProductListItem from "./ProductListItem";
import { addToCart } from "../actions/cart";
import Academy from "./Academy";
import * as API from '../constants/apiURL';
import * as _ from 'lodash';
import { groupProductsToArrayofChunckProduct } from '../selectors/products'


const Carousel = require("react-responsive-carousel").Carousel;

class LandingProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      arrayOfChunckProduct: []
    };
  }

  componentDidMount() {
    fetch(API.GET_PRODUCTS + "/type/recommendeditems2")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const  chunckProducts = groupProductsToArrayofChunckProduct(data, 5, 3)
         this.setState({ arrayOfChunckProduct: chunckProducts });
      });
    
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
      <div className="landing-product-body">
        <Carousel
          showArrows={false}
          autoPlay={false}
          infiniteLoop={false}
          interval={8000}
          showStatus={false}
          showIndicators={true}
        >
          {arrayOfChunckProduct.map((chunckProduct, idx) => {
            return (
              <div key={idx} className="landing-chunck-product-body">
                {chunckProduct.map((productList, idx) => {
                  return (
                    <div key={idx} className="landing-product-list-body">
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
    );
  }
}

export default LandingProductList;
