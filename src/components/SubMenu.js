import React from "react";
import MiniMenu from "./MiniMenu";

class SubMenu extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="div-mini-menu" >
        <MiniMenu
          title="NINETI9 PICKS"
          img="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/NINETI9+PICKS-min.png"
        />
        <MiniMenu
          title="QUICK TIPS"
          img="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/QUICK+TIPS-min.png"
        />
        <MiniMenu 
          title="NINETI9 ACADEMY"
          img="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/NINETI9+ACADEMY-min.png"
        />
        <MiniMenu
          title="LIFESTYLE"
          img="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/LIFESTYLE-min.png"
        />
        <MiniMenu
          title="REVIEW"
          img="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/REVIEW-min.png"
        />
      </div>
    );
  }
}
export default SubMenu;
