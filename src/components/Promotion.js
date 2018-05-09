import React, { Component } from "react";
import HeaderLayout from "./HeaderLayout";
import * as PRODUCT from "../constants/products";
import Router from "next/router";
import Link from "next/link";

export default class Promotion extends Component {
  // onPromotionClick = (hashTag) => {
  //   Router.push({
  //     pathname: '/productCategory',
  //     query: { search: hashTag}
  //   })
  // }
  render() {
    return (
      <div className="promotion-body">
        {/* <HeaderLayout title="PROMOTION OF THE MONTH!" /> */}
        <div className="promotion-title"> 
          <img src={'https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/promotion-min.png'}/> </div>
        <div>
          <Link
            href={`/productCategory?activeSearch=${
              PRODUCT.HASHTAG.PROMOTION_BANNER_2
            }`}
          >
            <a>
              <div className="col-sm-4">
                <img
                  className="img__promotion"
                  src="https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/promotion+banner/NewPromotion-01.png"
                />
              </div>
            </a>
          </Link>
          <Link
            href={`/productCategory?activeSearch=${
              PRODUCT.HASHTAG.PROMOTION_BANNER_1
            }`}
          >
            <a>
              <div className="col-sm-4">
                <img
                  className="img__promotion"
                  src="https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/promotion+banner/NewPromotion-02.png"
                />
              </div>
            </a>
          </Link>
          <Link
            href={`/productCategory?activeSearch=${
              PRODUCT.HASHTAG.PROMOTION_BANNER_3
            }`}
          >
            <a>
              <div className="col-sm-4">
                <img 
                  className="img__promotion"
                  src="https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/promotion+banner/NewPromotion-03.png"
                />
              </div>
            </a>
          </Link>
          <Link
            href={`/productCategory?activeSearch=${
              PRODUCT.HASHTAG.PROMOTION_BANNER_4
            }`}
          >
            <a>
              <div className="col-sm-12">
                <img
                  className="img__promotion"
                  src="https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/promotion+banner/NewPromotion-04.png"
                />
              </div>
            </a>
          </Link>
        </div>
      </div>
    );
  }
}
