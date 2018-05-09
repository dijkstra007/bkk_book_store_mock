import React from "react";
import Router from "next/router";
import { addCount } from "../actions/count";
import { firebase } from "../firebase/firebase";
import withRedux from "next-redux-wrapper";
import configureStore from "../store/configureStore";
import * as API from "../constants/apiURL";
class ProductPreview extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  constructor(props) {
    super(props);
    this.state = {
      image: ""
    };
  }
  componentDidMount() {}
  componentWillReceiveProps(props) {
    this.setState({ image: props.product.image0 });
  }
  componentWillUnmount() {}
  changeImage = image => {
    this.setState({ image: image });
  };

  render() {

    const product = this.props.product;
    const outOfStock = product.inStock < 1;
    const Image0 = product.image0 || "-";
    const Image1 = product.image1 || "-";
    const Image2 = product.image2 || "-";
    const Image3 = product.image3 || "-";
    const Image4 = product.image4 || "-";
    const Image = this.state.image || "-";

    return (
      <div>
        <div className="small__preview col-sm-1">
          <div>
            {Image0 != "-" ? (
              <img
                className="img__small__preview"
                src={Image0}
                onClick={() => {
                  this.changeImage(Image0);
                }}
              />
            ) : null}
            {Image1 != "-" ? (
              <img
                className="img__small__preview"
                src={Image1}
                onClick={() => {
                  this.changeImage(Image1);
                }}
              />
            ) : null}
            {Image2 != "-" ? (
              <img
                className="img__small__preview"
                src={Image2}
                onClick={() => {
                  this.changeImage(Image2);
                }}
              />
            ) : null}
            {Image3 != "-" ? (
              <img
                className="img__small__preview"
                src={Image3}
                onClick={() => {
                  this.changeImage(Image3);
                }}
              />
            ) : null}
            {Image4 != "-" ? (
              <img
                className="img__small__preview"
                src={Image4}
                onClick={() => {
                  this.changeImage(Image4);
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="large__preview col-sm-5">
          {outOfStock?
            <div>
              <img className="img__large__preview" src={Image} style={{ filter: "brightness(40%)" }}/>
              <div className="preview_outOfStock_centered" style={{top: "50%"}}>
                  <h1>Sold Out</h1>
              </div>
            </div>
          :
            <img className="img__large__preview" src={Image} />
          }
        </div>
      </div>
    );
  }
}

export default ProductPreview;
