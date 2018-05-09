import React from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import Link from 'next/link'

 class FailPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="col-sm-2"></div>
                <div className="col-sm-8" style={{ padding: "2%"}}>
                    <p className="thankyou-title">SORRY</p>
                    <p className="thankyou-subtitle">YOUR PAYMENT ERROR</p>
                    <p className="thankyou-text">คุณทำรายการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง หรือติดต่อ</p>
                    <p className="thankyou-text main-pink">Line: @nineti9  |  E-mail: mkt@nineti9.com  |  Facebook: Nineti9</p>
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
            </div>
        )
    }
}
  export default FailPage;
