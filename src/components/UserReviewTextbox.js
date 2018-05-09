import React from "react";
import Link from "next/link";
import ReactStars from "react-stars";
import ProductComment from "./ProductComment";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

class UserReviewTextbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { startLogout, myCart = {}, user = {} } = this.props;
    const isAuthenticated = user.email !== "";
    const Nickname = user.displayName || "GUEST";
    const Email = (user.email !== null ? user.email : user.displayName) || "GUEST";

    return (
    <div style={{width:'100%'}}>
        <div className="product__detail__status">
            <h3 className="comment__box__title">Your Rating</h3>
            <ReactStars className="product__detail_product_star"  count={5} size={25} edit={true} value={5} />
        </div>
        <textarea className="comment__box" placeholder="Your review…." rows="5" cols="40">
        {/* user's comment */}
        </textarea>
        <div className="col-sm-8" style={{padding:"0px"}}>
        <div className="comment__box__displayNickname"> {Nickname}</div>
        <div className="comment__box__displayEmail"> {Email}</div>
        </div>
        <div className="col-sm-4"> 
            <button className="button review_button">
            ริวิวเลย
          </button>
        </div>

    </div>


   
    );
  }
}

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(startLogout())
  });
  
  const mapStateToProps = state => {
    return { user: state.user, myCart: state.myCart };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(UserReviewTextbox);
// export default UserReviewTextbox;
