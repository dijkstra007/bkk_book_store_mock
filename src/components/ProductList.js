import React from 'react';
import ProductListItem from './ProductListItem';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cart'
import { startGetProducts } from '../actions/products'

class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            products:this.props.products || [],
        }
    }
    componentWillReceiveProps(nextProps) {
        const products = nextProps.products
        this.setState({products:products});
    }
    render() {
        const products = this.state.products;
        const onAddToCartClick = this.props.onAddToCartClick;
        return (
            <div className="product__body">
                    <h1> Product List </h1>
                     <ul className="product-list">  
                    {
                        products.map( (product,index) => {
                            return ( 
                                <li key={index} className="product-list__item">
                                    <ProductListItem {...product}/>
                                    <div className="col-sm-4 flex">
                                        <button className="product__button-wrap" onClick = {() => {onAddToCartClick(product) }}> Add to cart </button>
                                    </div>
                                </li>
                            )
                        })
                    }
                    </ul>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{ 
    return ({
        products:state.products.productList
    })
}
const mapDispatchToProps = (dispatch) => ({
    onAddToCartClick: (product) => {
        return dispatch(addToCart(product,1));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);