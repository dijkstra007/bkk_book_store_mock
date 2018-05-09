import React from "react";
import commaNumber from 'comma-number';

export default props => {
  const { price, salesPrice,product,onSale } = props;
  const percentCal = (price - salesPrice) / price * 100;
  const indexOfDot = percentCal.toString().indexOf(".");
  const percent = indexOfDot < 0 ? percentCal: percentCal.toString().substr(0, indexOfDot);
  return (
    <div>
      {!onSale ? (
        <div className="box__price__container" style={{ fontSize: 45 }}>
           ฿ {commaNumber(props.price)}
        </div>
      ) : (
        <div className="div-row" style={{alignItems:'center'}}>
          <div style={{ marginRight: 10, fontSize: 26, paddingTop: 5 }}>
            {" "}
            เหลือ{" "}
          </div>
          <div className="box__price__container">
          ฿ {commaNumber(props.salesPrice)} 
          </div>
          <div style={{marginLeft: "10px", lineHeight: "30px"}}>
            <div className="box__price__original__price">
              ราคาเดิม ฿ {commaNumber(props.price)} 
            </div>
            <div className="box__price__percent">ลดไป {percent}%</div>
          </div>
        </div>
      )}
    </div>
  );
};
