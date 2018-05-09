import React from "react";
import ReactStars from "react-stars";
import PaginationContainer from './PaginationContainer';
import TimeAgo from 'timeago-react';
class ProductComment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const product = this.props.product || {};
    const comments = product.comments || [];
    const star = product.Star || [0, 0, 0, 0, 0, 0];
    const arr = [5, 4, 3, 2, 1];

    const sum = arr
      .map(index => {
        return star[index];
      })
      .reduce((a, b) => a + b, 0);
      const ProductCommentComponent = ({ data }) => {
        return (
          <div>
         <div className="ratingbox">
          <div className="col-sm-2" style={{paddingLeft:'0px',paddingRight:'0px'}}>
          <img className="img__rating"  src={''} />
            </div>
          <div className="col-sm-10" style={{paddingLeft:'0px',paddingRight:'0px'}}>
              <div className="comment_rating">
                <div className="star__username">        
                <ReactStars className="product__rating_star"  count={5} size={20} edit={false} value={5} /> <p> {data.name} - <TimeAgo datetime={data.date} /></p>
                
                </div>
                <p>{data.content}</p>
              </div>
          </div>
         </div>
         <hr className="hr__rating"/>
         </div>
        );
      };
      
    return (
    
      <div style={{  height: "100%" }}>
          <PaginationContainer
          Component={ProductCommentComponent}
          items={comments}
          itemsPerPage={3} 
        />
     </div>

    );
  }
}

export default ProductComment;
