import moment from "moment";
import database from "../firebase/firebase";
import * as API from "../constants/apiURL";
import axios from "axios";

export const startCheckCoupon = (couponName, priceBeforeApplyPromotion) => {
  return async dispatch => {
    // const res = await axios.get(API.CHECK_A_COUPON, {
    //   params: {
    //     name: couponName
    //   }
    // });
    console.log(">>>", couponName, priceBeforeApplyPromotion);
    const res = await axios({
      method: "get",
      url: API.CHECK_A_COUPON + "?name=" +couponName +"&&priceBeforeApply=" +priceBeforeApplyPromotion,
    });
    const coupon = res.data;
    if (coupon.ok) {
      dispatch(setCoupon(coupon));
    } else {
      dispatch(
        setCoupon({
          ok: false,
          message: coupon.message
        })
      );
    }
    // return fetch(API.GET_COUPON + "?name=" + couponName)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(data => {
    //     const val = data;

    //     const myCoupon = {
    //         ...val,
    //         isValid: val.message !== "Coupons not found" && !val.isExpired
    //     };
    //     dispatch(setCoupon(myCoupon));

    //   })
    //   .catch(e => {
    //     console.log("Error", e);
    //     dispatch(setCoupon());
    //   });
  };
};
export const setCoupon = coupon => ({
  type: "SET_COUPON",
  coupon
});
