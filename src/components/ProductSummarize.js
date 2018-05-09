import React from 'react';
import { connect } from 'react-redux';
import { startCheckCoupon } from '../actions/coupon'
import {getDisCountPrice, getTotalItem, getTotalPrice} from '../selectors/cart'
import ProductListItem from './ProductListItem';
import MyCartItems from './MyCartItems';
import commaNumber from 'comma-number';

class ProductSummarize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: this.props.myCart.products,
            coupon: {
                ...this.props.coupon
            },
            applyCouponClicked: false,
        }
    }
    componentWillReceiveProps(nextProps) {
    
        this.setState({coupon:{name:nextProps.coupon.name,
                        ok nextProps.coupon.ok,
                        type: nextProps.coupon.type,
                        amount: nextProps.coupon.amount
        }})
    }
    onNextHandler = () => {
        this.props.onDone();
    }
    
    onApplyCouponClick = () => {
        const couponName = this.state.coupon.name;
        this.setState({applyCouponClicked:true})
        this.props.dispatchCheckCoupon(couponName);
    }
    onApplyCouponChange = (e) => {
        const couponName = e.target.value
        this.setState({coupon:{
            ...this.state.coupon,
            name: couponName
        }});

    }
    render() {
        const props = this.props;
        const coupon = this.state.coupon;
        const products = this.state.products || [];
        const totalPrice = getTotalPrice(products);
        const totalItem = getTotalItem(products);
        const discountedPrice = getDisCountPrice(products, coupon);

        return (
            <div className="row__address">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 col-md-pull-6 col-sm-pull-6">
                    <div className="panel panel-info">
                        <div className="panel-heading">ProductSummarize</div>
                        <div className="panel-body">
                            <br></br>
                            <div>
                                <div className="content">
                                    <div className="product__summarize shopping-cart ">
                                    <div className="item__head">
                                        <div className="image">
                                        <span></span>
                                        </div>
                                        <div className="description">
                                            <span>Name</span>
                                        </div>
                                    
                                        <div className="quantity">
                                        <span>Quantity</span>
                                        </div>
                                    
                                        <div className="total-price">Price</div>
                                    </div>
                                    </div>
                                </div>
                                {
                                        products.map( (product,index) => {
                                            const {id,quantity,image,url,price,name } = product;
                                            return (
                                                    <div key={index} >
                                                    <div className="content" key={index} >
                                                        <div className="product__summarize shopping-cart " >
                                                            <div className="item">
                                                                <div className="image">
                                                                <img src={image} alt="" />
                                                                </div>
                                                            
                                                                <div className="description">
                                                                <span> <a href={url}>{name}</a></span>
                                                                </div>
                                                                <div className="quantity"> 
                                                                <span className="quantity__num">{quantity}</span>
                                                                </div>
                                                                <div className="total-price">{price} Baht</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    </div>
                                                
                                            )
                                        })
                                    }
                            </div>
                            <div className="content">
                                    <p>Total price = ฿ {commaNumber(totalPrice)}</p>
                                    <p>Total item = {commaNumber(totalItem)} items </p>
                                    <p>After discount price = ฿ {commaNumber(discountedPrice)} </p>
                            </div>
                        </div>
                    </div>
            <div>
                        <div > Apply Coupon Code </div>
                        <input
                            type="text"
                            value={this.state.coupon.name}
                            onChange={this.onApplyCouponChange}
                            placeholder="ใส่คูปองโค้ด"
                        />
                        <button onClick = { () => {this.onApplyCouponClick()}}> Apply This Coupon </button>
            </div>
            <button onClick = {() => {this.onNextHandler()}}> Next </button>
            {this.state.applyCouponClicked?<p>Status {coupon.ok?"true":"false"}</p>:null}
            </div>
            </div>
        
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        myCart:state.myCart,
        coupon:state.coupon
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchCheckCoupon: (couponName) => dispatch(startCheckCoupon(couponName))

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ProductSummarize);