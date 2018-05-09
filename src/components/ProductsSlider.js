import React from "react";
import PreviewProduct from "./PreviewProduct";
import * as _ from "lodash";
const TRANSLATE_VALUE = 223;
const RightArrow = props => {
  return (
    <button className="hightlight-next-button" onClick={props.nextSlide}>
      <img
        width="55px"
        src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/next-min.png"
      />
    </button>
  );
};
const LeftArrow = props => {
  return (
    <button className="hightlight-prev-button" onClick={props.prevSlide}>
      <img
        width="55px"
        src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/prev-min.png"
      />
    </button>
  );
};
const Slide = props => {
  const previewSize = { height: 210, width: 210 };
  // const widthSize = window? window.document.getElementById('product-slide').clientWidth: 0
  // console.log(widthSize)
  return (
    <div id="product-slide" className="slide">
      <PreviewProduct imgSize={previewSize} product={props.product} />
    </div>
  );
};


export default class ProductsSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }
  getChunckedProducts = (products, perPage) => {
    return _.chunk(products, perPage);
  };
  renderSlides = products => {
    return products.map((curr, i) => <Slide key={i} product={curr} />);
  };

  render() {
    const products = this.props.products;
    const translateValue = this.props.translateValue;

    return (
      <div  className="product-slider">
        <div
          className="slider-wrapper"
          style={{
            transform: `translateX(${translateValue}%)`,
            transition: "transform ease-out 0.40s",
          }}
        >
          {this.renderSlides(products)}
        </div>
      </div>
    );
  }
}
