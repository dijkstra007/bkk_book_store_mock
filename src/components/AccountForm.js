import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import Link from "next/link";

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const user = this.props.user;
    const displayName = user.displayName ? user.displayName : user.email;
    const displayUrl = user.profileImage
      ? user.profileImage
      : "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/nineti9-pink-min.png";

    return (
      <div className="col-sm-3" style={{ marginBottom: "20px" }}>
        <div className="table__user__profile">.</div>
        <div className="user-info-main">
          <p className="user__displayname">บัญชีของ {displayName} </p>
          <div>           
              <img
                src={displayUrl}
                style={{ borderRadius: "50%", width: "75px", height: "75px",maxWidth: "100px",maxHeight: "100px" }}
              />
              <br/>
              <p  className="user__long__displayname">{displayName}</p>
              <p className="user__membership">Membership: Standard</p>
          </div>
          <Link href="/userInfomation">
              <button style={{fontFamily: "db_heavent_med"}} className="account-button">แก้ไขข้อมูลส่วนตัว</button>
          </Link>

          <div className="check-status">
            <div className="main-pink">ตรวจสอบสถานะสินค้า</div>
            <div
              className=""
              style={{ display: "inline-block", width: "100%"}}
            >
            <div className="col-sm-12" style={{padding: "0px 5px 0px 5px"}}>
              <div className="user__check__tracking" >
                <a
                  href="http://track.thailandpost.co.th/tracking"
                  target="_blank"
                  style={{ color: "black", textDecoration: "none"}}
                >
                  ไปรษณีย์ไทย
                </a>
              </div>
            </div>
              {/* <div className="col-sm-6" style={{padding: "0px 5px 0px 5px"}}>  
                <div className="user__check__tracking" >
                  <a
                    href="http://track.quantiumsolutions.com/"
                    target="_blank"
                    style={{ color: "black", textDecoration: "none"}}
                  >
                  <div>
                    Quantium
                    </div>
                  </a>
                </div>
              </div>   */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountForm;
