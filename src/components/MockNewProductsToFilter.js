import React from "react";
import { connect } from 'react-redux';
import PreviewProduct from "./PreviewProduct";
import * as API from "../constants/apiURL";
import getVisibleProducts from '../selectors/products';

class MockNewProductsToFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      new_products: [],
      activeFilters: this.props.activeFilters || [],
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({filters:nextProps.filterList});
  }
  componentDidMount() {
    fetch(API.GET_NEW_PRODUCTS)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ new_products: data });
      });
  }

  render() {
    const filterList = this.state.filters;
    const products = getVisibleProducts(this.state.new_products, filterList);

    return (
      <div className="div-column">
        {products.map((product,idx) => {
            return (
          <PreviewProduct
            key={idx}
            product={product}
          />
             )
        })}
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        filterList: state.filters.filterList
    }
}
export default connect(mapStateToProps)(MockNewProductsToFilter);