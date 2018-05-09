import React from "react";
import Link from "next/link";
import DropdownMenu, { NestedDropdownMenu } from "react-dd-menu";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenuOpen: false,
        isSubMakeupMenuOpen: false,
        isSubSkincareMenuOpen: false,
        isSubMaskMenuOpen: false,
        isSubBodyandHairMenuOpen: false,
        isSubBeautyMenuOpen: false,
        isSubSupplementaryFoodMenuOpen: false
      };
  }


  openMenu = () => {
    this.setState({ 
        isMenuOpen: !this.state.isMenuOpen,
        isSubMakeupMenuOpen: false,
        isSubSkincareMenuOpen: false,
        isSubMaskMenuOpen: false,
        isSubBodyandHairMenuOpen: false,
        isSubBeautyMenuOpen: false,
        isSubSupplementaryFoodMenuOpen: false
    });
  };
  openSubMakeupMenu = () => {
    this.setState({ 
        isSubMakeupMenuOpen: true,
        isSubSkincareMenuOpen: false,
        isSubMaskMenuOpen: false,
        isSubBodyandHairMenuOpen: false,
        isSubBeautyMenuOpen: false,
        isSubSupplementaryFoodMenuOpen: false
    });
  };
  openSubSkincareMenu = () => {
    this.setState({ 
        isSubMakeupMenuOpen: false,
        isSubSkincareMenuOpen: true,
        isSubMaskMenuOpen: false,
        isSubBodyandHairMenuOpen: false,
        isSubBeautyMenuOpen: false,
        isSubSupplementaryFoodMenuOpen: false
    });
  };
  openSubMaskMenuMenu = () => {
    this.setState({ 
        isSubMakeupMenuOpen: false,
        isSubSkincareMenuOpen: false,
        isSubMaskMenuOpen: true,
        isSubBodyandHairMenuOpen: false,
        isSubBeautyMenuOpen: false,
        isSubSupplementaryFoodMenuOpen: false
    });
  };
  openSubBodyandHairMenu = () => {
    this.setState({ 
        isSubMakeupMenuOpen: false,
        isSubSkincareMenuOpen: false,
        isSubMaskMenuOpen: false,
        isSubBodyandHairMenuOpen: true,
        isSubBeautyMenuOpen: false,
        isSubSupplementaryFoodMenuOpen: false
    });
  };
  openSubBeautyMenu = () => {
    this.setState({ 
        isSubMakeupMenuOpen: false,
        isSubSkincareMenuOpen: false,
        isSubMaskMenuOpen: false,
        isSubBodyandHairMenuOpen: false,
        isSubBeautyMenuOpen: true,
        isSubSupplementaryFoodMenuOpen: false
    });
  };
  openSubSupplementaryFoodMenu = () => {
    this.setState({ 
        isSubMakeupMenuOpen: false,
        isSubSkincareMenuOpen: false,
        isSubMaskMenuOpen: false,
        isSubBodyandHairMenuOpen: false,
        isSubBeautyMenuOpen: false,
        isSubSupplementaryFoodMenuOpen: true
    });
  };




  render() {
    const pathname = this.props.pathname;
    const query = this.props.query || "";
    
     return (
      <div className=" header__navbar ">
        <div className="navbar__menu ">
          <Link href="/">
            <a className={"nav__title " + (pathname=='/' ? "navbar__title__active " : null)}>หน้าแรก</a>
          </Link>
        </div>
        <div className="navbar__menu">
          <Link href="/productCategory?activeProductType=newitem">
          { query.activeProductType !== undefined || query.activeCategoryList !== undefined ?
          <a className={"nav__title " + (this.props.query.activeProductType=='newitem' || query.activeCategoryList !== undefined ? "navbar__title__active" : null)}>สินค้าใหม่</a>         
          :<a className={"nav__title "}>สินค้าใหม่</a>
           }
          </Link>
        </div>
        <div className="navbar__menu">
          <Link href="/comingsoon">
          <a className="nav__title">ปัญหาผิว</a>
          </Link>
        </div>
        <div className="navbar__menu"   >
            <div className="navbar__menu__category" >
                <a id="typeOfCategory" className="nav__title" onClick={() => {this.openMenu();}}>ประเภท</a>
         { this.state.isMenuOpen ? 
            <div className="new_nav_left" >
                <a className="catalog__dropdown_menu"  
                onClick={() => {this.openSubMakeupMenu();}} >
                <div>
                    <span className="arrow-dropdownmenu-1" />
                    <span className="arrow-dropdownmenu-2" />
                </div>เมคอัพ
                { this.state.isSubMakeupMenuOpen ?
                 <div className="new_nav_right  makeupMenu"  >
                    <table className="table__skincare" >
                        <tbody>
                        <tr>
                            <td>
                            <h4>หน้า</h4>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "1" } }}>
                            <a>ไพรเมอร์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "2" } }}>
                            <a>เบส</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "3" } }}>
                            <a>รองพื้น</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "4" } }}>
                            <a>บีบีครีม/ซีซีครีม</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "5" } }}>
                            <a>คุชชั่น</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "6" } }}>
                            <a>คอนซีลเลอร์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "7" } }}>
                            <a>แป้ง</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "8" } }}>
                            <a>บลัชออน</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "9" } }}>
                            <a>ไฮไลท์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "10" } }}>
                            <a>เฉดดิ้ง/คอนทัวร์</a>
                            </Link>
                            </td>

                            <td>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "11" } }}>
                            <a>บรอนเซอร์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "12" } }}>
                            <a>พาเลตต์</a>
                            </Link>
                            
                            <a style={{color:"white"}}>.</a>
                            <h4>ดวงตา</h4>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "13" } }}>
                            <a>อายไพรเมอร์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "14" } }}>
                            <a>อายแชโดว์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "15" } }}>
                            <a>อายไลน์เนอร์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "16" } }}>
                            <a>มาสคาร่า</a>
                            </Link>
                            
                            </td>
                            <td>
                            <h4>คิ้ว</h4>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "17" } }}>
                            <a>ชนิดดินสอ</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "18" } }}>
                            <a>ชนิดฝุ่น</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "19" } }}>
                            <a>ชนิดลิขวิด</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "20" } }}>
                            <a>ชนิดเจล</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "21" } }}>
                            <a>เจลสักคิ้ว</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "22" } }}>
                            <a>มาสคาร่าคิ้ว</a>
                            </Link>
                            <a style={{color:"white"}}>.</a>
                            <h4>ผม</h4>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "23" } }}>
                            <a>ปกปิดผมบาง</a>
                            </Link>
                            </td>
                            <td>
                            
                            <h4>ริมฝีปาก</h4>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "24" } }}>
                            <a>ลิปบำรุง</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "25" } }}>
                            <a>ลิปไพรเมอร์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "26" } }}>
                            <a>ลิปคอนซีลเลอร์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "27" } }}>
                            <a>ลิปสติก</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "28" } }}>
                            <a>ลิปลิขวิด</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "29" } }}>
                            <a>ลิปทินท์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "30" } }}>
                            <a>ลิปกลอส</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "31" } }}>
                            <a>ลิปไลเนอร์</a>
                            </Link>
                            <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "32" } }}>
                            <a>ลิปพาเลตต์</a>
                            </Link>
                            </td>
                            
                        </tr>
                        </tbody>
                    </table>
                </div>
                :null}
                </a>
                <hr />
                <a className="catalog__dropdown_menu" 
                onClick={() => {this.openSubSkincareMenu();}} >
                    สกินแคร์
                { this.state.isSubSkincareMenuOpen ?
                    <div className="new_nav_right skincareMenu">
                        <table className="table__skincare">
                            <tbody>
                            <tr>
                                <td>
                                <h4>รีมูฟเวอร์</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "33" } }}>
                                <a>ชนิดน้ำ</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "34" } }}>
                                <a>ชนิดออยล์</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: '35' } }}>
                                <a>ชนิดครีม</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: '36' } }}>
                                <a>ชนิดเจล</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: '37' } }}>
                                <a>ชนิดน้ำนม</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: '38' } }}>
                                <a>ชนิดแผ่น</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "39" } }}>
                                <a>สำหรับริมฝีปาก/ดวงตา</a>
                                </Link>
                                
                                <a style={{color:"white"}}>.</a>
                                <h4>
                                    ทำความสะอาด/<br />ผลัดเซลล์ผิว
                                </h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "40" } }}>
                                <a>ชนิดเจล</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "41" } }}>
                                <a>ชนิดโฟม</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "42" } }}>
                                <a>ชนิดน้ำนม</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "43" } }}>
                                <a>สบู่ก้อน</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "44" } }}>
                                <a>ผลัดเซลล์ผิว/สครับ</a>
                                </Link>
                                </td>

                                <td>
                                <h4>กันแดดผิวหน้า</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "45" } }}>
                                <a>ครีมกันแดด</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "46" } }}>
                                <a>อาฟเตอร์ซัน</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "47" } }}>
                                <a>สเปรย์กันแดด</a>
                                </Link>

                                <a style={{color:"white"}}>.</a>
                                <h4>ริมฝีปาก</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "48" } }}>
                                <a>ลิปบาล์ม</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "49" } }}>
                                <a>ลิปครีม</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "50" } }}>
                                <a>มาสก์บำรุงริมฝีปาก</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "51" } }}>
                                <a>สครับบำรุงริมฝีปาก</a>
                                </Link>

                                <a style={{color:"white"}}>.</a>
                                <h4>ดวงตา</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "52" } }}>
                                <a>ชนิดเจล</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "53" } }}>
                                <a>ชนิดครีม</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "54" } }}>
                                <a>เซรั่มบำรุงรอบดวงตา</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "55" } }}>
                                <a>มาสก์บำรุงรอบดวงตา</a>
                                </Link>
                                </td>

                                <td>
                                <h4>โทนเนอร์/สเปรย์</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "56" } }}>
                                <a>โทนเนอร์</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "57" } }}>
                                <a>สเปรย์/มิสต์</a>
                                </Link>

                                <a style={{color:"white"}}>.</a>
                                <h4>เอสเซนต์/โลชั่น/</h4>
                                <h4>อิมัลชั่น</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "58" } }}>
                                <a>เอสเซนต์</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "59" } }}>
                                <a>โลชั่น</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "60" } }}>
                                <a>อิมัลชั่น</a>
                                </Link>

                                <a style={{color:"white"}}>.</a>
                                <h4>เซรั่ม</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "61" } }}>
                                <a>ไวท์เทนนิ่ง</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "62" } }}>
                                <a>เพิ่มความชุ่มชื้น</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "63" } }}>
                                <a>ลดเลือนริ้วรอย</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "64" } }}>
                                <a>ลดจุดด่างดำ/รอยแดง</a>
                                </Link>
                                </td>
                                <td>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "65" } }}>
                                <a>กระชับรูขุมขน</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "66" } }}>
                                <a>เพื่อผิวแข็งแรง</a>
                                </Link>

                                <a style={{color:"white"}}>.</a>
                                <h4>มอยเจอร์ไรเซอร์</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "67" } }}>
                                <a>ชนิดเจล</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "68" } }}>
                                <a>ชนิดครีม</a>
                                </Link>

                                <a style={{color:"white"}}>.</a>
                                <h4>รักษาสิว</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "69" } }}>
                                <a>ทำความสะอาด</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "70" } }}>
                                <a>บำรุง</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "71" } }}>
                                <a>เจลแต้มและแผ่นแปะ</a>
                                </Link>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "72" } }}>
                                <a>ลดรอยสิว</a>
                                </Link>

                                <a style={{color:"white"}}>.</a>
                                <h4>ออยล์บำรุงผิวหน้า</h4>
                                <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "73" } }}>
                                <a>ออยล์บำรุงผิวหน้า</a>
                                </Link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    :null}
                </a>
                <hr />
                <a className="catalog__dropdown_menu" 
                onClick={() => {this.openSubMaskMenuMenu();}} >
                    มาสก์
                    { this.state.isSubMaskMenuOpen ?
                        <div className="new_nav_right maskMenu">
                            <table className="table__skincare">
                                <tbody>
                                <tr>
                                    <td>
                                    <h4>มาสก์แบบแผ่น</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "74" } }}>
                                    <a>มาสก์แบบแผ่น</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>มาสก์แบบล้างออก</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "75" } }}>
                                    <a>มาสก์แบบพอกหน้า</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "76" } }}>
                                    <a>มาสก์แบบลอก</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>มาสก์แบบไม่ล้างออก</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "77" } }}>
                                    <a>สลีปปิ้งมาสก์</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>มาสก์สำหรับผิวกาย</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "78" } }}>
                                    <a>มาสก์สำหรับมือ/เท้า</a>
                                    </Link>

                                    </td>
                                    <td>
                                    
                                    <h4>มาสก์เฉพาะจุด</h4>
                                    
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "79" } }}>
                                    <a>สำหรับดวงตา</a></Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "80"} }}>
                                    <a>บำรุงริมฝีปาก</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "81"}}}>
                                    <a>มาสก์สิวเสี้ยน</a>
                                    </Link>
                                    
                                    
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    :null}
                </a>
                <hr />
                <a className="catalog__dropdown_menu" style={{paddingLeft:"0px",paddingRight:"0px"}} 
                onClick={() => {this.openSubBodyandHairMenu();}} >
                    ผิวกายและเส้นผม
                    { this.state.isSubBodyandHairMenuOpen ?
                        <div className="new_nav_right bodyandHairMenu">
                            <table className="table__skincare">
                                <tbody>
                                <tr>
                                    <td>
                                    <h4>ทำความสะอาดผิวกาย</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "82" } }}>
                                    <a>ครีม/เจลอาบน้ำ</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "83" } }}>
                                    <a>สบู่ก้อน</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "84" } }}>
                                    <a>สครับผิวกาย</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "85" } }}>
                                    <a>ทำความสะอาดจุดซ่อนเร้น</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>บำรุงผิวกาย</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "86" } }}>
                                    <a>เซรั่ม</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "87" } }}>
                                    <a>โลชั่น</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "88" } }}>
                                    <a>ออยล์บำรุง</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "89" } }}>
                                    <a>ครีมทาตัวปรับสีผิว</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "90" } }}>
                                    <a>ครีมทามือ</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>กันแดดผิวกาย</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "91" } }}>
                                    <a>ครีมกันแดด</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "92" } }}>
                                    <a>สเปรย์กันแดด</a>
                                    </Link>
                                    </td>

                                    <td>
                                    <h4>เส้นผม</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "93" } }}>
                                    <a>แชมพู</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "94" } }}>
                                    <a>คอนดิชันเนอร์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "95" } }}>
                                    <a>ทรีทเมนต์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "96" } }}>
                                    <a>บำรุงเส้นผม</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "97" } }}>
                                    <a>จัดแต่งทรงผม</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>เปลี่ยนสีผม</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "98" } }}>
                                    <a>เปลี่ยนสีผมชั่วคราว</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "99" } }}>
                                    <a>เปลี่ยนสีผมถาวร</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "100" } }}>
                                    <a>ปิดผมขาว</a>
                                    </Link>
                                    </td>
                                    <td>

                                   
                                    <h4>น้ำหอม</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "101" } }}>
                                    <a>น้ำหอม</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>ใต้วงแขน</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "102" } }}>
                                    <a>ใต้วงแขน</a>
                                    </Link>
                                    
                                    <a style={{color:"white"}}>.</a>
                                    <h4>จุดซ่อนเร้น</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "103" } }}>
                                    <a>ถุงยางอนามัย</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "104" } }}>
                                    <a>เจลหล่อลื่น</a>
                                    </Link>
                                    
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    :null}
                 </a>
                 <hr />
                 <a className="catalog__dropdown_menu" style={{paddingLeft:"0px",paddingRight:"0px"}}  
                 onClick={() => {this.openSubBeautyMenu();}} >
                    อุปกรณ์เสริมสวย
                    { this.state.isSubBeautyMenuOpen ?
                        <div className="new_nav_right beautyMenu">
                            <table className="table__skincare">
                                <tbody>
                                <tr>
                                    <td>
                                    <h4>ฟองน้ำ/</h4>
                                    <h4>แปรงแต่งหน้า</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "105" } }}>
                                    <a>ฟองน้ำ</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "106" } }}>
                                    <a>แปรงแต่งหน้า</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "107" } }}>
                                    <a>เซ็ตแปรงแต่งหน้า</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "108" } }}>
                                    <a>น้ำยาล้างแปรงแต่งหน้า</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>ดวงตา/คิ้ว</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "109" } }}>
                                    <a>ขนตาปลอม</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "110"} }}>
                                    <a>สติ๊กเกอร์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "111"} }}>
                                    <a>ที่ดัดขนตา</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "112" } }}>
                                    <a>อื่นๆ</a>
                                    </Link>
                                    </td>
                                    <td>
                                    <h4>กระเป๋า/</h4>
                                    <h4>อุปกรณ์อื่นๆ</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "113"} }}>
                                    <a>กระเป๋า</a>
                                    </Link>
                            
                                    <a style={{color:"white"}}>.</a>
                                    <h4>ยาทาเล็บ/</h4>
                                    <h4>อุปกรณ์ดูแลเล็บ</h4>
                                    
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "114" } }}>
                                    <a>ยาทาเล็บ</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "115" } }}>
                                    <a>เล็บปลอม</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "116" } }}>
                                    <a>อุปกรณ์ดูแลเล็บอื่นๆ</a>
                                    </Link>
                                    </td>
                                    <td>
                                    <h4>คอนแทคเลนส์</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "117" } }}>
                                    <a>คอนแทคเลนส์</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>อุปกรณ์จัดแต่งทรงผม</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "118" } }}>
                                    <a>อุปกรณ์จัดแต่งทรงผม</a>
                                    </Link>

                                    <a style={{color:"white"}}>.</a>
                                    <h4>อุปกรณ์เสริมสวยอื่นๆ</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "119" } }}>
                                    <a>สำลี/คอตตอนบัด</a>
                                    </Link>
                                    
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    :null}
                </a>
                <hr />
                <a className="catalog__dropdown_menu" 
                onClick={() => {this.openSubSupplementaryFoodMenu();}} >
                    อาหารเสริม
                    { this.state.isSubSupplementaryFoodMenuOpen ?
                        <div className="new_nav_right supplementaryFoodMenu">
                            <table className="table__skincare">
                                <tbody>
                                <tr>
                                    <td>
                                    <h4>อาหารเสริม</h4>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "120" } }}>
                                    <a>อ่อนเยาว์</a>
                                    </Link>
                                
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "121" } }}>
                                    <a>ขาวใส</a>
                                    </Link>
                                    
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "122" } }}>
                                    <a>ลดน้ำหนัก</a>
                                    </Link>
                                    
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "123" } }}>
                                    <a>บำรุงร่างกาย</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: {activeCategoryList: "124" } }}>
                                    <a>อื่นๆ</a>
                                    </Link>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    :null}
                </a>
            </div>
        
        :null } 
            </div>
        </div>
        <div className="navbar__menu">
          <Link href="/comingsoon">
          <a className="nav__title">แบรนด์</a>
          </Link>
        </div>
        <div className="navbar__menu">
          <Link href="/productCategory?activeProductType=hotitem">
          { query.activeProductType !== undefined ?
            <a className={"nav__title " + (this.props.query.activeProductType=='hotitem' ? "navbar__title__active" : null)}>ฮอตฮิต</a>
          :<a className={"nav__title "}>ฮอตฮิต</a>
           }
          
          </Link>
        </div>
        <div className="navbar__menu">
          <Link href="/comingsoon">
          <a className="nav__title">โปรโมชั่น</a>
          </Link>
        </div>
        <div className="navbar__menu">
          <Link href="/comingsoon">
            <a className={"nav__title " + (pathname=='/article' ? "navbar__title__active " : null)}>บทความ</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default NavigationBar;
