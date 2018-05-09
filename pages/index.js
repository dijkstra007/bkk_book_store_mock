import React from "react";
import Router from "next/router";
import { addCount } from "../src/actions/count";
import { firebase } from "../src/firebase/firebase";
// import LoadingPage from './LoadingPage';
import MainLayout from "../src/layouts/MainLayout";
import withRedux from "next-redux-wrapper";
import configureStore from "../src/store/configureStore";
import BannerSlider from "../src/components/BannerSlider";
import HighLightItems from "../src/components/HighLightItems";
import HotProduct from "../src/components/HotProduct";
import LandingAcademy from "../src/components/LandingAcademy";
import LandingProductList from "../src/components/LandingProductList";
import LandingPreviewArticle from "../src/components/LandingPreviewArticle";
import Promotion from "../src/components/Promotion";
import RecommendedItems from "../src/components/RecommendedItems";
import SearchProduct from "../src/components/SearchProduct";
import SubMenu from "../src/components/SubMenu";
import { setMyCart } from '../src/actions/cart';
import * as API from "../src/constants/apiURL";
import * as PRODUCT from '../src/constants/products';
import FlashDeal from "../src/components/FlashDeal";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

// import store from '../src/store/store';

const store = configureStore();

class App extends React.Component {
  static getInitialProps({ store, isServer }) {
    return { isServer };
  }

  constructor(props) {
    super(props);
    this.state = {
      myCartProducts: [],
      guests: [
        {
          name: 'KK',
          isConfirmed: false
        }
      ],
        x: 0,
        y: 0,
        top: "100%",
        right: "100%",
        classNameExt: ""
    };
  }

  getBound = () =>
  {

    
      this.setState(
        {
          ...this.state,
          top: this.state.y +"px",
          right: this.state.x + "px",
          classNameExt:  "slide_animation_cart"
        });
        console.log(this.state.top +"," + this.state.right + this.state.classNameExt);
        setTimeout(function() { this.setState({classNameExt:  ""}); ;}.bind(this), 5000);

  }

  componentDidMount() {

  }

  componentWillUnmount() {}

  componentWillReceiveProps(props) {
    this.setState({ myCartProducts: props.myCart.products });
  }

  onAddCountClick = () => {
    this.props.addCount();
  };
  onNextClick = () => Router.push({ pathname: "/OtherCountPage" });

  render() {
    return (
      <MainLayout pathname={this.props.url.pathname}>
        <div style={{minWidth: "1200px"}}>
          <BannerSlider />
        </div>
            <div style={{minWidth: "1200px"}} className="div-split-component-in-flex-row-container div-menu-search-product-container">
              <SubMenu/> 
              <SearchProduct />
            </div>
        <BrowserView device={isBrowser}>
          <div className="body__container__ninety__mainpage">

          {/* <FlashDeal /> */}

            {/* <li ref = {"hello" }><span>{"beam"}</span>
              <label>
                <input type="checkbox" checked /> Confirmed
              </label>
              <button onClick={()=>this.getBound()}>edit</button>
            
            </li> */}
            <HighLightItems
              // title="NINETI9 RANKING"
              // subTitle="สินค้าฮอดฮิต"
              title="สินค้าฮอตฮิต"
              subTitle=""
              productType={PRODUCT.TYPE.HOTITEMS}
              adsImg="https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/banner+mainpage/Banner+Noona+1126x1501.png"
            />
 
            <HighLightItems
              // title="HOT ITEM"
              // subTitle="สินค้ารีวิวฮอตฮิต"
              title="สินค้ารีวิวฮอตฮิต"
              subTitle=""
              productType={PRODUCT.TYPE.NINETI9RANKING}
              adsImg="https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/brand+logo/banner02-400-min.png"
            />
             
            
            <Promotion />
            <LandingAcademy  />
            <RecommendedItems />
            <LandingProductList />
            {/* <div className="div-preview-article-container">
              <LandingPreviewArticle
                title="NINETI9 PICK"
                img=""
              />
              <LandingPreviewArticle
                title="QUICK TIP"
                img=""
              />
              <LandingPreviewArticle
                title="REVIEW"
                img=""
              />
            </div> */}
            <div style={{height: "50px"}}/>
          </div>
        </BrowserView>
        <MobileView device={isMobile}>
          <div className="body__container__ninety__mainpage">
            

          {/* <FlashDeal /> */}

            {/* <li ref = {"hello" }><span>{"beam"}</span>
              <label>
                <input type="checkbox" checked /> Confirmed
              </label>
              <button onClick={()=>this.getBound()}>edit</button>
            
            </li> */}
            <HighLightItems
              // title="NINETI9 RANKING"
              // subTitle="สินค้าฮอดฮิต"
              title="สินค้าฮอตฮิต"
              subTitle=""
              productType={PRODUCT.TYPE.HOTITEMS}
              adsImg="https://s3-ap-southeast-1.amazonaws.com/nineti9ecommerce/banner+mainpage/Banner+Noona+1126x1501.png"
            />
            <HighLightItems
              // title="HOT ITEM"
              // subTitle="สินค้ารีวิวฮอตฮิต"
              title="สินค้ารีวิวฮอตฮิต"
              subTitle=""
              productType={PRODUCT.TYPE.NINETI9RANKING}
              adsImg="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/banner02-min.png"
            />
            
            <Promotion />
            <LandingAcademy />
            <RecommendedItems />
            <LandingProductList />
            {/* <div className="div-preview-article-container">
              <LandingPreviewArticle
                title="NINETI9 PICK"
                img=""
              />

              <LandingPreviewArticle
                title="QUICK TIP"
                img=""
              />              
              <LandingPreviewArticle
                title="REVIEW"
                img=""
              />
            </div> */}
            <div style={{height: "50px"}}/>
          </div>
        </MobileView>
      </MainLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    myCart : state.myCart
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMyCart : (products) => dispatch( setMyCart(products) )
  }
}
export default withRedux(configureStore,mapStateToProps,mapDispatchToProps)(App);
