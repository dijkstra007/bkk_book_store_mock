import React from "react";
import HeaderLayout from "./HeaderLayout";
import PreviewProduct from "./PreviewProduct";
import * as API from '../constants/apiURL';

class RecommendedItems extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      products:  [],
      productRecommend: []
    };
  }

  componentDidMount() {
    fetch(API.GET_PRODUCTS+"/type/recommendeditems1").then(response => {
      return response.json()
    }).then( data => {
      const productRecommend = [];
      for (var i = 0; i < 4; i++) {
        productRecommend.push(data[i]);
       }
     
     
      this.setState({products:data,productRecommend:productRecommend});
    })
  }

  render() {
    const products = this.state.products;
    const productRecommend = this.state.productRecommend;
    const previewSize = {height:280,width:280};
    const starSize = 20;
    return (
      <div className="recommended-body">
            <div className="promotion-title">
                <img src = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/recommend-min.png" />
            </div>
        <div className="col-sm-12" style={{ textAlign: "center"}}>
        <div className="recommended-products-container">
          {productRecommend.map((product, idx) => {
            console.log("rec idx",idx); 
            return (
              
                  <PreviewProduct
                    key={idx}
                    product={product}
                    img={product.img}
                    imgSize={previewSize}
                    starSize={starSize}
                  />
               
            );
            


          })}
        </div>
        </div>
      </div>
    );
  }
}

export default RecommendedItems;
