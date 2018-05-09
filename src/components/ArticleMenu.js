import React from "react";
import Router from "next/router";
import { connect } from "react-redux";

class ArticleMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "NINETI9 ACADEMY"
    };
  }
  selectCategory = (category) => {
    this.setState({category});
  };
  render() {
    const selectedCat = this.state.category;
    return (
      <div className="article-show-category-menu">
        <div className={selectedCat === "NINETI9 PICKS"? "article-show-category-selected" : "article-show-category"} onClick={() => this.selectCategory("NINETI9 PICKS")}>NINETI9 PICKS</div>
        <div className={selectedCat === "QUICK TIPS"? "article-show-category-selected" : "article-show-category"} onClick={() => this.selectCategory("QUICK TIPS")}>QUICK TIPS</div>
        <div className={selectedCat === "NINETI9 ACADEMY"? "article-show-category-selected" : "article-show-category"} onClick={() => this.selectCategory("NINETI9 ACADEMY")}>NINETI9 ACADEMY</div>
        <div className={selectedCat === "LIFESTYLE"? "article-show-category-selected" : "article-show-category"} onClick={() => this.selectCategory("LIFESTYLE")}>LIFESTYLE</div>
        <div className={selectedCat === "REVIEW"? "article-show-category-selected" : "article-show-category"} style={{ border: "none" }} onClick={() => this.selectCategory("REVIEW")}>
          REVIEW
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
export default connect(mapStateToProps, undefined)(ArticleMenu);
