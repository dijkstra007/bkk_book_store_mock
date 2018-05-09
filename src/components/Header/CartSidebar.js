import React from "react";
import Router from "next/router";
import { connect } from "react-redux";
import Link from "next/link";

import { firebase } from "../../firebase/firebase";
import withRedux from "next-redux-wrapper";
import configureStore from "../../store/configureStore";
import * as API from "../../constants/apiURL";
import ToolTip from "react-portal-tooltip";
import MyCartItems from "../MyCartItems";
const store = configureStore();

class CartSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {}

  componentWillUnmount() {}
  componentWillReceiveProps(props) {
    this.setState({ products: props.myCart.products });
  }
  onCartClose = () => {
    this.props.onCartClose();
  };

  render() {
    const showCart = this.props.showCart;
    const products = this.props.myCart.products;
    const parent = "#cart_parent";
    let style = {
      style: {
        left: "unset",
        right: "0px"
      },
      arrowStyle: {
        // color: 'rgba(0,0,0,.8)',
        // borderColor: false
      }
    };
    return (
      // <ToolTip
      //   active={showCart}
      //   position="bottom"
      //   parent={parent}
      //   tooltipTimeout={0}
      //   style={style}

      // >
      //   <div style={{display:"table"}} onMouseLeave={this.onCartClose}>

      //   <div className="cart__sidebar__title" >
      //     <div className="col-sm-4"></div>
      //     <div className="col-sm-4" style={{fontSize:"26px"}}>ตะกร้าของฉัน</div>
      //     <div className="col-sm-4 cart__sidebar__close">
      //       <button className="button button--my-basket" onClick={ this.onCartClose}>
      //         <img style={{width:"15px",height:"15px"}} src={'http://flaticons.net/icons/Office/Wrong.png'}/>
      //       </button>
      //     </div>
      //   </div>
      //   <div>
      //     <div className="cart__sidebar__body">
      //       <MyCartItems imgSize={ {height: 87, width: 87 }} products={products}/>
      //     </div>
      //     <div className="col-sm-12 cart__sidebar__body__button">
      //       <Link href="/productOrder">
      //         <button className="button cart__sidebar__button" style={{fontSize:"26px"}}>ตกลงสั่งซื้อ</button>
      //       </Link>
      //     </div>
      //   </div>

      // </div>
      // </ToolTip>


          <div style={{ position: "absolute", display: "flex", zIndex: "1", right: "0px", top: "50px", background: "white", boxShadow: "0px 0px 5px #95989A" }}>
            <div style={{display:"table"}} onMouseLeave={this.onCartClose} >
            <div className="col-sm-12 cart__sidebar__title__notooltip">
              <div className="col-sm-4"></div>
              <div className="col-sm-4" style={{fontSize:"26px"}}>ตะกร้าของฉัน</div>
              <div className="col-sm-4 cart__sidebar__close">
                <button className="button button--my-basket" onClick={ this.onCartClose}>
                  <img style={{width:"15px",height:"15px"}} src={'http://flaticons.net/icons/Office/Wrong.png'}/>
                </button>
              </div>
            </div>
            <div>
              <div className="cart__sidebar__body">
                <MyCartItems imgSize={ {height: 87, width: 87 }} products={products}/>
              </div>
              <div className="col-sm-12 cart__sidebar__body__button">
                <Link href="/productOrder">
                  <button className="button cart__sidebar__button" style={{fontSize:"26px"}}>ตกลงสั่งซื้อ</button>
                </Link>
              </div>
            </div>

            </div>
          </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    myCart: state.myCart
  };
};
export default connect(mapStateToProps, undefined)(CartSidebar);
