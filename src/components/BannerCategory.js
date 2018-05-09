import React from "react";
import Router from "next/router";
class BannerCategory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        search : ""
    }
}
onSearchChange = e => {
    const txt = e.target.value
    this.setState({search:txt})
  }


  onSearchClick = () => {
    const txt = this.state.search;
    Router.replace({
      pathname: "/productCategory",
      query: {...this.props, activeSearch: txt, activeCategoryList: undefined,activeProductType: undefined,activePage: 1 }
    });
  };
  enterPressed(event) {
    var code = event.keyCode || event.which;
    if(code === 13) { //13 is the enter keycode
        const txt = this.state.search
        Router.replace({
          pathname: "/productCategory",
          query: {...this.props, activeSearch: txt, activeCategoryList: undefined,activeProductType: undefined, activePage: 1 }
        });
    } 
  }
  render() {
    return (
      <div className="col-sm-12" style={{padding: "30px 50px",minWidth: "1200px"}}>
        <div className="col-sm-9">
            <img
              src={
                "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/BannerCategory01-min.png"
              }
            />
            <span className="text__banner">
              <h3>บริการส่งฟรี</h3> <p>ช้อปครบ 499 บาท</p>
            </span>
          <img
            src={
              "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/BannerCategory02-min.png"
            }
          />
          <span className="text__banner">
            <h3>บริการแนะนำด้านความงาม</h3> <p>ตลอด 24 ชม.</p>{" "}
          </span>
          <img
            src={
              "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/BannerCategory03-min.png"
            }
          />
          <span className="text__banner">
            <h3>สินค้าใหม่</h3> <p>อัปเดตทุกวัน พฤ.</p>{" "}
          </span>
        </div>
        <div className="col-sm-3">
          <div className="search-product-body" style={{textAlign: "right"}}>
            <input className="search-product-input" placeholder="ค้นหา" onChange={this.onSearchChange} value={this.state.search} onKeyPress={this.enterPressed.bind(this)}/>
            <button className="search-product-search-button" onClick={this.onSearchClick}>
              <img width="19" height="19"
                src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/search-min.png"} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default BannerCategory;
