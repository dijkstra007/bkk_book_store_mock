import React from "react";
import Link from "next/link";
import DropdownMenu, { NestedDropdownMenu } from "react-dd-menu";

class NavigationBarTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenuOpen: false,
        isSubMakeupMenuOpen: false,
        isSubSkincareMenuOpen: false,
        isSubMaskMenuOpen: false,
        isSubBodyandHairMenuOpen: false,
        isSubBeautyMenuOpen: false,
        isSubSupplementaryFoodMenuOpen: false,
        width: 0
      };
  }


  openMenu = () => {
    const width = document.getElementById("typeOfCategory");
    console.log("width",width.offsetWidth);
    this.setState({ isMenuOpen: true ,width:width});
  };
  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };
  openSubMakeupMenu = () => {
    this.setState({ isSubMakeupMenuOpen: true });
  };
  closeSubMakeupMenu = () => {
    this.setState({ isSubMakeupMenuOpen: false });
  };
  openSubSkincareMenu = () => {
    this.setState({ isSubSkincareMenuOpen: true });
  };
  closeSubSkincareMenu = () => {
    this.setState({ isSubSkincareMenuOpen: false });
  };
  openSubMaskMenuMenu = () => {
    this.setState({ isSubMaskMenuOpen: true });
  };
  closeSubMaskMenuMenu = () => {
    this.setState({ isSubMaskMenuOpen: false });
  };
  openSubBodyandHairMenu = () => {
    this.setState({ isSubBodyandHairMenuOpen: true });
  };
  closeSubBodyandHairMenu = () => {
    this.setState({ isSubBodyandHairMenuOpen: false });
  };
  openSubBeautyMenu = () => {
    this.setState({ isSubBeautyMenuOpen: true });
  };
  closeSubBeautyMenu = () => {
    this.setState({ isSubBeautyMenuOpen: false });
  };
  openSubSupplementaryFoodMenu = () => {
    this.setState({ isSubSupplementaryFoodMenuOpen: true });
  };
  closeSubSupplementaryFoodMenu = () => {
    this.setState({ isSubSupplementaryFoodMenuOpen: false });
   
  };



  render() {
    const pathname = this.props.pathname;

   
     return (
      <div className=" header__navbar ">
        <div className="navbar__menu " >
          <Link href="/">
            <a className={"nav__title " + (pathname=='/' ? "navbar__title__active " : null)}>หน้าแรก</a>
          </Link>
        </div>
        <div className="navbar__menu">
          <Link href="/productCategory">
          <a className={"nav__title " + (pathname=='/productCategory' ? "navbar__title__active" : null)}>สินค้าใหม่</a>
          </Link>
        </div>
        <div className="navbar__menu">
          <Link href="/comingsoon">
          <a className="nav__title">ปัญหาผิว</a>
          </Link>
        </div>
        <div className="navbar__menu"  onMouseEnter={() => {this.openMenu();}} onMouseLeave={()=>{this.closeMenu();}}>
            <div className="navbar__menu__category">
                <a id="typeOfCategory" className="nav__title">ประเภท</a>
                
                { this.state.isMenuOpen ? 
                    <div className="new_nav_left" style={{left: this.state.width.toString+"px" }}>
                        <a className="catalog__dropdown_menu"  
                        onMouseEnter={() => {this.openSubMakeupMenu();}} onMouseLeave={()=>{this.closeSubMakeupMenu();}}>
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
                                    <Link href={{ pathname: '/productCategory', query: { categories: "1" } }}>
                                    <a>ไพรเมอร์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "2" } }}>
                                    <a>เบส</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "3" } }}>
                                    <a>รองพื้น</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "4" } }}>
                                    <a>บีบีครีม/ซีซีครีม</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "5" } }}>
                                    <a>คุชชั่น</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "6" } }}>
                                    <a>คอนซีลเลอร์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "7" } }}>
                                    <a>แป้ง</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "8" } }}>
                                    <a>บลัชออน</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "9" } }}>
                                    <a>ไฮไลท์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "10" } }}>
                                    <a>เฉดดิ้ง/คอนทัวร์</a>
                                    </Link>
                                    </td>

                                    <td>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "11" } }}>
                                    <a>บรอนเซอร์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "12" } }}>
                                    <a>พาเลท</a>
                                    </Link>
                                    
                                    <h4>ดวงตา</h4>
                                    
                                    <Link href={{ pathname: '/productCategory', query: { categories: "13" } }}>
                                    <a>อายไพร์เมอร์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "14" } }}>
                                    <a>อายแชโดว์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "15" } }}>
                                    <a>อายไลน์เนอร์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "16" } }}>
                                    <a>มาสคาร่า</a>
                                    </Link>
                                    
                                    </td>
                                    <td>
                                    <h4>คิ้ว</h4>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "17" } }}>
                                    <a>ชนิดดินสอ</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "18" } }}>
                                    <a>ชนิดฝุ่น</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "19" } }}>
                                    <a>ชนิดลิขวิด</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "20" } }}>
                                    <a>ชนิดเจล</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "21" } }}>
                                    <a>เจลสักคิ้ว</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "22" } }}>
                                    <a>มาสคาร่าคิ้ว</a>
                                    </Link>
                                    <h4>ผม</h4>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "23" } }}>
                                    <a>ปกปิดผมบาง</a>
                                    </Link>
                                    </td>
                                    <td>
                                    
                                    <h4>ริมฝีปาก</h4>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "24" } }}>
                                    <a>ลิปบำรุง</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "25" } }}>
                                    <a>ลิปไพรเมอร์/</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "25" } }}>
                                    <a>คอนซีลเลอร์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "26" } }}>
                                    <a>ลิปสติก</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "27" } }}>
                                    <a>ลิปลิควิด</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "28" } }}>
                                    <a>ลิปทินท์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "29" } }}>
                                    <a>ลิปกรอส</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "30" } }}>
                                    <a>ลิปไลเนอร์</a>
                                    </Link>
                                    <Link href={{ pathname: '/productCategory', query: { categories: "31" } }}>
                                    <a>ลิปพาเลท</a>
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
                        onMouseEnter={() => {this.openSubSkincareMenu();}} onMouseLeave={()=>{this.closeSubSkincareMenu();}}>
                            สกินแคร์
                        { this.state.isSubSkincareMenuOpen ?
                            <div className="new_nav_right skincareMenu">
                                <table className="table__skincare">
                                    <tbody>
                                    <tr>
                                        <td>
                                        <h4>รีมูฟเวอร์</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "32" } }}>
                                        <a>ชนิดน้ำ</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "33" } }}>
                                        <a>ชนิดออยล์</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: '34' } }}>
                                        <a>ชนิดครีม</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: '35' } }}>
                                        <a>ชนิดเจล</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: '36' } }}>
                                        <a>ชนิดน้ำนม</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: '37' } }}>
                                        <a>ชนิดแผ่น</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "38" } }}>
                                        <a>สำหรับริมฝีปากและดวงตา</a>
                                        </Link>
                                        

                                        <h4>
                                            ทำความสะอาด<br />ผลัดเซลล์ผิว
                                        </h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "39" } }}>
                                        <a>ชนิดเจล</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "40" } }}>
                                        <a>ชนิดโฟม</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "41" } }}>
                                        <a>ชนิดน้ำนม</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "42" } }}>
                                        <a>สบู่ก้อน</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "43" } }}>
                                        <a>ผลัดเซลล์ผิว/สครับ</a>
                                        </Link>
                                        </td>

                                        <td>
                                        <h4>กันแดด</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "44" } }}>
                                        <a>ครีมกันแดด</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "45" } }}>
                                        <a>อาฟเตอร์ซัน</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "46" } }}>
                                        <a>สเปรย์กันแดดผิวหน้า</a>
                                        </Link>

                                        <h4>ริมฝีปาก</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "47" } }}>
                                        <a>ลิปบาล์ม</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "48" } }}>
                                        <a>ลิปครีม</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "49" } }}>
                                        <a>มาร์กบำรุงริมฝีปาก</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "50" } }}>
                                        <a>สครับบำรุงริมฝีปาก</a>
                                        </Link>

                                        <h4>ดวงตา</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "51" } }}>
                                        <a>ชนิดเจล</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "52" } }}>
                                        <a>ชนิดครีม</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "53" } }}>
                                        <a>เซรั่มบำรุงรอบดวงตา</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "54" } }}>
                                        <a>มาร์กบำรุงรอบดวงตา</a>
                                        </Link>
                                        </td>

                                        <td>
                                        <h4>โทนเนอร์/สเปรย์</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "55" } }}>
                                        <a>โทนเนอร์</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "56" } }}>
                                        <a>สเปรย์/มิสต์</a>
                                        </Link>
                                        <h4>เอสเซนต์/โลชั่น/</h4>
                                        <h4>อิมัลชัน</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "57" } }}>
                                        <a>เอสเซนต์</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "58" } }}>
                                        <a>โลชั่น</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "59" } }}>
                                        <a>อิมัลชัน</a>
                                        </Link>
                                        <h4>เซรัม</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "60" } }}>
                                        <a>ไวท์เทนนิ่ง</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "61" } }}>
                                        <a>เพิ่มความชุ่มชื้น</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "62" } }}>
                                        <a>ลดเลือนริ้วรอย</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "63" } }}>
                                        <a>ลดจุดด่างดำ/รอยแดง</a>
                                        </Link>
                                        </td>
                                        <td>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "64" } }}>
                                        <a>กระชับรูขุมขน</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "65" } }}>
                                        <a>เพื่อผิวแข็งแรง</a>
                                        </Link>


                                        <h4>มอยเจอร์ไรเซอร์</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "66" } }}>
                                        <a>ชนิดเจล</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "67" } }}>
                                        <a>ชนิดครีม</a>
                                        </Link>

                                        <h4>รักษาสิว</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "68" } }}>
                                        <a>ทำความสะอาด</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "69" } }}>
                                        <a>บำรุง</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "70" } }}>
                                        <a>เจลแต้มและแผ่นแปะ</a>
                                        </Link>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "71" } }}>
                                        <a>รักษาสิว</a>
                                        </Link>

                                        <h4>ออยล์บำรุงผิวหน้า</h4>
                                        <Link href={{ pathname: '/productCategory', query: { categories: "72" } }}>
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
                        onMouseEnter={() => {this.openSubMaskMenuMenu();}} onMouseLeave={()=>{this.closeSubMaskMenuMenu();}}>
                            มาส์ก
                            { this.state.isSubMaskMenuOpen ?
                                <div className="new_nav_right maskMenu">
                                    <table className="table__skincare">
                                        <tbody>
                                        <tr>
                                            <td>
                                            <h4>มาส์กแบบแผ่น</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "73" } }}>
                                            <a>มาส์กแบบแผ่น</a>
                                            </Link>
                                            <h4>มาส์กแบบล้างออก</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "74" } }}>
                                            <a>มาส์กแบบพอกหน้า</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "75" } }}>
                                            <a>มาส์กแบบลอก</a>
                                            </Link>

                                            <h4>มาส์กแบบไม่ล้างออก</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "76" } }}>
                                            <a>สลีปปิ้งมาส์ก</a>
                                            </Link>

                                            <h4>มาส์กสำหรับผิวกาย</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "77" } }}>
                                            <a>มาส์กสำหรับมือ/เท้า</a>
                                            </Link>

                                            </td>
                                            <td>
                                            
                                            <h4>มาส์กเฉพาะจุด</h4>
                                            
                                            <Link href={{ pathname: '/productCategory', query: { categories: "78" } }}>
                                            <a>สำหรับดวงตา</a></Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "79"} }}>
                                            <a>บำรุงริมฝีปาก</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "80"}}}>
                                            <a>มาส์กสิวเสี้ยน</a>
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
                        onMouseEnter={() => {this.openSubBodyandHairMenu();}} onMouseLeave={()=>{this.closeSubBodyandHairMenu();}}>
                            ผิวกายและเส้นผม
                            { this.state.isSubBodyandHairMenuOpen ?
                                <div className="new_nav_right bodyandHairMenu">
                                    <table className="table__skincare">
                                        <tbody>
                                        <tr>
                                            <td>
                                            <h4>ทำความสะอาดผิวกาย</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "81" } }}>
                                            <a>ครีม/เจลอาบน้ำ</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "82" } }}>
                                            <a>สบู่ก้อน</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "83" } }}>
                                            <a>สครับผิวกาย</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "84" } }}>
                                            <a>ทำความสะอาดจุดซ่อนเร้น</a>
                                            </Link>

                                            <h4>บำรุงผิวกาย</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "85" } }}>
                                            <a>เซรั่ม</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "86" } }}>
                                            <a>โลชั่น</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "87" } }}>
                                            <a>ออยล์บำรุง</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "88" } }}>
                                            <a>ครีมทาตัวปรับสีผิว</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "89" } }}>
                                            <a>ครีมทามือ</a>
                                            </Link>
                                            
                                            
                                            </td>
                                            <td>
                                            <h4>เส้นผม</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "90" } }}>
                                            <a>แชมพู</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "91" } }}>
                                            <a>คอนดิชันเนอร์</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "92" } }}>
                                            <a>ทรีทเมนต์</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "93" } }}>
                                            <a>บำรุงเส้นผม</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "94" } }}>
                                            <a>จัดแต่งทรงผม</a>
                                            </Link>

                                            <h4>เปลี่ยนสีผม</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "95" } }}>
                                            <a>เปลี่ยนสีผมชั่วคราว</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "96" } }}>
                                            <a>เปลี่ยนสีผมถาวร</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "97" } }}>
                                            <a>ปิดผมขาว</a>
                                            </Link>
                                            </td>
                                            <td>
                                            <h4>น้ำหอม</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "98" } }}>
                                            <a>น้ำหอม</a>
                                            </Link>
                                            <h4>ใต้วงแขน</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "99" } }}>
                                            <a>ใต้วงแขน</a>
                                            </Link>
                                            
                                            <h4>จุดซ่อนเร้น</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "100" } }}>
                                            <a>ถุงยางอนามัย</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "101" } }}>
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
                        onMouseEnter={() => {this.openSubBeautyMenu();}} onMouseLeave={()=>{this.closeSubBeautyMenu();}}>
                            อุปกรณ์เสริมสวย
                            { this.state.isSubBeautyMenuOpen ?
                                <div className="new_nav_right beautyMenu">
                                    <table className="table__skincare">
                                        <tbody>
                                        <tr>
                                            <td>
                                            <h4>ฟองน้ำ/</h4>
                                            <h4>แปรงแต่งหน้า</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "102" } }}>
                                            <a>ฟองน้ำ</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "103" } }}>
                                            <a>แปรงแต่งหน้า</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "104" } }}>
                                            <a>เซ็ตแปรงแต่งหน้า</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "105" } }}>
                                            <a>น้ำยาล้างแปรงแต่งหน้า</a>
                                            </Link>

                                            <h4>ดวงตา/คิ้ว</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "106" } }}>
                                            <a>ขนตาปลอม</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "107"} }}>
                                            <a>สติกเกอร์</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "108"} }}>
                                            <a>ที่ดัดขนตา</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "109" } }}>
                                            <a>อื่นๆ</a>
                                            </Link>
                                            </td>
                                            <td>
                                            <h4>กระเป๋า/</h4>
                                            <h4>อุปกรณ์อื่นๆ</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "110"} }}>
                                            <a>กระเป๋า</a>
                                            </Link>
                                    
                                            <h4>ยาทาเล็บ/</h4>
                                            <h4>อุปกรณ์ดูแลเล็บ</h4>
                                            
                                            <Link href={{ pathname: '/productCategory', query: { categories: "111" } }}>
                                            <a>ยาทาเล็บ</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "112" } }}>
                                            <a>เล็บปลอม</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "113" } }}>
                                            <a>อุปกรณ์ดูแลเล็บอื่นๆ</a>
                                            </Link>
                                            </td>
                                            <td>
                                            <h4>คอนเทคเลนส์</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "114" } }}>
                                            <a>คอนเทคเลนส์</a>
                                            </Link>
                                            <h4>อุปกรณ์จัดแต่งทรงผม</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "115" } }}>
                                            <a>อุปกรณ์จัดแต่งทรงผม</a>
                                            </Link>
                                            <h4>อุปกรณ์เสริมสวยอื่นๆ</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "116" } }}>
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
                        onMouseEnter={() => {this.openSubSupplementaryFoodMenu();}} onMouseLeave={()=>{this.closeSubSupplementaryFoodMenu();}}>
                            อาหารเสริม
                            { this.state.isSubSupplementaryFoodMenuOpen ?
                                <div className="new_nav_right supplementaryFoodMenu">
                                    <table className="table__skincare">
                                        <tbody>
                                        <tr>
                                            <td>
                                            <h4>อาหารเสริม</h4>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "117" } }}>
                                            <a>อ่อนเยาว์</a>
                                            </Link>
                                        
                                            <Link href={{ pathname: '/productCategory', query: { categories: "118" } }}>
                                            <a>ขาวใส</a>
                                            </Link>
                                            
                                            <Link href={{ pathname: '/productCategory', query: { categories: "119" } }}>
                                            <a>ลดน้ำหนัก</a>
                                            </Link>
                                            
                                            <Link href={{ pathname: '/productCategory', query: { categories: "120" } }}>
                                            <a>บำรุงร่างกาย</a>
                                            </Link>
                                            <Link href={{ pathname: '/productCategory', query: { categories: "121" } }}>
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
          <Link href="/comingsoon">
          <a className="nav__title">ฮอตฮิต</a>
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

export default NavigationBarTest;
