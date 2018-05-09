import React from "react";
import { connect } from "react-redux";
import Link from "next/link";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer__body">
        <div className="footer__color">
          <div className="footer">
            <img
              className="logo"
              src="https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/Footer_LogoNinetinine-min.png"
            />
            <p style={{fontWeight: "bold", fontSize: "26px"}}>ให้เราดูแลคุณ </p>
            
            {/* <p>เว็บไซต์เครื่องสำอางออนไลน์ </p>
            <p>สินค้าคุณภาพ</p>
            <p>ราคาสบายกระเป๋า</p> */}
          </div>
          <div className="footer">
            <p style={{fontSize: "30px",margin:"20px 0px"}}>ช่วยเหลือ</p>
            <Link href={{ pathname: '/about', query: { about: "HowToOrder" } }}>
            <p className="footer_content_pointor">สั่งซื้ออย่างไร</p>
            </Link>
            <Link href={{ pathname: '/about', query: { about: "HowToShipping" } }}>
            <p className="footer_content_pointor">วิธีการชำระเงิน</p>
            </Link>
            <Link href={{ pathname: '/about', query: { about: "HowToDelivery" } }}>
            <p className="footer_content_pointor">การจัดส่ง</p>
            </Link>
            <Link href={{ pathname: '/about', query: { about: "FAQ" } }}>
            <p className="footer_content_pointor">คำถามที่พบบ่อย</p>
            </Link>
          </div>
          <div className="footer">
          <p style={{fontSize: "30px",margin:"20px 0px"}}>บริการ</p>
            <Link href={{ pathname: '/about', query: { about: "QualityGuarantee" } }}>
            <p className="footer_content_pointor">รับประกันคุณภาพ</p>
            </Link>
            <Link href={{ pathname: '/about', query: { about: "ExchangeReturn" } }}>
            <p className="footer_content_pointor">แลกเปลี่ยน/คืน</p>
            </Link>
            {/* <Link href={{ pathname: '/about', query: { about: "Supplier" } }}>
            <p className="footer_content_pointor">ผู้จัดจำหน่าย</p>
            </Link>*/}
          </div> 
          <div className="footer">
          <p style={{fontSize: "30px",margin:"20px 0px"}}>บริษัท</p>
            <Link href={{ pathname: '/about', query: { about: "AboutNineti9" } }}>
            <p className="footer_content_pointor">เกี่ยวกับ NINETI9</p>
            </Link>
            {/* <Link href={{ pathname: '/about', query: { about: "JoinUs" } }}>
            <p className="footer_content_pointor">ร่วมงานกับเรา</p>
            </Link> */}
            {/* <Link href={{ pathname: '/about', query: { about: "ContactUs" } }}>
            <p className="footer_content_pointor">ติดต่อเรา</p>
            </Link> */}
            <Link href={{ pathname: '/about', query: { about: "PrivacyPolicy" } }}>
            <p className="footer_content_pointor">นโยบายความเป็นส่วนตัว</p>
            </Link>
            {/* <Link href={{ pathname: '/about', query: { about: "Agreement" } }}>
            <p className="footer_content_pointor">ข้อตกลงและเงื่อนไข</p>
            </Link> */}
          </div>
          <div className="footer">
          <p style={{fontSize: "30px",margin:"20px 0px"}}>ติดต่อเรา</p>
            <p>เวลาทำการ</p>
            <p>จันทร์-เสาร์ </p>
            <p>9.00-18.00 น.</p>
            <p>Tel. 080 264 2812 </p>
          </div>
          <div />
          <div className="footer-bottom-container">
            <span className="left">© 2017 Nineti9.com All Rights Reserved</span>
            <div className="right">
              <a href="https://www.facebook.com/messages/t/nineti9" target="_blank" >
                <img className="icon_contact_footer" src = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/messager-footer-min.png"/>
              </a>
              <a href="https://www.facebook.com/nineti9" target="_blank" >
                <img className="icon_contact_footer" src = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/facebook-footer-min.png"/>
              </a>
              <a href="https://www.instagram.com/nineti9.th/" target="_blank" >
                <img className="icon_contact_footer" src = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/instagram-footer-min.png"/>
              </a>
              <a href="https://line.me/R/ti/p/%40pgk8406w" target="_blank" >
                <img className="icon_contact_footer" src = "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/line-footer-min.png"/>
              </a> 
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;