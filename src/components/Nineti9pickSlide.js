import React from "react";
import PreviewProduct from "./PreviewProduct";
import * as _ from "lodash";
import Router from "next/router";
import * as API from "/src/constants/apiURL";
import axios from "axios";
import moment from "moment";
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
  const article = props.products
  return (
    <div id="product-slide" className="slide">

                    <div className="col-sm-4 article-nearby-content" style={{border: "solid 1px #ff0000"}} >
                        <div>
                            {/* <img width="250px" height="250px" src={article.coverImage} className="article-nearby-content-coverImage" /> */}
                        </div>
                        <div className="article-nearby-content-title">
                            {/* {article.title} */}
                        </div>
                        <div className="article-nearby-content-detail">
                            {/* <span style={{color: "#FD97A0", marginRight: "10px"}}>{article.author.displayName}</span>
                            <span style={{marginRight: "10px"}}>|</span>
                            <img style={{marginRight: "5px"}} width="10px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/date-article-icon-min.png" />
                            <span style={{marginRight: "10px"}}>{moment(article.createDate).fromNow()}</span>
                            <img style={{marginRight: "5px"}} width="10px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/view-article-icon-min.png" />
                            <span style={{marginRight: "10px"}}>{article.comments}</span>
                            <img style={{marginRight: "5px"}} width="10px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/check-icon-min.png" />
                            <span>{article.views}</span> */}
                        </div>
                    </div>
    </div>
  );
};

class Nineti9pickSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
        const articles_nineti9 = this.props.articles_nineti9;
    return (
      <div className="article-nearby">
        <div className="article-nearby-data">
          <div className="article-nearby-all">
            <div className="col-sm-1 article-nearby-arrow">
              <img
                width="50px"
                src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/prev-min.png"
              />
            </div>
            {/* <div className="col-sm-10"  style={{display: "inline-flex"}}> */}
            
            {articles_nineti9.map((article, idx) => {

                return (
                    <div className="col-sm-4 article-nearby-content" style={{border: "solid 1px #ff0000"}} key={idx}>
                        <div>
                            <img width="250px" height="250px" src={article.coverImage} className="article-nearby-content-coverImage" />
                        </div>
                        <div className="article-nearby-content-title">
                            {article.title}<br/>{article.title}
                        </div>
                        <div className="article-nearby-content-detail">
                            <span style={{color: "#FD97A0", marginRight: "10px"}}>{article.author.displayName}</span>
                            <span style={{marginRight: "10px"}}>|</span>
                            <img style={{marginRight: "5px"}} width="10px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/date-article-icon-min.png" />
                            <span style={{marginRight: "10px"}}>{moment(article.createDate).fromNow()}</span>
                            <img style={{marginRight: "5px"}} width="10px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/view-article-icon-min.png" />
                            <span style={{marginRight: "10px"}}>{article.comments}</span>
                            <img style={{marginRight: "5px"}} width="10px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/check-icon-min.png" />
                            <span>{article.views}</span>
                        </div>
                    </div>
                );
            })}
            {/* </div> */}
            <div className="col-sm-1 article-nearby-arrow">
              <img
                width="50px"
                src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/next-min.png"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Nineti9pickSlide;
