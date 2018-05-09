import React from "react";
import Router from "next/router";
import { addCount } from "../actions/count";
import { firebase } from "../firebase/firebase";
import withRedux from "next-redux-wrapper";
import configureStore from "../store/configureStore";
import * as API from '../constants/apiURL';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import ProductTag from '../components/ProductTag';



const store = configureStore();

class ProductDetailLongDescription extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  constructor(props) {
    super(props);
    this.state = {
      product: {},
    }
  }
  componentDidMount() {

  }

  componentWillUnmount() {}

  render() {

    const Description = this.props.product.description;
    return (
        <div className="col-sm-11 product__long__description"> 
            <h1>Product Description</h1>
               {ReactHtmlParser(Description)}
            <ProductTag product={this.props.product}/>
        </div>
      
    );
  }
}

export default ProductDetailLongDescription;















