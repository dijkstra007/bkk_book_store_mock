import React from 'react';
import { connect } from "react-redux";
import Link from 'next/link'
import { clearMyCart } from '../actions/cart';
 class ThankyouForm extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // this.props.dispatchClearMyCart()
    }
    render() {
        // console.log("order",this.props.order);
        const order = this.props.order;
        const paymentType = order.paymentType;
        return (
            <div>
                <div className="col-sm-2"></div>
                <div className="col-sm-8" style={{ padding: "2%"}}>
                    {this.props.success}
                    {this.props.success || paymentType == "bank" || paymentType == "cash" ?
                        <span>
                        <p className="thankyou-title">THANK YOU</p>
                        <p className="thankyou-subtitle">FOR YOUR ORDER</p>
                        <p className="thankyou-text">หลังจากโอนเงินชำระค่าสินค้าเรียบร้อย รบกวนลูกค้าแจ้งชำระเงินโดยส่งหลักฐานการชำระเงินพร้อมระบุเลขที่สั่งซื้อมาที่ Line, E-mail หรือ Page Facebook</p>
                        <p className="thankyou-text main-pink">Line: @nineti9  |  E-mail: contact@nineti9.com |  Facebook: Nineti9</p>
                        </span>
                    :   
                        <span>
                        <p className="thankyou-title">SORRY</p>
                        <p className="thankyou-subtitle">YOUR PAYMENT WAS NOT SUCCESSFUL</p>
                        <p className="thankyou-text">คุณทำรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อ</p>
                        <p className="thankyou-text main-pink">Line: @nineti9  |  E-mail: contact@nineti9.com  |  Facebook: Nineti9</p>
                        </span>
                    }
                    <div className="col-sm-3"></div>
                    <div className="col-sm-3" style={{ paddingLeft: "0px" }}>
                        <Link href="/purchaseHistory">
                            <button className="button order__summarize__button2 ">รายการสั่งซื้อ</button>
                        </Link>
                    </div>
                    <div className="col-sm-3" style={{ paddingLeft: "0px" }}>
                        <Link href="/">
                            <button className="button order__summarize__button2 ">เลือกสินค้าต่อ</button>
                        </Link>
                    </div>
                    <div className="col-sm-3"></div>
                </div>
                <div className="col-sm-2"></div>
                <div className="col-sm-12"style={{height: "50px"}}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      order: state.order
    };
  };

  const mapDispatchToProps = dispatch => ({
    dispatchClearMyCart: () => dispatch(clearMyCart())
  });
  export default connect(mapStateToProps,mapDispatchToProps)(ThankyouForm);
  
