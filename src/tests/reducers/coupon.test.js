import couponReducer, { couponReducerDefaultState } from '../../reducers/coupon';

test('should setup default cart values', () => {
    const state = couponReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual(couponReducerDefaultState);
})

test('should set coupon to state ', () => {
    const coupon = {
        name:"HALFOFF",
        type:"PERCENTAGE_DISCOUNT",
        amount:50,
        expiry_date:0,
        isValid: true
        
    }
    const prevState = couponReducerDefaultState;
    const action = {
        type:'SET_COUPON',
        coupon:coupon
    }
    const nextState = coupon;
    const state = couponReducer(prevState, action)
    expect(state).toEqual(nextState);
})