import axios from "axios";
import * as API from "../constants/apiURL";

export const setAddressToOrder = address => {
  // console.log("address",address);
  return {
    type: "ORDER_SET_ADDRESS",
    address: address
  };
};

export const setCouponToOrder = name => {
  return {
    type: "ORDER_SET_COUPON",
    coupon: name
  };
};

export const removeAddressToOrder = () => {
  console.log("remove address",address);
  return {
    type: "ORDER_REMOVE_COUPON"
  };
};

export const removeCouponToOrder = () => {
  return {
    type: "ORDER_REMOVE_COUPON"
  };
};

export const setCarrier = carrier => {
  // console.log("setCarrier",carrier);
  return {
    type: "ORDER_SET_CARRIER",
    carrier: carrier
  };
};




export const setProductsToOrder = products => {
  return {
    type: "ORDER_SET_PRODUCTS",
    products: products
  };
};

export const setPaymentType = paymentType => {
  return {
    type: "ORDER_SET_PAYMENT_TYPE",
    paymentType: paymentType
  }
}
export const sendOrderToServer = async order => {
  try{
    const res = await axios({
      method: "post",
      url: API.POST_ORDER_TO_SERVER,
      data: order
    });
    return res.data;
  }catch(err){
    const code = err.response.status;
    const failPage = "http://" +window.location.hostname +":" +window.location.port +"/failPage?code=" +code;
    window.location.replace(failPage);    
  }
};

export const sendSlipToServer = slipInfo => {
  return new Promise(async (resolve, reject) => {
    // console.log("slipInfo in sendSlipTOServer ", slipInfo);
    try {
      let res = await axios({
        method: "put",
        url: API.PUT_SLIP_TO_SERVER,
        data: slipInfo
      });
      if(res.data.ok) {
        console.log("sendSlipToServer complete", res);
      }
      resolve(res.data);
    } catch (err) {
      console.log("sendSlipToServer err ", err);
      reject(false);
      // const code = err.response.status;
      // const failPage = "http://" +window.location.hostname +":" +window.location.port +"/failPage?code=" +code;
      // window.location.replace(failPage); 
    }
  });
};
