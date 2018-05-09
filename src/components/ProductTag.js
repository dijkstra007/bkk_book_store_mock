import React from "react";
import Router from "next/router";
import { addCount } from "../actions/count";
import { firebase } from "../firebase/firebase";
import withRedux from "next-redux-wrapper";
import configureStore from "../store/configureStore";
import * as API from '../constants/apiURL';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';

import {getStar} from '../selectors/products'
import ReactStars from "react-stars";

const store = configureStore();

class ProductTag extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  componentWillUnmount() {}

  render() {
    const Tag = this.props.product.hashTag || [];
    return (
     
        <div className="col-sm-12 "> 
           { Tag == [] ? 
           <p className="product__tag__title">Tag ยอดนิยม</p>
            :
              null
            }
            
            <p className="product__tag__title">
                {
                    Tag
                    ? Tag.map(text =>  <span key={text.toString()} className="product__tag__theme product__tag__small product__tag__tag">{text}</span>) 
                    : ""
                }
                
            </p> 
        </div>
      
    );
  }
}

export default ProductTag;













