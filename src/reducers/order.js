const orderReducerDefaultState = {
  products: [],
  address: {},
  paymentType: "",
  carrier: "",
  coupon: ""
};

const orderReducer = (state = orderReducerDefaultState, action) => {
  let nextState = state;
  switch (action.type) {
    case "ORDER_SET_ADDRESS":
      nextState = {
        ...state,
        address: action.address
      };
      return nextState;
    case "ORDER_SET_COUPON":
      nextState = {
        ...state,
        coupon: action.coupon
      };
      return nextState;
    case "ORDER_SET_PAYMENT_TYPE":
      nextState = {
          ...state,
          paymentType: action.paymentType
      }
      return nextState
    case "ORDER_REMOVE_COUPON":
      nextState = {
        ...state,
        address: {}
      };
      return nextState;
    case "ORDER_REMOVE_COUPON":
      nextState = {
        ...state,
        coupon: ""
      };
      return nextState;

    case "ORDER_SET_CARRIER":
      nextState = {
        ...state,
        carrier: action.carrier
      };
      return nextState;

    case "ORDER_SET_PRODUCTS":
      nextState = {
        ...state,
        products: action.products
      };
      return nextState;
    default:
      return state;
  }
};

export default orderReducer;
