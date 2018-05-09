import React from "react";

class HowToShipping extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="about-HowToDelivery-container">
        <div className="about-content-title-nopad">1. บัตรเครดิต/เดบิต</div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;1.1 กรอกข้อมูลบัตรเครดิต/เดบิตของคุณ
        </div>
        <div>
        &nbsp; &nbsp; &nbsp; &nbsp;หากพบปัญหาในการชำระเงินด้วยบัตรเครดิต/เดบิต โปรดตรวจสอบกรณีดังต่อไปนี้
        </div>
        <div>
        &nbsp; &nbsp; &nbsp; &nbsp;- เงินในบัญชีท่านไม่เพียงพอ
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;- ชื่อบัญชีไม่สอดคล้องกับข้อมูล
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;- ไม่ได้มีการลงทะเบียนการทำธุรกรรมออนไลน์กับบัตร
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;- มีการจำกัดจำนวนการทำธุรกรรมในหนึ่งรอบบิล
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;- ไม่มีชื่อบัญชีดังกล่าว
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;กรณีพบปัญหาดังกล่าว กรุณาตรวจสอบความถูกต้องกับทางธนาคารค่ะ
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;1.2 ตรวจสอบความถูกต้องแล้วเลือก ‘ดำเนินการต่อ’
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;1.3 เมื่อ ‘ยืนยันการสั่งซื้อ’ เรียบร้อยแล้ว ท่านจะได้รับอีเมล์ยืนยันการชำระเงินจากทางเรา
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;1.4 สามารถตรวจสอบสถานะการสั่งซื้อได้ที่ <span style={{ color: "#FD97A0" }}>รายการสั่งซื้อ</span>
        </div><br/>
        {/* <div className="about-content-title-nopad">2. CJ EXPRESS</div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;2.1 เลือก CJ EXPRESS กรอกที่อยู่หรือตรวจสอบอีเมล์ของคุณ ทางเราจะส่ง
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;‘ใบแจ้งชำระสินค้า’ ไปยังที่อยู่อีเมล์ที่ได้ระบุไว้
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;2.2 Print หรือจดรหัส 15 หลักใต้บาร์โค้ดเพื่อนำไปชำระที่ CJ EXPRESS
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;2.3 หลังจากชำระเรียบร้อยสามารถตรวจสอบสถานะการสั่งซื้อได้ที่ <span style={{ color: "#FD97A0" }}>รายการสั่งซื้อ</span>
        </div><br/> */}
        <div className="about-content-title-nopad">2. โอนเงินผ่านธนาคาร</div>
        <div style={{marginLeft: "20px"}}> 
        2.1 เลือก โอนเงินผ่านธนาคาร แล้วเลือก ‘ดำเนินการต่อ’
        </div>
        <div style={{marginLeft: "20px"}}> 
        2.2 ทางเราจะส่ง ‘ใบแจ้งชำระสินค้า’ และรายละเอียดบัญชีธนาคารไปยังที่อยู่อีเมลของท่าน
        </div>
        <div style={{marginLeft: "20px"}}> 
        2.3 หลังจากชำระเงินเรียบร้อยสามารถแจ้งการชำระเงินได้ดังนี้ <br/>
        บัญชีของฉัน > รายการสั่งซื้อ > แจ้งชำระเงิน
                หรือส่งหลักฐานการชำระเงินพร้อมระบุเลขที่สั่งซื้อมาที่ <br/>
                  <span className="check__status">Line : @nineti9 | E-mail : contact@nineti9.com | Facebook :Nineti9 </span>
        </div>
        {/* <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;เว็บไซต์ Nineti9 :  &nbsp; &nbsp; 
                    <a href="https://www.facebook.com/nineti9" target="_blank">
                    <img
                        src={
                        "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/globe-icon-min.png"
                        }
                    />
                    <p
                        style={{
                        fontSize: "26px",
                        margin: "0px 50px 0px 10px",
                        display: "inline-block",
                        color: "black"
                        }}
                    >
                        Website : www.Nineti9.com
                    </p>
                    </a>
                
        </div> */}
        <div> 
            {/* <div className="col-sm-6" style={{ textAlign: "left",paddingLeft: "100px" }}>  
                <div>
                    <a href="" target="_blank">
                    <img
                        src={
                        "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/facebook-black-icon-min.png"
                        }
                    />
                    <p
                        style={{
                        fontSize: "26px",
                        margin: "0px 50px 0px 10px",
                        display: "inline-block",
                        color: "black"
                        }}
                    >
                    Facebook : Nineti9
                    </p>
                    </a>
                </div>
                <div >
                    <a href="" target="_blank">
                    <img
                        src={
                        "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/line-black-icon-min.png"
                        }
                    />
                    <p
                        style={{
                        fontSize: "26px",
                        margin: "0px 50px 0px 10px",
                        display: "inline-block",
                        color: "black"
                        }}
                    >
                    
                    Line : @nineti9
                    </p>
                    </a>
                </div>
            </div>
            <div className="col-sm-6" style={{ textAlign: "left" }}>
                <div >
                    <a
                    href="https://www.facebook.com/messages/t/nineti9"
                    target="_blank"
                    >
                    <img width="25px" height="25px"
                        src={
                        "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/email-black-icon-min.png"
                        }
                    />
                    <p
                        style={{
                        fontSize: "26px",
                        margin: "0px 50px 0px 10px",
                        display: "inline-block",
                        color: "black"
                        }}
                    >
                    E-mail : contact@nineti9.com
                    </p>
                    </a>
                </div>
                <div >
                    <a href="https://www.facebook.com/nineti9" target="_blank">
                    <img
                        src={
                        "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/globe-icon-min.png"
                        }
                    />
                    <p
                        style={{
                        fontSize: "26px",
                        margin: "0px 50px 0px 10px",
                        display: "inline-block",
                        color: "black"
                        }}
                    >
                        Website : www.Nineti9.com
                    </p>
                    </a>
                </div>
            </div> */}
           
        </div>
        <div style={{marginLeft: "20px"}}> 
        2.4 รอการยืนยันจากทางเจ้าหน้าที่ สามารถตรวจสอบสถานะการสั่งซื้อได้ที่ <span style={{ color: "#FD97A0" }}>รายการสั่งซื้อ</span>
        </div><br/>
        <div className="about-content-title-nopad">3. เก็บเงินปลายทาง</div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;บริษัทขนส่งจะติดต่อคุณไปเพื่อนัดเวลาและสถานที่ สามารถชำระเงินสดค่าสินค้าในวันที่
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;นัดหมายได้เลยการจัดส่งจะเสร็จสิ้นเมื่อมีการลงนามรับสินค้า กรณีตัวแทนรับสินค้าแทน
        </div>
        <div> 
        &nbsp; &nbsp; &nbsp; &nbsp;กรุณาแจ้งความสัมพันธ์ระหว่างตัวแทนกับลูกค้าตรวจสอบ <span style={{ color: "#FD97A0" }}>สถานะการจัดส่ง</span> ได้
        </div>
        
      </div>
    );
  }
}
export default HowToShipping;
