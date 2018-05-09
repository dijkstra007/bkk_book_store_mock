import React from "react";
import Router from "next/router";
import Link from "next/link";
import moment from "moment";
import {sendSlipToServer} from "../actions/order";
import { EALREADY } from "constants";

class UploadPaySlip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countSlip: 0,
      slipBank: "",
      slipDate: "",
      slipMonth: "",
      slipYear: "",
      slipHour: "",
      slipMinute: "",
      slipImage1: "",
      slipImage2: "",
    }
  }
  selectedInputPaySlip = e => {
    console.log(e.target.id);
    const value = e.target.value;
    let newValue = value;
    if(value.toString().length == 1) {
      newValue = "0" +value.toString();
    }
    switch(e.target.id) {
      case "payslip_bank": return this.setState({slipBank: newValue});
      case "payslip_date": return this.setState({slipDate: newValue});
      case "payslip_month": return this.setState({slipMonth: newValue});
      case "payslip_year": return this.setState({slipYear: newValue});
      case "payslip_hour": return this.setState({slipHour: newValue});
      case "payslip_minute": return this.setState({slipMinute: newValue});
    }
  }
  upload_payslip = () => {
    document.getElementById("payslip_upload").click();
  };
  handleFile_payslip = e => {
    const amount = e.target.files.length > 2? 2: e.target.files.length;
    var file, fileName, fileSize, fileType;
    var reader_payslip,result, countState = this.state.countSlip, element;
    const parent = document.getElementById("payslip_preview");
    for(let i=0; i<amount; i++) {
      file = e.target.files[i];
      fileName = file.name;
      fileSize = file.size;
      fileType = file.type;
      reader_payslip = new FileReader();
      reader_payslip.onload = upload => {
        result = upload.currentTarget.result;
        if(file && this.state.countSlip < 2) {
          countState++;
          this.setState({
            countSlip: countState,
            slipImage1: countState == 1 ? result: this.state.slipImage1,
            slipImage2: countState == 2 ? result: this.state.slipImage2
          });
        } else if(file && this.state.countSlip >= 2 ) {
          parent.removeChild(parent.firstChild);
          this.setState({
            countSlip: countState,
            slipImage1: this.state.slipImage2,
            slipImage2: result
          });
        }
        element = document.createElement("img");
        element.src = result;
        element.width = 500;
        parent.appendChild(element);
      };
      reader_payslip.readAsDataURL(file); 
    }
  };
  submit_payslip = async () => {

    const payslip_bank = this.state.slipBank;
    const payslip_date = this.state.slipDate;
    const payslip_month = this.state.slipMonth;
    const payslip_year = this.state.slipYear;
    const full_date = payslip_year.toString() +"-" +payslip_month.toString() +"-" +payslip_date.toString();
    const payslip_hour = this.state.slipHour;
    const payslip_minute = this.state.slipMinute;
    const full_time = payslip_hour.toString() +":" +payslip_minute.toString();

    const today = new Date();
    const currentYear = today.getFullYear().toString();
    const currentMonth = (today.getMonth()+1).toString().length == 1? "0" +(today.getMonth()+1).toString(): (today.getMonth()+1).toString();
    const currentDate = today.getDate().toString().length == 1? "0" +today.getDate().toString(): today.getDate().toString();
    const currentFullDate = currentYear +"-" +currentMonth +"-" +currentDate;
    const currentHour = today.getHours().toString().length == 1? "0" +today.getHours().toString(): today.getHours().toString();
    const currentMinute = today.getMinutes().toString().length == 1? "0" +today.getMinutes().toString(): today.getMinutes().toString();
    const currentFullTime = currentHour +":" +currentMinute;
    // console.log(currentFullDate, currentFullTime);
    // console.log(payslip_bank, full_date, full_time);
    // console.log(full_date > currentFullDate);

    if(payslip_bank === "") {
      document.getElementById("payslip_warning").innerHTML = "กรุณาเลือกธนาคารที่ชำระเงิน";
    } else if(payslip_date === "") {
      document.getElementById("payslip_warning").innerHTML = "กรุณาเลือกวันที่ชำระเงิน";
    } else if(payslip_month === "") {
      document.getElementById("payslip_warning").innerHTML = "กรุณาเลือกเดือนที่ชำระเงิน";
    } else if(payslip_date > "30" && (payslip_month === "04" || payslip_month === "06" || payslip_month === "09" || payslip_month === "11")) {
      document.getElementById("payslip_warning").style.color = "#FF0000";
      document.getElementById("payslip_warning").innerHTML = "เดือนที่คุณเลือกมี 30 วัน";
    } else if(payslip_month === "02" && payslip_year%4 != 0 && payslip_date > "28") {
      document.getElementById("payslip_warning").style.color = "#FF0000";
      document.getElementById("payslip_warning").innerHTML = "เดือนกุมภาพันธ์ปีที่คุณเลือกมี 28 วัน";
    } else if(payslip_year === "") {
      document.getElementById("payslip_warning").innerHTML = "กรุณาเลือกปีที่ชำระเงิน";
    } else if(full_date > currentFullDate) {
      document.getElementById("payslip_warning").innerHTML = "กรุณาเลือกวันที่ชำระเงินให้ถูกต้อง";
    } else if(payslip_hour === "" || payslip_minute === "") {
      document.getElementById("payslip_warning").innerHTML = "กรุณาเลือกเวลาชำระเงิน";
    } else if(full_time > currentFullTime) {
      document.getElementById("payslip_warning").innerHTML = "กรุณาเลือกเวลาชำระเงินให้ถูกต้อง";
    } else if(this.state.slipImage1 === "") {
      document.getElementById("payslip_warning").innerHTML = "กรุณาอัพโหลดรูปภาพอย่างน้อย 1 รูป";
    } else {
      const slipInfo = {
        orderId: this.props.order,
        slipBank: this.state.slipBank,
        slipDate: full_date,
        slipTime: full_time,
        slipImage1: this.state.slipImage1,
        slipImage2: this.state.slipImage2,
      };
      console.log("start upload", slipInfo);
        try {
          document.getElementById("payslip_warning").style.color = "#0E9020";
          document.getElementById("payslip_warning").innerHTML = "กรุณารอสักครู่";
          let res = await sendSlipToServer(slipInfo);
          if(res.ok) {
            document.getElementById("payslip_warning").innerHTML = res.message;
            setTimeout(() => this.props.onClose(), 1000);
            console.log(this.props.order +" success");
            Router.replace('/purchaseHistory');
            window.location.reload();
          } else {
            console.log(res);
            document.getElementById("payslip_warning").style.color = "#FF0000";
            document.getElementById("payslip_warning").innerHTML = res.error;
          }
        } catch (err) {
          console.log("err when upload slip", err);
          alert("Upload error");
          
          document.getElementById("payslip_warning").style.color = "#FF0000";
          document.getElementById("payslip_warning").innerHTML = "ERROR " +err.message;
        }
    }

    // const slipInfo = {
    //   orderId: this.props.order,
    //   slipBank: this.state.slipBank,
    //   slipDate: full_date,
    //   slipTime: full_time,
    //   slipImage1: this.state.slipImage1,
    //   slipImage2: this.state.slipImage2,
    // };
    // console.log("start upload", slipInfo);
    //   try {
    //     document.getElementById("payslip_warning").style.color = "#0E9020";
    //     document.getElementById("payslip_warning").innerHTML = "กรุณารอสักครู่";
    //     let res = await sendSlipToServer(slipInfo);
    //     if(res.ok) {
    //       document.getElementById("payslip_warning").innerHTML = res.message;
    //       setTimeout(() => this.props.onClose(), 1000);
    //       console.log(this.props.order +" success");
    //       Router.replace('/purchaseHistory');
    //       window.location.reload();
    //     } else {
    //       console.log(res);
    //       document.getElementById("payslip_warning").style.color = "#FF0000";
    //       document.getElementById("payslip_warning").innerHTML = res.error;
    //     }
    //   } catch (err) {
    //     console.log("err when upload slip", err);
    //     // alert("Upload error");
        
    //     document.getElementById("payslip_warning").style.color = "#FF0000";
    //     document.getElementById("payslip_warning").innerHTML = "ERROR " +err.message;
    //   }
  };
  
  
  onCancel= () =>{
    console.log("this.props.cancel",this.props);
    this.props.onCancel();
  }

  
  render() {
    const minYear = moment().get("year")-1;
    const maxYear = moment().get("year")+1;
    return (
      <div style={{ position: "absolute", width: "100%" }}>
        <div className="payslip-structure">
          <div className="payslip-title">แจ้งการชำระ หมายเลขสั่งซื้อ {this.props.order} </div>
          <div className="payslip-detail">
            <div className="row vertical-center">
              <div className="col-20" style={{textAlign: "right", padding: "0px 20px"}}>ชำระเงินมาจาก</div>
              <div className="col-30">
                <div style={{border: "solid 1px #95989A", padding: "4px 0px"}}>
                  <select id="payslip_bank" onChange={this.selectedInputPaySlip} required>
                    <option value="" className="payslip-input-option">กรุณาเลือกธนาคาร</option>
                    <option value="ธนาคารกรุงเทพ" className="payslip-input-option">ธนาคารกรุงเทพ</option>
                    <option value="ธนาคารกรุงไทย" className="payslip-input-option">ธนาคารกรุงไทย</option>
                    <option value="ธนาคารกรุงศรีอยุธยา" className="payslip-input-option">ธนาคารกรุงศรีอยุธยา</option>
                    <option value="ธนาคารกสิกรไทย" className="payslip-input-option">ธนาคารกสิกรไทย</option>
                    <option value="ธนาคารซีไอเอ็มบีไทย" className="payslip-input-option">ธนาคารซีไอเอ็มบีไทย</option>
                    <option value="ธนาคารไทยพาณิชย์" className="payslip-input-option">ธนาคารไทยพาณิชย์</option>
                    <option value="ธนาคารทหารไทย" className="payslip-input-option">ธนาคารทหารไทย</option>
                    <option value="ธนาคารทิสโก้" className="payslip-input-option">ธนาคารทิสโก้</option>
                    <option value="ธนาคารธนชาต" className="payslip-input-option">ธนาคารธนชาต</option>
                    <option value="ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร" className="payslip-input-option">ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร</option>
                    <option value="ธนาคารยูโอบี" className="payslip-input-option">ธนาคารยูโอบี</option>
                    <option value="ธนาคารแลนด์ แอนด์ เฮาส์" className="payslip-input-option">ธนาคารแลนด์ แอนด์ เฮาส์</option>
                    <option value="ธนาคารไอซีบีซี" className="payslip-input-option">ธนาคารไอซีบีซี</option>
                    <option value="ธนาคารออมสิน" className="payslip-input-option">ธนาคารออมสิน</option>
                    <option value="ธนาคารอาคารสงเคราะห์" className="payslip-input-option">ธนาคารอาคารสงเคราะห์</option>
                    <option value="ธนาคารอื่นๆ" className="payslip-input-option">ธนาคารอื่นๆ</option>
                  </select>
                </div>
              </div>
              <div className="col-50">
              </div>
            </div><br/><br/>
            <div className="row vertical-center">
              <div className="col-20" style={{textAlign: "right", padding: "0px 20px"}}>วันที่ชำระเงิน</div>
              <div className="col-30" style={{display: "inline-flex"}}>
                {/* <input id="payslip_date" type="date" className="payslip-input" style={{padding: "5px 20px"}} required /> */}
                
                {/* <input id="payslip_date" refs="payslip_date" type="number" min="1" max="31" step="1" className="payslip-input" style={{padding: "5px 20px"}} onChange={this.selectedInputPaySlip} required />
                <input id="payslip_month" refs="payslip_month" type='number' min="1" max="12" step="1" className="payslip-input" style={{padding: "5px 20px"}} onChange={this.selectedInputPaySlip} required />
                <input id="payslip_year" refs="payslip_year" type="number" step="1" min={minYear} max={maxYear} className="payslip-input" style={{padding: "5px 20px"}} onChange={this.selectedInputPaySlip} required /> */}
                <div style={{width: "20%",border: "solid 1px #95989A", padding: "1px 0px"}}>
                <select id="payslip_date" onChange={this.selectedInputPaySlip} required>
                    <option value="" className="payslip-input-option">วันที่</option>
                    <option value="01" className="payslip-input-option">1</option>
                    <option value="02" className="payslip-input-option">2</option>
                    <option value="03" className="payslip-input-option">3</option>
                    <option value="04" className="payslip-input-option">4</option>
                    <option value="05" className="payslip-input-option">5</option>
                    <option value="06" className="payslip-input-option">6</option>
                    <option value="07" className="payslip-input-option">7</option>
                    <option value="08" className="payslip-input-option">8</option>
                    <option value="09" className="payslip-input-option">9</option>
                    <option value="10" className="payslip-input-option">10</option>
                    <option value="11" className="payslip-input-option">11</option>
                    <option value="12" className="payslip-input-option">12</option>
                    <option value="13" className="payslip-input-option">13</option>
                    <option value="14" className="payslip-input-option">14</option>
                    <option value="15" className="payslip-input-option">15</option>
                    <option value="16" className="payslip-input-option">16</option>
                    <option value="17" className="payslip-input-option">17</option>
                    <option value="18" className="payslip-input-option">18</option>
                    <option value="19" className="payslip-input-option">19</option>
                    <option value="20" className="payslip-input-option">20</option>
                    <option value="21" className="payslip-input-option">21</option>
                    <option value="22" className="payslip-input-option">22</option>
                    <option value="23" className="payslip-input-option">23</option>
                    <option value="24" className="payslip-input-option">24</option>
                    <option value="25" className="payslip-input-option">25</option>
                    <option value="26" className="payslip-input-option">26</option>
                    <option value="27" className="payslip-input-option">27</option>
                    <option value="28" className="payslip-input-option">28</option>
                    <option value="29" className="payslip-input-option">29</option>
                    <option value="30" className="payslip-input-option">30</option>
                    <option value="31" className="payslip-input-option">31</option>
                  </select>
                </div>
                <div style={{width: "50%", border: "solid 1px #95989A", padding: "1px 0px"}}>
                <select id="payslip_month" onChange={this.selectedInputPaySlip} required>
                    <option value="" className="payslip-input-option">เดือน</option>
                    <option value="01" className="payslip-input-option">มกราคม</option>
                    <option value="02" className="payslip-input-option">กุมภาพันธ์</option>
                    <option value="03" className="payslip-input-option">มีนาคม</option>
                    <option value="04" className="payslip-input-option">เมษายน</option>
                    <option value="05" className="payslip-input-option">พฤษภาคม</option>
                    <option value="06" className="payslip-input-option">มิถุนายน</option>
                    <option value="07" className="payslip-input-option">กรกฎาคม</option>
                    <option value="08" className="payslip-input-option">สิงหาคม</option>
                    <option value="09" className="payslip-input-option">กันยายน</option>
                    <option value="10" className="payslip-input-option">ตุลาคม</option>
                    <option value="11" className="payslip-input-option">พฤศจิกายน</option>
                    <option value="12" className="payslip-input-option">ธันวาคม</option>
                  </select>
                </div>
                <div style={{width: "30%", border: "solid 1px #95989A", padding: "1px 0px"}}>
                <select id="payslip_year" onChange={this.selectedInputPaySlip} required>
                  <option value="" className="payslip-input-option">ปี ค.ศ.</option>
                  <option value={minYear} className="payslip-input-option">{minYear}</option>
                  <option value={minYear+1} className="payslip-input-option">{minYear+1}</option>
                  <option value={maxYear} className="payslip-input-option">{maxYear}</option>
                  </select>
                </div>
              </div>
              <div className="col-10" style={{textAlign: "right", padding: "0px 20px"}}>เวลา</div>
              <div className="col-20" style={{display: "inline-flex"}}>
                {/* <input id="payslip_time" type="time" min="00:00" max="23:59" className="payslip-input" style={{padding: "5px 20px"}} required/> */}
                
                {/* <input id="payslip_hour" refs="payslip_hour" type="number" step="1" min="1" max="23" className="payslip-input" style={{padding: "5px 20px"}} onChange={this.selectedInputPaySlip} required />
                <input id="payslip_minute" refs="payslip_minute" type="number" step="1" min="1" max="59" className="payslip-input" style={{padding: "5px 20px"}} onChange={this.selectedInputPaySlip} required /> */}
                <div style={{width: "50%", border: "solid 1px #95989A", padding: "1px 0px"}}>
                <select id="payslip_hour" onChange={this.selectedInputPaySlip} required>
                  <option value="" className="payslip-input-option">ชั่วโมง</option>
                  <option value="00" className="payslip-input-option">00</option>
                    <option value="01" className="payslip-input-option">01</option>
                    <option value="02" className="payslip-input-option">02</option>
                    <option value="03" className="payslip-input-option">03</option>
                    <option value="04" className="payslip-input-option">04</option>
                    <option value="05" className="payslip-input-option">05</option>
                    <option value="06" className="payslip-input-option">06</option>
                    <option value="07" className="payslip-input-option">07</option>
                    <option value="08" className="payslip-input-option">08</option>
                    <option value="09" className="payslip-input-option">09</option>
                    <option value="10" className="payslip-input-option">10</option>
                    <option value="11" className="payslip-input-option">11</option>
                    <option value="12" className="payslip-input-option">12</option>
                    <option value="13" className="payslip-input-option">13</option>
                    <option value="14" className="payslip-input-option">14</option>
                    <option value="15" className="payslip-input-option">15</option>
                    <option value="16" className="payslip-input-option">16</option>
                    <option value="17" className="payslip-input-option">17</option>
                    <option value="18" className="payslip-input-option">18</option>
                    <option value="19" className="payslip-input-option">19</option>
                    <option value="20" className="payslip-input-option">20</option>
                    <option value="21" className="payslip-input-option">21</option>
                    <option value="22" className="payslip-input-option">22</option>
                    <option value="23" className="payslip-input-option">23</option>
                    <option value="23" className="payslip-input-option">23</option>
                  
                  </select>
                </div>
                <div style={{width: "50%", border: "solid 1px #95989A", padding: "1px 0px"}}>
                <select id="payslip_minute" onChange={this.selectedInputPaySlip} required>
                  <option value="" className="payslip-input-option">นาที</option>
                  <option value="00" className="payslip-input-option">00</option>
                    <option value="01" className="payslip-input-option">01</option>
                    <option value="02" className="payslip-input-option">02</option>
                    <option value="03" className="payslip-input-option">03</option>
                    <option value="04" className="payslip-input-option">04</option>
                    <option value="05" className="payslip-input-option">05</option>
                    <option value="06" className="payslip-input-option">06</option>
                    <option value="07" className="payslip-input-option">07</option>
                    <option value="08" className="payslip-input-option">08</option>
                    <option value="09" className="payslip-input-option">09</option>
                    <option value="10" className="payslip-input-option">10</option>
                    <option value="11" className="payslip-input-option">11</option>
                    <option value="12" className="payslip-input-option">12</option>
                    <option value="13" className="payslip-input-option">13</option>
                    <option value="14" className="payslip-input-option">14</option>
                    <option value="15" className="payslip-input-option">15</option>
                    <option value="16" className="payslip-input-option">16</option>
                    <option value="17" className="payslip-input-option">17</option>
                    <option value="18" className="payslip-input-option">18</option>
                    <option value="19" className="payslip-input-option">19</option>
                    <option value="20" className="payslip-input-option">20</option>
                    <option value="21" className="payslip-input-option">21</option>
                    <option value="22" className="payslip-input-option">22</option>
                    <option value="24" className="payslip-input-option">24</option>
                    <option value="25" className="payslip-input-option">25</option>
                    <option value="26" className="payslip-input-option">26</option>
                    <option value="27" className="payslip-input-option">27</option>
                    <option value="28" className="payslip-input-option">28</option>
                    <option value="29" className="payslip-input-option">29</option>
                    <option value="30" className="payslip-input-option">30</option>
                    <option value="31" className="payslip-input-option">31</option>
                    <option value="32" className="payslip-input-option">32</option>
                    <option value="33" className="payslip-input-option">33</option>
                    <option value="34" className="payslip-input-option">34</option>
                    <option value="35" className="payslip-input-option">35</option>
                    <option value="36" className="payslip-input-option">36</option>
                    <option value="37" className="payslip-input-option">37</option>
                    <option value="38" className="payslip-input-option">38</option>
                    <option value="39" className="payslip-input-option">39</option>
                    <option value="40" className="payslip-input-option">40</option>
                    <option value="41" className="payslip-input-option">41</option>
                    <option value="42" className="payslip-input-option">42</option>
                    <option value="43" className="payslip-input-option">43</option>
                    <option value="44" className="payslip-input-option">44</option>
                    <option value="45" className="payslip-input-option">45</option>
                    <option value="46" className="payslip-input-option">46</option>
                    <option value="47" className="payslip-input-option">47</option>
                    <option value="48" className="payslip-input-option">48</option>
                    <option value="49" className="payslip-input-option">49</option>
                    <option value="50" className="payslip-input-option">50</option>
                    <option value="51" className="payslip-input-option">51</option>
                    <option value="52" className="payslip-input-option">52</option>
                    <option value="53" className="payslip-input-option">53</option>
                    <option value="54" className="payslip-input-option">54</option>
                    <option value="55" className="payslip-input-option">55</option>
                    <option value="56" className="payslip-input-option">56</option>
                    <option value="57" className="payslip-input-option">57</option>
                    <option value="58" className="payslip-input-option">58</option>
                    <option value="59" className="payslip-input-option">59</option>
                  </select>
                </div>
              </div>
              <div className="col-20">
              </div>
            </div><br/><br/>
            <div className="row">
              <div className="col-20" style={{textAlign: "right", padding: "0px 20px"}}>อัพโหลดรูป</div>
              <div className="col-80">
                <input id="payslip_upload" refs="payslip_upload" type="file" accept="image/*" multiple max="2" style={{display: "none"}} onChange={this.handleFile_payslip}/>
                <div id="payslip_preview" refs="payslip_preview" style={{width: "100%"}}></div> &nbsp; &nbsp; 
                <button  className="button-upload-slip" onClick={this.upload_payslip} >Upload File</button> &nbsp; &nbsp; 
                <span className="main-pink" style={{fontFamily:"db_heavent_thin",fontSize:"20px"}}>หลักฐานการโอนเงิน/ใบเสร็จรับเงิน (ไม่เกิน 2 รูปภาพ)</span>
              </div>
            </div><br/><br/>
            <div id="payslip_warning" refs="payslip_warning" className="payslip-warning"></div>
            <div className="row vertical-center">
              <div className="col-60"></div>
              <div className="col-40">
                <button  className="button-upload-slip user-info-pink"  onClick={this.onCancel} style={{padding: "5px 30px", border: "none", color:"#FD97A0"}}>ยกเลิก</button>
                 &nbsp; &nbsp; 
                <button  type="submit" className="account-button-pink" onClick={this.submit_payslip} style={{padding: "5px 30px"}}>ตกลง</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadPaySlip;
