import React from "react";

class AboutNineti9 extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="about-content-container-center">
        <div>เกี่ยวกับ</div><br/>
        <img width="250px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/logo-main-min.png" /><br/>
        <img style={{background: "#FD97A0", height: "450px",margin: "30px"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/about-nineti9-min.png"}/><br/>
        <div className="about-content-bold">เว็บไซต์ขายเครื่องสำอางออนไลน์ ที่ตอบโจทย์ทุกความต้องการของคุณ</div>
        <div>
            <p>รวบรวมสินค้าครบครันจากหลากหลายแบรนด์มาให้เลือกอย่างจุใจ มีสินค้าครบทุกประเภท และมั่นใจได้ว่าเป็นของแท้ มีคุณภาพทุกชิ้น ได้รับการรับรองจากผู้จัดจำหน่าย
            สามารถเลือกสรรสินค้าได้ตามปัญหาที่คุณพบเจอ พร้อมรีวิวประกอบการตัดสินใจ อีกทั้งเรายังพร้อมให้คำสอบถาม และคำแนะนำสินค้าทุกชิ้นด้วยความจริงใจ
            ให้เหมาะกับคุณที่สุด สั่งซื้อได้ทุกช่องทาง พร้อมจัดส่ง 24 ชม. เพื่อให้ทุกการซื้อเป็นเรื่องง่าย</p>
        </div>
        <div className="about-content-bold">
          <img width="13px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/heart-icon-min.png"/>
          &nbsp; ให้ Nineti9 ดูแลคุณ  &nbsp;
          <img width="13px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/heart-icon-min.png"/>
        </div>
      </div>
    );
  }
}
export default AboutNineti9;
