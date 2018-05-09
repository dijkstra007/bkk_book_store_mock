import React from "react";
import ToolTip from "react-portal-tooltip";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Link from 'next/link'
class MyAccountHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  onLogoutClick = () => {
      this.props.onLogout();
  }


  render() {
    const showMyAccount = this.props.show;
    const parent = "#my_account";

    return (
      <ToolTip
        active={showMyAccount}
        position="bottom"
        arrow="center"
        parent={parent}
        tooltipTimeout={0}
      >
        <div className="header-my-account-menu">
          <Link href="/userInfomation">
            <a className="header-my-account-menu-list" style={{textDecorationLine: "none"}}>ข้อมูลบัญชี</a>
          </Link>
          <hr className="header-my-account-menu-grey-line" />
          <Link href="/purchaseHistory">
            <button className="header-my-account-menu-list">
              รายการสั่งซื้อ
            </button>
          </Link>
          <hr className="header-my-account-menu-grey-line" />
          <button className="header-my-account-menu-list" onClick={this.onLogoutClick}>
            ออกจากระบบ
          </button>
        </div>
      </ToolTip>
    );
  }
}

export default MyAccountHeader;
