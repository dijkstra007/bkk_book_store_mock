import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { addAddressInfoToUser ,editAddressInfoToUser } from '../actions/user';
import Link from "next/link";
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";


const addressFormDefaultState = {
    name: '',
    phoneNumber: '',
    province: '',
    district: '',
    quarter: '',
    zipCode: '',
    addressDetail: '',
    error: '',
}
 class AddressForm extends React.Component {
    constructor(props) {
        super(props);

            this.state = {
                address: {
                name:  '',
                phoneNumber: '',
                province:'',
                district: '',
                quarter:  '',
                zipCode: '',
                addressDetail: ''},
                error: '',
            };
        
    }
    componentDidMount() {
        // console.log('this.props.isEdit',this.props.isEdit);
        if(this.props.isEdit) {
            
            const index =  this.props.editAtIndex;
            const addressList = this.props.user.addressList;
            const address = addressList[index];
            this.setState({address:address})
        }
    }
  
    onAddressSummit  = () =>  {
        this.props.onDone();
    }
    onNameChange = (e) => {
        const name = e.target.value;
        const addressState = {
         ...this.state.address,
         name : name   
        }
        this.setState({address: addressState});
    }
    onPhoneNumberChange = (e) => {
        const phoneNumber = e.target.value;
        const addressState = {
            ...this.state.address,
            phoneNumber: phoneNumber 
           }
           this.setState({address: addressState});
    }
    onProvinceChange = (e) => {
        const province = e.target.value;
        const addressState = {
            ...this.state.address,
            province : province   
           }
           this.setState({address: addressState});
    }
    onDistrictChange = (e) => {
        const district = e.target.value;
        const addressState = {
            ...this.state.address,
            district : district   
           }
           this.setState({address: addressState});
    }
    onQuarterChange = (e) => {
        const quarter = e.target.value;
        const addressState = {
            ...this.state.address,
            quarter : quarter   
           }
           this.setState({address: addressState});
    }
    onZipCodeChange = (e) => {
        const zipCode = e.target.value;
        const addressState = {
            ...this.state.address,
            zipCode : zipCode   
           }
           this.setState({address: addressState});
    }
    onAddressDetailChange = (e) => {
        const addressDetail = e.target.value;
        const addressState = {
            ...this.state.address,
            addressDetail : addressDetail   
           }
           this.setState({address: addressState});
    }

    validateInformation = () => {
        const {
            name,
            phoneNumber,
            province,
            district,
            quarter,
            zipCode,
            addressDetail,
        } = this.state.address;

        if(name === '') return false;
        if( !(phoneNumber === '' || phoneNumber.match(/\d{10}$/) )) return false
        if(province === '') return false;
        if(district === '') return false;
        if(quarter === '') return false;
        if(!zipCode.match(/\d{5}$/)) return false;
        if(addressDetail === '') return false;
      
        
        return true;
    }
    onSubmit = (e) => {
        e.preventDefault();
        const isInformationComplete = true ||this.validateInformation();
        if(true) {
            const addrInfo = {
                    name: this.state.address.name,
                    phoneNumber: this.state.address.phoneNumber,
                    province: this.state.address.province,
                    district: this.state.address.district,
                    quarter: this.state.address.quarter,
                    zipCode: this.state.address.zipCode,
                    addressDetail: this.state.address.addressDetail,
            }
            if(!this.props.isEdit) {
             this.props.dispatchAddAddressInfoToUser(addrInfo);
            } else {
                const index = this.props.editAtIndex;
                this.props.dispatchEditAddressInfoToUser(addrInfo, index);
            }
             // this.props.dispatchEditAddressInfoToUser(addrInfo);
            this.props.onDone();
        }
    };
    render() {
        const {
            name,
            phoneNumber,
            province,
            district,
            quarter,
            zipCode,
            addressDetail
        } = this.state.address;


    return (
        <div>
        <BrowserView device={isBrowser}>
        <div className="col-sm-8 product__cart__table" style={{marginTop: "60px"}}>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.onSubmit}>
            <div className="col-sm-12">
                
                    <p className="table__title">
                    <img
                        style={{ paddingRight: "10px" }}
                        src={
                        "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/address-pink-min.png"
                        }
                    />ที่อยู่สำหรับจัดส่ง
                    </p>  
                <div className="address__body">
                        <div className="col-md-12 address__row">
                        <div className="col-md-3"><p>ชื่อผู้รับสินค้า:</p></div>
                            <div className="col-md-9">
                                <input type="text" placeholder="ไม่ต้องมีคำนำหน้าชื่อ" autoFocus value={name} onChange={this.onNameChange}  className="form-control" title="กรุณากรอกชื่อผู้รับสินค้า" maxLength="100" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p>เบอร์โทรศัพท์มือถือ:</p></div>
                            <div className="col-md-9">
                                <input type="tel" placeholder="กรุณาใส่เบอร์มือถือ10หลัก" value={phoneNumber} onChange={this.onPhoneNumberChange}  className="form-control" pattern="[0]{1}[0-9]{9}" title="กรุณากรอกเบอร์โทรศัพท์มือถือให้ถูกต้อง" maxLength="10" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p>จังหวัด:</p></div>
                            <div className="col-md-9">
                            <div className="select form-control">
                                <select name="slct" id="slct" placeholder="กรุณาเลือกจังหวัดด้วยนะคะ" value={this.state.province} 
                                onChange={this.onProvinceChange} title="กรุณาเลือกจังหวัด" required style={{color: "black"}}>
                                <option value=""></option>
                                <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                                <option value="กระบี่">กระบี่</option>
                                <option value="กาญจนบุรี">กาญจนบุรี</option>
                                <option value="กาฬสินธุ์">กาฬสินธุ์</option>
                                <option value="กำแพงเพชร">กำแพงเพชร</option>
                                <option value="ขอนแก่น">ขอนแก่น</option>
                                <option value="จันทบุรี">จันทบุรี</option>
                                <option value="ฉะเชิงเทรา">ฉะเชิงเทรา</option>
                                <option value="ชลบุรี">ชลบุรี</option>
                                <option value="ชัยนาท">ชัยนาท</option>
                                <option value="ชัยภูมิ">ชัยภูมิ</option>
                                <option value="ชุมพร">ชุมพร</option>
                                <option value="เชียงราย">เชียงราย</option>
                                <option value="เชียงใหม่">เชียงใหม่</option>
                                <option value="ตรัง">ตรัง</option>
                                <option value="ตราด">ตราด</option>
                                <option value="ตาก">ตาก</option>
                                <option value="นครนายก">นครนายก</option>
                                <option value="นครปฐม">นครปฐม</option>
                                <option value="นครพนม">นครพนม</option>
                                <option value="นครราชสีมา">นครราชสีมา</option>
                                <option value="นครศรีธรรมราช">นครศรีธรรมราช</option>
                                <option value="นครสวรรค์">นครสวรรค์</option>
                                <option value="นนทบุรี">นนทบุรี</option>
                                <option value="นราธิวาส">นราธิวาส</option>
                                <option value="น่าน">น่าน</option>
                                <option value="บึงกาฬ">บึงกาฬ</option>
                                <option value="บุรีรัมย์">บุรีรัมย์</option>
                                <option value="ปทุมธานี">ปทุมธานี</option>
                                <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์</option>
                                <option value="ปราจีนบุรี">ปราจีนบุรี</option>
                                <option value="ปัตตานี">ปัตตานี</option>
                                <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา</option>
                                <option value="พังงา">พังงา</option>
                                <option value="พัทลุง">พัทลุง</option>
                                <option value="พิจิตร">พิจิตร</option>
                                <option value="พิษณุโลก">พิษณุโลก</option>
                                <option value="เพชรบุรี">เพชรบุรี</option>
                                <option value="เพชรบูรณ์">เพชรบูรณ์</option>
                                <option value="แพร่">แพร่</option>
                                <option value="พะเยา">พะเยา</option>
                                <option value="ภูเก็ต">ภูเก็ต</option>
                                <option value="มหาสารคาม">มหาสารคาม</option>
                                <option value="มุกดาหาร">มุกดาหาร</option>
                                <option value="แม่ฮ่องสอน">แม่ฮ่องสอน</option>
                                <option value="ยะลา">ยะลา</option>
                                <option value="ยโสธร">ยโสธร</option>
                                <option value="ร้อยเอ็ด">ร้อยเอ็ด</option>
                                <option value="ระนอง">ระนอง</option>
                                <option value="ระยอง">ระยอง</option>
                                <option value="ราชบุรี">ราชบุรี</option>
                                <option value="ลพบุรี">ลพบุรี</option>
                                <option value="ลำปาง">ลำปาง</option>
                                <option value="ลำพูน">ลำพูน</option>
                                <option value="เลย">เลย</option>
                                <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                                <option value="สกลนคร">สกลนคร</option>
                                <option value="สงขลา">สงขลา</option>
                                <option value="สตูล">สตูล</option>
                                <option value="สมุทรปราการ">สมุทรปราการ</option>
                                <option value="สมุทรสงคราม">สมุทรสงคราม</option>
                                <option value="สมุทรสาคร">สมุทรสาคร</option>
                                <option value="สระแก้ว">สระแก้ว</option>
                                <option value="สระบุรี">สระบุรี</option>
                                <option value="สิงห์บุรี">สิงห์บุรี</option>
                                <option value="สุโขทัย">สุโขทัย</option>
                                <option value="สุพรรณบุรี">สุพรรณบุรี</option>
                                <option value="สุราษฎร์ธานี">สุราษฎร์ธานี</option>
                                <option value="สุรินทร์">สุรินทร์</option>
                                <option value="หนองคาย">หนองคาย</option>
                                <option value="หนองบัวลำภู">หนองบัวลำภู</option>
                                <option value="อ่างทอง">อ่างทอง</option>
                                <option value="อุดรธานี">อุดรธานี</option>
                                <option value="อุทัยธานี">อุทัยธานี</option>
                                <option value="อุตรดิตถ์">อุตรดิตถ์</option>
                                <option value="อุบลราชธานี">อุบลราชธานี</option>
                                <option value="อำนาจเจริญ">อำนาจเจริญ</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p>เขต/อำเภอ:</p></div>
                            <div className="col-md-9">
                                <input type="text" placeholder="กรอกเขต/อำเภอ"  value={district} onChange={this.onDistrictChange} className="form-control" title="กรุณากรอกเขต/อำเภอ" maxLength="100" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p>แขวง/ตำบล:</p></div>
                            <div className="col-md-9">
                                <input type="text" placeholder="กรอกแขวง/ตำบล" value={quarter}  onChange={this.onQuarterChange} className="form-control" title="กรุณากรอกแขวง/อำเภอ" maxLength="100" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p>รหัสไปรษณีย์:</p></div>
                            <div className="col-md-3">
                                <input type="tel"  placeholder="กรอกรหัสไปรษณีย์"  value={zipCode} onChange={this.onZipCodeChange} className="form-control" pattern="[0-9]{5}" title="กรุณากรอกเฉพาะตัวเลข 5 หลักเท่านั้น" maxLength="5" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p>ที่อยู่:</p></div>
                            <div className="col-md-9">
                                <textarea rows="8" placeholder="กรอกรายละเอียดที่อยู่ เช่น บ้านเลขที่ / ชื่ออาคาร / หมู่บ้าน / ตรอก / ซอย / หมู่ที่ / ถนน"  value={addressDetail}  onChange={this.onAddressDetailChange} className="form-control" title="กรุณากรอกรายละเอียดที่อยู่ เช่น บ้านเลขที่ / ชื่ออาคาร / หมู่บ้าน / ตรอก / ซอย / หมู่ที่ / ถนน" maxLength="1000" required></textarea>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-sm-12" style={{textAlign:"right"}}>
                        <Link href="/carryProcess">
                            <div className="button process__button choose__address__button__selected" style={{cursor: "pointer"}}>
                                ยกเลิก
                            </div>
                        </Link>
                        <button className="button process__button choose__address__button__selected">
                            บันทึก
                        </button>
                        
                    </div>
                </div>


            </form>
        </div>
        </BrowserView>
        <MobileView device={isMobile}>
        <div className="col-sm-12 product__cart__table">
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.onSubmit}>
            <div className="col-sm-12">
                
                    <p className="table__title">
                    <img
                        style={{ paddingRight: "10px" }}
                        src={
                        "https://s3-ap-southeast-1.amazonaws.com/nineti9/for+web/address-pink-min.png"
                        }
                    />ที่อยู่สำหรับจัดส่ง
                    </p>  
                <div className="address__body">
                        <div className="col-md-12 address__row">
                        <div className="col-md-3"><p style={{textAlign:"left"}}>ชื่อผู้รับสินค้า:</p></div>
                            <div className="col-md-9">
                                <input type="text" placeholder="ไม่ต้องมีคำนำหน้าชื่อ" autoFocus value={name} onChange={this.onNameChange}  className="form-control" title="กรุณากรอกชื่อผู้รับสินค้า" maxLength="100" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p style={{textAlign:"left"}}>เบอร์โทรศัพท์มือถือ:</p></div>
                            <div className="col-md-9">
                                <input type="tel" placeholder="กรุณาใส่เบอร์มือถือ10หลัก" value={phoneNumber} onChange={this.onPhoneNumberChange}  className="form-control" pattern="[0]{1}[0-9]{9}" title="กรุณากรอกเฉพาะตัวเลข 10 หลักเท่านั้น" maxLength="10" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p style={{textAlign:"left"}}>จังหวัด:</p></div>
                            <div className="col-md-9">
                            <div className="select form-control">
                                <select name="slct" id="slct" value={this.state.province} onChange={this.onProvinceChange} title="กรุณาเลือกจังหวัด" required >
                                <option value="">เลือกจังหวัด</option>
                                <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                                <option value="กระบี่">กระบี่</option>
                                <option value="กาญจนบุรี">กาญจนบุรี</option>
                                <option value="กาฬสินธุ์">กาฬสินธุ์</option>
                                <option value="กำแพงเพชร">กำแพงเพชร</option>
                                <option value="ขอนแก่น">ขอนแก่น</option>
                                <option value="จันทบุรี">จันทบุรี</option>
                                <option value="ฉะเชิงเทรา">ฉะเชิงเทรา</option>
                                <option value="ชลบุรี">ชลบุรี</option>
                                <option value="ชัยนาท">ชัยนาท</option>
                                <option value="ชัยภูมิ">ชัยภูมิ</option>
                                <option value="ชุมพร">ชุมพร</option>
                                <option value="เชียงราย">เชียงราย</option>
                                <option value="เชียงใหม่">เชียงใหม่</option>
                                <option value="ตรัง">ตรัง</option>
                                <option value="ตราด">ตราด</option>
                                <option value="ตาก">ตาก</option>
                                <option value="นครนายก">นครนายก</option>
                                <option value="นครปฐม">นครปฐม</option>
                                <option value="นครพนม">นครพนม</option>
                                <option value="นครราชสีมา">นครราชสีมา</option>
                                <option value="นครศรีธรรมราช">นครศรีธรรมราช</option>
                                <option value="นครสวรรค์">นครสวรรค์</option>
                                <option value="นนทบุรี">นนทบุรี</option>
                                <option value="นราธิวาส">นราธิวาส</option>
                                <option value="น่าน">น่าน</option>
                                <option value="บึงกาฬ">บึงกาฬ</option>
                                <option value="บุรีรัมย์">บุรีรัมย์</option>
                                <option value="ปทุมธานี">ปทุมธานี</option>
                                <option value="ประจวบคีรีขันธ์">ประจวบคีรีขันธ์</option>
                                <option value="ปราจีนบุรี">ปราจีนบุรี</option>
                                <option value="ปัตตานี">ปัตตานี</option>
                                <option value="พระนครศรีอยุธยา">พระนครศรีอยุธยา</option>
                                <option value="พังงา">พังงา</option>
                                <option value="พัทลุง">พัทลุง</option>
                                <option value="พิจิตร">พิจิตร</option>
                                <option value="พิษณุโลก">พิษณุโลก</option>
                                <option value="เพชรบุรี">เพชรบุรี</option>
                                <option value="เพชรบูรณ์">เพชรบูรณ์</option>
                                <option value="แพร่">แพร่</option>
                                <option value="พะเยา">พะเยา</option>
                                <option value="ภูเก็ต">ภูเก็ต</option>
                                <option value="มหาสารคาม">มหาสารคาม</option>
                                <option value="มุกดาหาร">มุกดาหาร</option>
                                <option value="แม่ฮ่องสอน">แม่ฮ่องสอน</option>
                                <option value="ยะลา">ยะลา</option>
                                <option value="ยโสธร">ยโสธร</option>
                                <option value="ร้อยเอ็ด">ร้อยเอ็ด</option>
                                <option value="ระนอง">ระนอง</option>
                                <option value="ระยอง">ระยอง</option>
                                <option value="ราชบุรี">ราชบุรี</option>
                                <option value="ลพบุรี">ลพบุรี</option>
                                <option value="ลำปาง">ลำปาง</option>
                                <option value="ลำพูน">ลำพูน</option>
                                <option value="เลย">เลย</option>
                                <option value="ศรีสะเกษ">ศรีสะเกษ</option>
                                <option value="สกลนคร">สกลนคร</option>
                                <option value="สงขลา">สงขลา</option>
                                <option value="สตูล">สตูล</option>
                                <option value="สมุทรปราการ">สมุทรปราการ</option>
                                <option value="สมุทรสงคราม">สมุทรสงคราม</option>
                                <option value="สมุทรสาคร">สมุทรสาคร</option>
                                <option value="สระแก้ว">สระแก้ว</option>
                                <option value="สระบุรี">สระบุรี</option>
                                <option value="สิงห์บุรี">สิงห์บุรี</option>
                                <option value="สุโขทัย">สุโขทัย</option>
                                <option value="สุพรรณบุรี">สุพรรณบุรี</option>
                                <option value="สุราษฎร์ธานี">สุราษฎร์ธานี</option>
                                <option value="สุรินทร์">สุรินทร์</option>
                                <option value="หนองคาย">หนองคาย</option>
                                <option value="หนองบัวลำภู">หนองบัวลำภู</option>
                                <option value="อ่างทอง">อ่างทอง</option>
                                <option value="อุดรธานี">อุดรธานี</option>
                                <option value="อุทัยธานี">อุทัยธานี</option>
                                <option value="อุตรดิตถ์">อุตรดิตถ์</option>
                                <option value="อุบลราชธานี">อุบลราชธานี</option>
                                <option value="อำนาจเจริญ">อำนาจเจริญ</option>
                                </select>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p style={{textAlign:"left"}}>เขต/อำเภอ:</p></div>
                            <div className="col-md-9">
                                <input type="text" placeholder="กรอกเขต/อำเภอ"  value={district} onChange={this.onDistrictChange} className="form-control" title="กรุณากรอกเขต/อำเภอ" maxLength="100" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p style={{textAlign:"left"}}>แขวง/ตำบล:</p></div>
                            <div className="col-md-9">
                                <input type="text" placeholder="กรอกแขวง/ตำบล" value={quarter}  onChange={this.onQuarterChange} className="form-control" title="กรุณากรอกแขวง/อำเภอ" maxLength="100" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p style={{textAlign:"left"}}>รหัสไปรษณีย์:</p></div>
                            <div className="col-md-3">
                                <input type="tel"  placeholder="กรอกรหัสไปรษณีย์"  value={zipCode} onChange={this.onZipCodeChange} className="form-control" pattern="[0-9]{5}" title="กรุณากรอกเฉพาะตัวเลข 5 หลักเท่านั้น" maxLength="5" required />
                            </div>
                        </div>
                        <div className="col-md-12 address__row">
                            <div className="col-md-3"><p style={{textAlign:"left"}}>ที่อยู่:</p></div>
                            <div className="col-md-9">
                                <textarea rows="8" placeholder="กรอกรายละเอียดที่อยู่ เช่น บ้านเลขที่ / ชื่ออาคาร / หมู่บ้าน / ตรอก / ซอย / หมู่ที่ / ถนน"  value={addressDetail}  onChange={this.onAddressDetailChange} className="form-control" title="กรุณากรอกรายละเอียดที่อยู่ เช่น บ้านเลขที่ / ชื่ออาคาร / หมู่บ้าน / ตรอก / ซอย / หมู่ที่ / ถนน" maxLength="1000" required></textarea>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-sm-12" style={{textAlign:"right"}}>
                            <Link href="/carryProcess">
                            <div className="button process__button choose__address__button__selected">
                            ยกเลิก
                            </div>
                            </Link>
                            <button className="button process__button choose__address__button__selected">
                            บันทึก
                            </button>
                        
                    </div>
                </div>


            </form>
        </div>
        </MobileView>
        </div>
    )
    }
}
const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      dispatchAddAddressInfoToUser: address => dispatch(addAddressInfoToUser(address)),
      dispatchEditAddressInfoToUser: (address,index) => dispatch(editAddressInfoToUser(address,index)),
     
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
