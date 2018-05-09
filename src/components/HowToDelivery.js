import React from "react";

class HowToDelivery extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="about-HowToDelivery-container">
        <div className="about-content-bold">ช่องทางการจัดส่ง</div>
        <div className="about-content-title-nopad">1. ไปรษณีย์ไทย</div>
        <div>
            &nbsp; &nbsp; &nbsp; &nbsp; แบบ EMS (1-2 วันทำการ) <br/>
            &nbsp; &nbsp; &nbsp; &nbsp; แบบลงทะเบียน (3-4 วันทำการ) 
            {/* <br/>
            &nbsp; &nbsp; &nbsp; &nbsp; แบบธรรมดา (ไม่เกิน 7 วันทำการ) */}
        </div>
        <div className="about-content-title-nopad">2. Quantium Solutions</div>
        <div> &nbsp; &nbsp; &nbsp; &nbsp; 1-2 วันทำการ <br/>
        &nbsp; &nbsp; &nbsp; &nbsp; การจัดส่งแบบเรียกเก็บเงินปลายทาง (COD) และแมสเซ็นเจอร์ จะถูกจัดส่งโดย
            บริษัท ควอนเที่ยม โซลูชั่นส์ (ประเทศไทย) จำกัด พนักงานจัดส่งจะติดต่อลูกค้าอีกครั้งเพื่อนัดเวลาส่งของ
        </div><br/>
        <div className="about-content-bold">วิธีการติดตามพัสดุ</div>
        <div> &nbsp; &nbsp; &nbsp; &nbsp;  หมายเลขพัสดุที่ถูกจัดส่งโดยไปรษณีย์ไทยสามารถติดตามสถานะพัสดุได้ที่ &nbsp;
            <a href="http://track.thailandpost.co.th/tracking/" target="_blank" className="about-content-link">http://track.thailandpost.co.th/tracking/</a>
        </div>
        <div> &nbsp; &nbsp; &nbsp; &nbsp; หมายเลขพัสดุที่ถูกจัดส่งโดยควอนเที่ยม โซลูชั่นส์ สามารถติดตามสถานะพัสดุได้ที่ &nbsp;
            <a href="http://track.quantiumsolutions.com/" target="_blank" className="about-content-link">http://track.quantiumsolutions.com/</a>
        </div>
      </div>
    );
  }
}
export default HowToDelivery;
