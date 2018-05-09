import React from "react";

class QuanlityGuarantee extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="about-HowToDelivery-container">
        <div className="about-content-title-nopad">รับประกันผลิตภัณฑ์แท้ทุกชิ้น</div>
        <div>
          สินค้าภายในเว็บไซต์เราเป็นสินค้าแท้ทุกชิ้น เนื่องจากเรารับสินค้ามาจากผู้จัดจำหน่ายโดยตรง 
          และเรายังได้จดทะเบียนเป็นร้านค้าบนเครือข่ายอินเทอร์เน็ตอย่างถูกต้องกับกระทรวงพาณิชย์ 
          ซึ่งสามารถตรวจสอบได้ ทำให้ท่านมั่นใจได้ว่าเว็บไซต์เรามีความน่าเชื่อถือ และมีสินค้าที่มีคุณภาพ
        </div><br/>
        <div className="about-content-container-center">
          <img style={{width: "60%"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/quality-guarantee-min.png"}/>
        </div>
      </div>
    );
  }
}
export default QuanlityGuarantee;
