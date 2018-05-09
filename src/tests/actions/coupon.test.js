import { setCoupon } from "../../actions/coupon";
var chai = require("chai");
var expect = chai.expect;
describe("Coupon Action Test", function() {
  it("should get coupon action object with default value", () => {
    const action = setCoupon();
    const coupon = {
      name: "",
      type: "",
      amount: 0,
      expiry_date: 0,
      isValid: false
    };
    expect(action).to.deep.equal({
      type: "SET_COUPON",
      coupon: coupon
    });
  });

  it('should get coupon action object with provided value', () => {
      const coupon = {
          name: "HALFOFF",
          type: "PERCENTAGE_DISCOUNT",
          amount: 50,
          expiry_date: 0,
          isValid: true,
      }
      const action = setCoupon(coupon);
      expect(action).to.deep.equal({
          type:"SET_COUPON",
          coupon: coupon
      })
  })
});
