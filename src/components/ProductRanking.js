import React from "react";
import ProgessBar from "./ProgressBar";
import ReactStars from "react-stars";
import ProductComment from "./ProductComment";
import UserReviewTextbox from "./UserReviewTextbox";
import PaginationContainer from './PaginationContainer';


class ProductRanking extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const product = this.props.product || {};
    const comments = product.comments || [];
    console.log("product ranking",product);
    console.log("comment ranking",comments);
    const star = product.star || [0, 0, 0, 0, 0, 0];
    const arr = [5, 4, 3, 2, 1];
    const sum = arr
      .map(index => {
        return star[index];
      })
      .reduce((a, b) => a + b, 0);

   

    return (
      <div className="col-sm-12" >
        <div >
          <UserReviewTextbox/>
          <h2 className="pageable_container_title"> Product Ranking</h2>
          <p className="pageable_container_number_products">(103 รีวิว)</p>
        </div>
        <div className="div-column">
          {arr.map(index => {
            const value = star[index] / sum * 100;
            return (
              <div key={index} className="div-row">
                <div style={{ marginRight: 10 }}>{index}</div>
                <ProgessBar value={value} />
                <div style={{ marginLeft: 10 }}>{star[index]}</div>
              </div>
            );
          })}
        </div>
        <div className="div-column">
          <ProductComment comments={comments} product={product}/>
              
           
         
        </div>
        </div>


   
    );
  }
}

export default ProductRanking;
