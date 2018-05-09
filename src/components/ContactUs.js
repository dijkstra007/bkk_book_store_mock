import React from "react";

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
  }
  changeContactUsToFAQ = () => {
    this.props.change();
  }
  render() {
    return (
      <div className="about-content-container-center">
        <div className="about-content-container-left">
          <p> &nbsp; &nbsp; &nbsp; &nbsp; คุณสามารถส่งข้อความสอบถามมาทางเราได้โดยการกรอกข้อมูลและข้อความด้านล่าง ตรวจสอบ 
              <span className="about-content-link" style={{color: "#FD97A0"}} onClick={this.changeContactUsToFAQ}>&nbsp; คำถามที่พบบ่อย &nbsp;</span>
            เพื่อให้แน่ใจและช่วยในการหาคำตอบของคุณได้ง่ายขึ้น
            ขอสงวนลิขสิทธิ์ในการสอบถามข้อมูลบัตรเครดิต ฝ่ายบริการลูกค้าไม่มีนโยบายการสอบถามข้อมูลบัตรเครดิตจากลูกค้า
          </p>
        </div>
        <form className="about-ContactUs-form">
          <input name="contactUs-name" type="search" placeholder="ชื่อ - นามสกุล" className="about-content-input" required />
          <input name="contactUs-email" type="email" placeholder="ที่อยู่อีเมล" className="about-content-input" required />
          <input name="contactUs-orderId" type="tel" placeholder="Order ID" className="about-content-input" style={{width: "49%", marginRight: "10px"}} required />
          <input name="contactUs-tel" type="tel" maxLength="10" placeholder="เบอร์โทรติดต่อ" className="about-content-input" style={{width: "49%"}} required />
          <input name="contactUs-orderId" type="search" placeholder="Country" className="about-content-input" style={{width: "49%", marginRight: "10px"}} required />
          <input name="contactUs-tel" type="tel" maxLength="5" placeholder="Postal code" className="about-content-input" style={{width: "49%"}} required />
          <input name="contactUs-name" type="search" placeholder="Type of issue" className="about-content-input" required />
          <div className="about-content-container-left">ข้อความ</div>
          <textarea name="contactUs-message" row="5" wrap="hard" className="about-content-input" required />
          <input name="contactUs-file" type="file" multiple style={{display: "none"}} />
          <div className="about-content-container-left" style={{fontSize: "18px"}}>* Upload file PDF or JPG Only</div>
          <div style={{height: "100px", fontSize: "20px"}}>
            <input name="contactUs-button" type="button" value="Upload file" className="about-content-input about-content-button-white" style={{width: "25%", float: "left"}} />
            <input name="contactUs-submit" type="submit" value="ส่งข้อมูล" className="about-content-input about-content-button-pink" style={{width: "45%", float: "right"}} />     
          </div>
        </form>
        <div className="about-ContactUs-contact">
          <div className="about-ContactUs-contact-component">
            <div className="about-content-bold">Call Center</div>
            <button className="about-content-button-pink" style={{width: "60%", fontSize: "32px"}}>02-345-6789</button>
            <div style={{fontSize: "24px"}}>จันทร์ - ศุกร์ 9.00 - 19.00 น</div>
            <div>อีเมล: purchase@Nineti9.com<br/>โทรสาร: 02-051-7310</div>
          </div>
          <div className="about-ContactUs-contact-component vertical-center">
            <div className="about-ContactUs-contact">
              <div className="about-ContactUs-contact-component">
                <div>
                  <img width="30px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/instagram.png" />&nbsp;&nbsp; Nineti9<br/>
                  <img width="30px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/messager.png" />&nbsp;&nbsp; Nineti9
                </div>
              </div>
              <div className="about-ContactUs-contact-component">
                <div>
                  <img width="30px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/line.png" />&nbsp;&nbsp; Nineti9<br/>
                  <img width="30px" src="https://s3-ap-southeast-1.amazonaws.com/nineti9/facebook.png" />&nbsp;&nbsp; Nineti9
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-ContactUs-contact">
          <div className="about-ContactUs-contact-component">
            <div className="about-content-bold">สนใจนำสินค้าขาย / เสนอผลิตภัณฑ์ใหม่</div>
            <button className="about-content-button-pink" style={{width: "60%", fontSize: "32px"}}>02-345-6789</button>
            <div>อีเมล: purchase@Nineti9.com<br/>โทรสาร: 02-051-7310</div>
          </div>
          <div className="about-ContactUs-contact-component">
            <div className="about-content-bold">ฝ่ายบริหารผลิตภัณฑ์และโปรโมชั่น</div>
            <button className="about-content-button-pink" style={{width: "60%", fontSize: "32px"}}>02-345-6789</button>
            <div>อีเมล: purchase@Nineti9.com<br/>โทรสาร: 02-051-7310</div>
          </div>
        </div>
        <div className="about-ContactUs-contact">
          <div className="about-ContactUs-contact-component">
            <div className="about-content-bold">ฝ่ายจัดซื้อ / บริหารสต๊อกสินค้า</div>
            <button className="about-content-button-pink" style={{width: "60%", fontSize: "32px"}}>02-345-6789</button>
            <div>อีเมล: purchase@Nineti9.com<br/>โทรสาร: 02-051-7310</div>
          </div>
          <div className="about-ContactUs-contact-component">
            <div className="about-content-bold">บัญชีและการเงิน</div>
            <button className="about-content-button-pink" style={{width: "60%", fontSize: "32px"}}>02-345-6789</button>
            <div>อีเมล: purchase@Nineti9.com<br/>โทรสาร: 02-051-7310</div>
          </div>
        </div>
        <div className="about-ContactUs-contact">
          <div className="about-ContactUs-contact-component">
            <div className="about-content-bold">การตลาด, ประชาสัมพันธ์</div>
            <button className="about-content-button-pink" style={{width: "60%", fontSize: "32px"}}>02-345-6789</button>
            <div>อีเมล: purchase@Nineti9.com<br/>โทรสาร: 02-051-7310</div>
          </div>
          <div className="about-ContactUs-contact-component">
            <div className="about-content-bold">ที่ตั้งสำนักงาน</div>
            <div style={{fontSize: "24px"}}>
              บริษัท ซี.เจ. เอ็กซ์เพรส กรุ๊ป จำกัด<br/>
              393 อาคาร393 สีลม ชั้น 5-6 <br/>
              ถนนสีลม แขวงสีลม เขตบางรัก <br/>
              กรุงเทพฯ 10500
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}
export default ContactUs;
