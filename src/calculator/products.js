var axios = require('axios')
import * as API from '../constants/apiURL'
var qs =  require('qs')
export const asyncGetSummaryPriceFromServer = ({ products, coupon, carrierType, province })  => {
  return axios({
    method:'get',
    url: API.GET_SUMMARY_PRICE,
    params: {
      products: products,
      coupon: coupon,
      carrier: carrierType,
      province: province
    },
    paramsSerializer: function(params) {
      return qs.stringify(params)
    }
  })
  /*
  { paidAmount,
  shippingFee,
  priceBeforeApplyPromotion,
  priceDiscounted }
  */
}
