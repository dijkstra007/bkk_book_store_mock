import React from 'react';
import ProductListItem from './ProductListItem';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cart'
import { startGetProducts } from '../actions/products'

class ProductReccommended extends React.Component{
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
                     <h1 > <img src={'https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/recommend-item-min.png'}/> </h1>
                     <ul className="product-list">  
                        <div>
                            <img className="img__productReccommended" src={''}/>
                            <img className="img__productReccommended" src={''}/> 
                            <img className="img__productReccommended" src={''}/>     
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                    <td>
                                    <img className="img__productReccommended" src={''}/> 
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductReccommended);