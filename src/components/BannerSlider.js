import React, { Component } from "react";
import { width } from "window-size";
const Carousel = require("react-responsive-carousel").Carousel;

export default class BannerSlider extends Component {
  constructor(props) {
    super(props);
  }
  onChange = () => {};
  onClickItem = () => {};
  onClickThumb = () => {};
  render() {
    return (
        <Carousel
          showArrows={true}
          onChange={this.onChange}
          onClickItem={this.onClickItem}
          showStatus={false}
          showThumbs={false}
          autoPlay={true}
          infiniteLoop = {true}
          interval={2000}
        >
          <div className="banner-image-container">
            <img className="banner-image"
              src={ 
                "https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/promotion+banner/NewSlider-01.jpg"
              }
            />
          </div>
          <div className="banner-image-container">
            <img className="banner-image"
              src={ 
                "https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/promotion+banner/NewSlider-02.jpg"
              }
            />
          </div>
        </Carousel>
    );
  }
}
