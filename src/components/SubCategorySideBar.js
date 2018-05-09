import React from "react";
import { connect } from "react-redux";
import { addFilter, removeFilter } from "../actions/filters";
import Router from "next/router";
import * as _ from "lodash";

class SubCategorySideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSubCategory: false
    };
  }
  componentWillReceiveProps(nextProps) {
  }
  isCategoryIdInFilterList = (filters = [], id = "") => {
    if (filters.length == 0) return false;
    return _.includes(filters, JSON.stringify(JSON.parse(id)));
  };
  componentDidMount() {
  }
  componentWillMount() {}

  onCheckHandler = ({ categoryID }) => {
    const activeFilters = this.props.activeCategoryList;
    const shouldAddFilter = !this.isCategoryIdInFilterList(
      activeFilters,
      categoryID
    );
    let nextActiveFilter = [];
    if (shouldAddFilter) {
      nextActiveFilter = [...activeFilters, categoryID];
    } else {
      nextActiveFilter = activeFilters.filter(
        x => x != JSON.stringify(JSON.parse(categoryID))
      );
    }

    const path = "/productCategory";
    Router.push({
      pathname: path,
      query: { ...this.props, activeCategoryList: nextActiveFilter,activePage: 1 }
    });
  };

  onShowClick = () => {
    this.setState({ showSubCategory: !this.state.showSubCategory });
  };
  render() {
    const isSubShow = this.state.showSubCategory;
    const title = this.props.title || "";
    const list = this.props.list;
    const filters = this.props.activeCategoryList;
    return (
      <div className="column">
        <button
          onClick={this.onShowClick}
          className="div-row sub_category_sidebar_button"
        >
          <div className={isSubShow ? "rotate0to90" : "rotate90to0"}>{">"}</div>
          <div style={{ marginLeft: "0.5rem" }}> {title} </div>
        </button>
        {isSubShow ? (
          <div className="column sub_category_sidebar_list_container">
            {list.map((l, idx) => {
              return (
                <div key={idx} className="checkbox__title">
                  <input id={l.categoryID}
                    type="checkbox"
                    onChange={() => {
                      this.onCheckHandler(l);
                    }}
                    checked={this.isCategoryIdInFilterList(
                      filters,
                      l.categoryID
                    )}
                  />
                  <label className="filter_bar_p" htmlFor={l.categoryID}>{l.categoryName}</label>
                  
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeFilters: state.filters.activeFilters
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addFilter: name => dispatch(addFilter(name)),
    removeFilter: name => dispatch(removeFilter(name))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SubCategorySideBar);
