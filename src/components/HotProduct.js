import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import ProductListItem from './ProductListItem';
import { addToCart } from '../actions/cart';
class HotProduct extends React.Component {

    render() {
        
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,
            autoplay: true,
            autoplaySpeed: 1500
          };

        return (
            <div className="product__body">
                    <h1 > <img src={''}/> </h1>
                    <div className="carousel__body">
                    </div>
            </div>
        )
    }

}


export default HotProduct;