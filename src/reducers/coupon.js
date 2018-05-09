export const couponReducerDefaultState = {
    name: "",
    type: "",
    amount: 0,
    ok: false,
    message: "",
};


const couponReducer = (state = couponReducerDefaultState, action) => {
    switch(action.type) {
        
        case 'SET_COUPON': 
            const coupon = action.coupon
            return {
                ...state,
                ...coupon
            }
        default:
            return state;
    }
}

export default couponReducer;



