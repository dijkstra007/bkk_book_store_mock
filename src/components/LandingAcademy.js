import React from "react";
import { connect } from "react-redux";
import Academy from './Academy';


const Carousel = require("react-responsive-carousel").Carousel;

class LandingAcademy extends React.Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
 
  }
 
  render() {
   
    return (
        <div className="landing-academy-body">
            <div className="promotion-title">
                <img src = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/academy-min.png" />
            </div>
            <Academy  title="NEWLOOK" topic="Summer Glam Look!" img="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/Downy+-+Copy-min.png"/>
            {/* <Academy title="EYETA" topic="แต่งหน้า สาย ฝ. ด้วย ลุค Ariana Grande" img="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/EYETA-min.png" bgColor="#00ECD3"/>
            <Academy title="NURS" topic="สไตล์ Cool girl ชิกๆ ต้อนรับลมหนาว" img="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/NURS-min.png" bgColor="#FFC121"/> */}
        </div>
        )
    }
}

export default LandingAcademy;
