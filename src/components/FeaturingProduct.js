import React from 'react';
import { connect } from 'react-redux';
import database from '../firebase/firebase';
import ProductListItem from './ProductListItem';
import { addToCart } from '../actions/cart';
import LoadingPage from './LoadingPage';
import Slider from 'react-slick';
class FeaturingProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }

    }
    componentDidMount()  {
        this.startGetFeaturingProductOnFirebase();    
    }
    componentWillReceiveProps(nextProps) {
        const products = nextProps.products
        this.setState({products:products});
    }

    startGetFeaturingProductOnFirebase = () => {
        const page = this.props.onPage;
        database
            .ref('products')
            .orderByChild('featuring_on')
            .equalTo('main_page')
            .once('value')
            .then((snapshot) => {
                const products = []
                snapshot.forEach( (childSnapshot) => {
                    products.push( childSnapshot.val() );
                })
                this.setState({products:products});
            })
            .catch((e) => {
                console.log("error", e);
            })
    }
    render() {
        if(this.state.products.length === 0 ) {
            this.startGetFeaturingProductOnFirebase();
            return <LoadingPage />
        }
        const products = this.state.products;
        const onAddToCartClick = this.props.onAddToCartClick;
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
                    {
                        products.map( (product,index) => {
                            return (
                                 <li key={index} className="product__slider  product-list__item">
                                    <ProductListItem {...product}/>
                                    <div className="col-sm-4 flex">
                                        <button className="product__button-wrap" onClick = {() => {onAddToCartClick(product) }}> Add to cart </button>
                                    </div>
                                </li> 
                            )
                        })
                    }
                    </div>
            </div>
        )
    }

}

export default connect(undefined, undefined)(FeaturingProduct);