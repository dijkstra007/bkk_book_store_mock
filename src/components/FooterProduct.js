import React from "react";

class FooterProduct extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col-sm-12" style={{ textAlign: "center", marginTop: "20px" }}>
        <div className="col-sm-2" style={{ textAlign: "center" }} />
        <div className="col-sm-3 contact__body__productCategory">
          <h3 style={{ fontFamily: "db_heavent_med", fontSize: "26px", margin: "0px" }}>ติดต่อสอบถาม</h3>
          <div className="rec__contact">080-264-2812</div>
          <h3 style={{ fontSize: "26px", margin: "0px" }}>
            จันทร์ - เสาร์ 9.00-18.00 น.
          </h3>
        </div>
        <div className="col-sm-4" style={{ marginTop: "30px" }}>
          <div style={{ display: "inline-block", width: "50%", textAlign: "left", paddingLeft: "20px"}}>
            <a href="https://www.facebook.com/messages/t/nineti9" target="_blank">
              <img style={{width: "20px", height: "20px"}} src={ "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/messager-black-icon-min.png"} />
              <span style={{fontSize: "26px", margin: "0px 50px 0px 10px", display: "inline-block", color: "black"}}>
                Nineti9
              </span>
            </a>
          </div>
          <div style={{ display: "inline-block", width: "50%", textAlign: "left" }}>
            <a href="https://www.facebook.com/nineti9" target="_blank">
              <img style={{width: "20px", height: "20px"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/facebook-black-icon-min.png"}/>
              <span style={{ fontSize: "26px", margin: "0px 50px 0px 10px", display: "inline-block", color: "black"}} >
                Nineti9
              </span>
            </a>
          </div>
          <br />
          <div style={{ display: "inline-block", width: "50%", textAlign: "left", paddingLeft: "20px"}}>
            <a href="https://www.instagram.com/nineti9.th/" target="_blank">
              <img style={{width: "20px", height: "20px"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/instagram-black-icon-min.png"}/>
              <span style={{ fontSize: "26px", margin: "0px 50px 0px 10px", display: "inline-block", color: "black"}} >
                nineti9.th
              </span>
            </a>
          </div>
          <div style={{ display: "inline-block", width: "50%", textAlign: "left" }}>
            <a href="https://line.me/R/ti/p/%40pgk8406w" target="_blank">
              <img style={{width: "20px", height: "20px"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/line-black-icon-min.png"} />
              <span style={{ fontSize: "26px", margin: "0px 50px 0px 10px", display: "inline-block", color: "black"}} >
                @nineti9
              </span>
            </a>
          </div>
        </div>
        <div className="col-sm-3 payment__body__productCategory" style={{height: "120px"}}>
          <div>
          <h3 style={{ fontFamily: "db_heavent_med", fontSize: "26px", margin: "0px" }}>
            ช่องทางการชำระเงิน
          </h3>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <img height="30px" style={{marginRight: "10px"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/scb-min.png"}/>
                <img height="60px" style={{marginRight: "10px"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/prompt-pay-min.png"}/>
                <img height="30px" src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/visa-mastercard-min.png"}/>
            </div>
          </div>
        </div>
        <div className="col-sm-1" style={{ textAlign: "center" }} />
      </div>
    );
  }
}
export default FooterProduct;
