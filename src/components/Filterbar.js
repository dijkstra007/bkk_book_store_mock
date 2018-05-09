import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import CategorySideBar from "./CategorySideBar";
import * as API from "../constants/apiURL";
import axios from "axios";
import { actionTypes } from "../actions/count";
import { toggleProductTypeFilter } from "../actions/filters";
import * as PRODUCTS from "../constants/products";
class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  async componentDidMount() {
    try {
      const res = await axios.get(API.GET_CATEGORIES);
      const categories = res.data;
      this.setState({ categories: categories });
    } catch (err) {
      const code = err.response.status;
      const failPage =
        "http://" +
        window.location.hostname +
        ":" +
        window.location.port +
        "/failPage?code=" +
        code;
      window.location.replace(failPage);
    }
  }

  selectGroupName = id => {
    const path = "/productCategory";
    if (id === PRODUCTS.TYPE.ALL) {
      Router.push({
        pathname: path,
        query: {
          activeSearch: undefined,
          activeCategoryList: undefined,
          activeProductType: id,
          activeSortBy: this.props.activeSortBy,
          activeSortOrder: this.props.activeSortOrder,
          activePage: 1
        }
      });
    } else {
      Router.push({
        pathname: path,
        query: {
          ...this.props,
          activeProductType:
            this.props.activeProductType === id ? 'all' : id,
          activePage: 1
        }
      });
    }
  };
  shouldChecked = (activeProductType,list_id) => {
    return activeProductType === list_id

  }

  render() {
    const categories = this.state.categories || [];
    const query = this.props.query;
    const filter_list = this.props.list || [];
    console.log("active product type", this.props.activeProductType);
    return (
      <div className="filter_bar_container">
        <p className="filter_bar_header">{this.props.title}</p>
        <div className="div-column">
          {this.props.title !== "ปัญหาผิว" ? (
            <div style={{ paddingLeft: "50px" }}>
              {filter_list.map((list, idx) => {
                let list_id = list.id;
                return (
                  <div
                    key={idx}
                    className="category_sidebar_name_container"
                    style={{ lineHeight: "1.2px" }}
                  >
                    <input
                      id={list_id}
                      type="radio"
                      onClick={() => this.selectGroupName(list_id)}
                      checked={this.shouldChecked(this.props.activeProductType,list_id)}
                      
                    />
                    <label
                      htmlFor={list.id}
                      className="category_sidebar_name"
                      style={{ cursor: "pointer", fontFamily: "db_heavent_li" }}
                    >
                      {list.groupName}
                    </label>
                    <div id={list.id} style={{ display: "none" }}>
                      {list.sub_categories.map((sub_cat, i) => {
                        return (
                          <div>
                            <input type="checkbox" id={sub_cat.id} />
                            <label
                              className="filter_bar_p"
                              htmlFor={sub_cat.id}
                            >
                              {sub_cat.name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              {filter_list.map((cat, idx) => {
                return (
                  <CategorySideBar
                    {...this.props}
                    key={idx}
                    name={cat.groupName}
                    img={cat.img}
                    sub_categories={cat.sub_categories}
                    query={query}
                  />
                );
              })}
            </div>
          )}

          <br />

          {this.props.title !== "ปัญหาผิว" ? (
            <div>
              {categories.map((cat, idx) => {
                return (
                  <CategorySideBar
                    {...this.props}
                    key={idx}
                    name={cat.groupName}
                    img={cat.img}
                    sub_categories={cat.sub_categories}
                    query={query}
                  />
                );
              })}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleActiveProductType: productType =>
      dispatch(toggleProductTypeFilter(productType))
  };
};
export default connect(undefined, mapDispatchToProps)(FilterBar);
