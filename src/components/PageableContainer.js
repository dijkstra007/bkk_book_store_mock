import React from "react";
import { connect } from "react-redux";
import database from "../firebase/firebase";
import ProductListItem from "./ProductListItem";
import PaginationButtonList from "./PaginationButtonList";
import TableProducts from "./TableProducts";
import { addToCart } from "../actions/cart";
import { setProductTypeFilter } from "../actions/filters";
import * as API from "../constants/apiURL";
import * as PRODUCTS from "../constants/products";
import * as _ from "lodash";
import fetch from "isomorphic-fetch";
import { groupProductsToArrayofChunckProduct } from "../selectors/products";
import getQueryStringFromFilterList from "../selectors/filters";
import axios from "axios";
import Router from "next/router";
import Loading from "react-loading-components";
import SortList from "./SortList";

class PageableContainer extends React.Component {
  constructor(props) {
    super(props);
    const { products, totalProducts, page } = this.props;
    // console.log("new this.props", this.props);
    this.state = {
      products: products || [],
      currentPage: page,
      maxPage: this.getPageNumberFrom(totalProducts),
      totalProducts: totalProducts,
      search: undefined,
      loading: false
    };
    // console.log("This state",this.state)
  }

  componentWillReceiveProps(nextProps) {
    const { products, totalProducts, page } = nextProps;
    this.state = {
      products: products || [],
      currentPage: page,
      maxPage: this.getPageNumberFrom(totalProducts),
      totalProducts: totalProducts,
      loading: false
    };
  }
  // componentDidMount() {
  //   this.loadProductListFromMongoDB(this.state.currentPage);
  // }
  loadProductListFromMongoDB = async page => {
    const nCol = 4;
    const nRow = 5;
    const start = (page - 1) * nCol * nRow;
    const end = page * nCol * nRow;
    this.setState({ currentPage: page, loading: true });
    let url = `${API.GET_PRODUCTS}?&_page=${page}&_perPage=${nRow * nCol}`;
    let categoryList = this.props.filters.activeFilters;
    let productType = this.props.filters.activeProductType;
    let sort = this.props.sort;
    let searchText = this.props.filters.activeSearchText;
    console.log("FILTERS ", this.props.filters);

    console.log("searchText ", searchText);
    if (searchText) {
      url = url + `&search=${encodeURIComponent(searchText)}`;
    }
    if (categoryList) {
      url = url + `&categories=${encodeURIComponent(categoryList)}`;
    }
    if (productType) {
      url = url + `&productType=${encodeURIComponent(productType)}`;
    }
    if (sort) {
      url =
        url +
        `&_sort=${encodeURIComponent(sort.sortBy)}&_order=${encodeURIComponent(
          sort.order
        )}`;
    }
    console.log("URL PAGEABLE", url);
    try {
      const res = await axios.get(url);
      const totalProducts = res.headers["x-total-count"];
      const products = res.data;
      const nPage = this.getPageNumberFrom(totalProducts);
      const arrayOfChunckProduct = groupProductsToArrayofChunckProduct(
        products,
        nCol,
        nRow
      );
      this.setState({
        products: products,
        maxPage: nPage,
        currentPage: page,
        totalProducts: totalProducts,
        loading: false
      });
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
  };

  randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  getRandomProduct(products) {
    const index = this.randomIntFromInterval(0, products.length - 1);
    return products[index];
  }
  getPageNumberFrom(productsLength) {
    const n = productsLength;
    return n % 20 == 0 ? n / 20 : Math.floor(n / 20 + 1);
  }
  onPaginationButtonClick = page => {
    const maxPage = this.getPageNumberFrom(this.props.totalProducts);
    if (page <= maxPage) {
      Router.push({ pathname: "/productCategory" , query: {...this.props,activePage: page} });
    }
  };
  getTitlePage = id => {
    if (id === PRODUCTS.TYPE.HOTITEMS) return PRODUCTS.TITLE.HOTITEMS;
    else if (id === PRODUCTS.TYPE.NEWITEMS) return PRODUCTS.TITLE.NEWITEMS;
    else if (id === PRODUCTS.TYPE.NINETI9RANKING)
      return PRODUCTS.TITLE.NINETI9RANKING;
    else return "สินค้าทั้งหมด";
  };
  render() {
    const index = this.state.currentPage - 1;
    const products = this.props.fetchedProducts;
    const chunckProduct = groupProductsToArrayofChunckProduct(
      products,
      4,
      5
    )[0];
    const currentButton = this.props.activePage;
    const nPage = this.getPageNumberFrom(this.props.totalProducts);
    const totalProducts = this.state.totalProducts;
    const loading = this.state.loading;
    const title = this.props.title
      ? this.props.title
      : this.getTitlePage(this.props.activeProductType);
    // console.log("total products", this.props.totalProducts);
    // console.log("nPage ", nPage);
    // console.log("this.state.currentPage ", this.state.currentPage);
    // console.log("this.state.maxPage ", this.state.maxPage);
    // console.log("activePage", this.props.activePage)
    return (
      <div className="pageable_container_body">
        <div className="div-row">
          <div className="div-row col-sm-7">
            <span className="pageable_container_title"> {title}</span>
            <span className="pageable_container_number_products">
              ({totalProducts})
            </span>
          </div>
          <div className="col-sm-5 pageable_container_filter">
            <div style={{ width: "65%", textAlign: "right" }}>
              <PaginationButtonList
                showButton={4}
                nPage={nPage}
                current={this.props.activePage}
                onButtonClick={this.onPaginationButtonClick}
              />
            </div>
            <div style={{ width: "35%" }}>
              <SortList {...this.props} />
            </div>
          </div>
        </div>
        {loading ? (
          <Loading type="tail_spin" width={200} height={200} fill="#FD97A0" />
        ) : (
          <TableProducts products={chunckProduct} />
        )}
        <div className="div-row div-space-between">
          <span className="pageable_container_title">
            {this.state.currentPage < this.state.maxPage
              ? this.state.currentPage * 20
              : totalProducts}{" "}
            จาก {totalProducts} สินค้า
          </span>
          <span className="pageable_container_title">
            <PaginationButtonList
              showButton={4}
              nPage={nPage}
              current={this.props.activePage}
              onButtonClick={this.onPaginationButtonClick}
            />
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filters: state.filters,
    sort: state.sort
  };
};
export default connect(mapStateToProps, undefined)(PageableContainer);
