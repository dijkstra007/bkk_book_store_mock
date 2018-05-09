import React from "react";
import Link from "next/link";

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showAns01: false,
        showAns02: false,
        showAns03: false,
        showAns04: false,
        showAns05: false,
        showAns06: false,
        showAns07: false
      };
  }
  changeAns04ToHowToShipping = () => {
    this.props.change();
  }
  showAnswer = (id) => {
    if(id === "Ans01") {
        this.setState({...this.state, showAns01: !this.state.showAns01});
    } else if(id === "Ans02") {
        this.setState({...this.state, showAns02: !this.state.showAns02});
    } else if(id === "Ans03") {
        this.setState({...this.state, showAns03: !this.state.showAns03});
    } else if(id === "Ans04") {
        this.setState({...this.state, showAns04: !this.state.showAns04});
    } else if(id === "Ans05") {
        this.setState({...this.state, showAns05: !this.state.showAns05});
    } else if(id === "Ans06") {
        this.setState({...this.state, showAns06: !this.state.showAns06});
    } else if(id === "Ans07") {
        this.setState({...this.state, showAns07: !this.state.showAns07});
    }
  }
  render() {
    return (
      <div className="about-content-container-left">
        <div className="about-content-bold">คำถามที่พบบ่อย</div>

        <div className="about-content-title-nopad about-content-link" onClick={() => this.showAnswer("Ans01")}> > มีหน้าร้านหรือไม่ ?</div>
        <div style={this.state.showAns01? {display: "block", marginBottom: "20px"}: {display: "none"}}>
            &nbsp; &nbsp; &nbsp; &nbsp; ขณะนี้บริษัทฯมีช่องทางการขายคือ &nbsp;
                <a style={{textDecoration: "none", color: "#000000"}} href="https://www.facebook.com/nineti9" target="_blank">
                  <img style={{width: "18px", marginRight: "10px"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/facebook-black-icon-min.png"} /> 
                  Facebook: Nineti9
                </a>
                <a style={{textDecoration: "none", color: "#000000"}} href="https://line.me/R/ti/p/%40pgk8406w" target="_blank">
                  <img style={{width: "18px", margin: "0px 10px"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/line-black-icon-min.png"} /> 
                  Line: Nineti9
                </a>
                <a style={{textDecoration: "none", color: "#000000"}} href="/">
                    <img style={{width: "18px", margin: "0px 10px"}} src={"https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/globe-icon-min.png"} /> 
                    Website: www.Nineti9.com
                </a>
            &nbsp; เท่านั้น
        </div>

        {/* <div className="about-content-title-nopad about-content-link" onClick={() => this.showAnswer("Ans02")}> > ไม่ได้แจ้งโอนเงินหรือลืมแจ้ง ทำอย่างไร ?</div>
        <div style={this.state.showAns02? {display: "block", marginBottom: "20px"}: {display: "none"}}>&nbsp; &nbsp; &nbsp; &nbsp; 
            เนื่องจากการชำระค่าสินค้าโดยการโอนเงินช่องทางปกติมีผู้ใช้บริการจำนวนมาก เพื่อความรวดเร็วในการจัดส่ง
            บริษัทขอสงวนสิทธิ์ในการพิจารณาจัดส่งสินค้าเฉพาะรายการสั่งซื้อที่แจ้งหลักฐานการโอนที่ถูกต้องชัดเจนเท่านั้น
        </div> */}

        {/* <div className="about-content-title-nopad about-content-link" onClick={() => this.showAnswer("Ans03")}> > สถานะไม่เปลี่ยนเป็น "ชำระแล้ว" หลังจากโอนเงินเรียบร้้อย ทำอย่างไร ?</div>
        <div style={this.state.showAns03? {display: "block", marginBottom: "20px"}: {display: "none"}}>&nbsp; &nbsp; &nbsp; &nbsp; 
            หลังจากที่ลูกค้าได้แจ้งการชำระเงินผ่านทางช่องทางต่างๆของบริษัท สำหรับกรณีโอนเงิน จำเป็นต้องมีการตรจสอบจากเจ้าหน้าที่ 
            เพื่อยืนยันความถูกต้องของรายการสั่งซื้อ ซึ่งมีจำนวนมาก อาจส่งผลให้การแจ้งสถานะไปยังลูกค้าช้ากว่าปกติเล็กน้อย 
            ซึ่งโดยปกติสถานะจะเปลี่ยนไม่เกิน 24 ชม. ของวันทำการ หลังจากได้รับการแจ้งชำระเงิน
        </div> */}

        <div className="about-content-title-nopad about-content-link" onClick={() => this.showAnswer("Ans04")}> > ชำระเงินช่องทางไหนบ้าง ?</div>
        <div style={this.state.showAns04? {display: "block", marginBottom: "20px"}: {display: "none"}}>&nbsp; &nbsp; &nbsp; &nbsp; 
            สามารถชำระเงินได้ 2 ช่องทาง ดังนี้<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- บัตรเครดิต/เดบิต<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- โอนผ่านธนาคาร<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;เลือก 
            <span className="about-content-link" style={{color: "#FD97A0"}} onClick={this.changeAns04ToHowToShipping}>&nbsp; วิธีการชำระเงิน &nbsp; </span> 
            เพื่อดูรายละเอียดเพิ่มเติม
        </div>

        {/* <div className="about-content-title-nopad about-content-link" onClick={() => this.showAnswer("Ans05")}> > อยากเปลี่ยนช่องทางการชำระเงินต้องทำอย่างไร ?</div>
        <div style={this.state.showAns05? {display: "block", marginBottom: "20px"}: {display: "none"}}>&nbsp; &nbsp; &nbsp; &nbsp; 
            ถ้าคลิก "สั่งซื้อสินค้า" เลือกช่องทางการชำระเงินแล้ว แต่อยากเปลี่ยนช่องทางการชำระเงิน ดังนี้<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- Login เข้าไปที่ "บัญชีของฉัน"<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- คลิก เลือก "รายการสั่งซื้อ"<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- เลือกแก้ไขรายการที่ต้องการชำระเงิน คลิก "ชำระ"<br/>
            &nbsp; &nbsp; &nbsp; &nbsp;- จะพบหน้าต่างให้เลือกช่อทางชำระเงิน คลิกช่องทางที่ต้องการ
        </div> */}

        <div className="about-content-title-nopad about-content-link" onClick={() => this.showAnswer("Ans06")}> > เปลี่ยน/คืน ช่องทางไหนได้บ้าง ?</div>
        <div style={this.state.showAns06? {display: "block", marginBottom: "20px"}: {display: "none"}}>&nbsp; &nbsp; &nbsp; &nbsp; 
        สามารถส่งคืนสินค้าได้ทางไปรษณีย์ไทยเท่านั้น<br/>
        </div>
        <div className="about-content-title-nopad about-content-link" onClick={() => this.showAnswer("Ans07")}> > ระยะเวลาในการคืนเงิน ?</div>
        <div style={this.state.showAns07? {display: "block", marginBottom: "20px"}: {display: "none"}}>&nbsp; &nbsp; &nbsp; &nbsp; 
        กรณีคืนเงิน บริษัทฯจะคืนเงินภายใน 1 เดือนหลังจากได้รับสินค้าคืนเรียบร้อยแล้ว
        </div>
      </div>
    );
  }
}
export default FAQ;
