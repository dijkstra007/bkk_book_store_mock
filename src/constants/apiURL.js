const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === "dev" || NODE_ENV === "development";
// export const HOME = isDev?`http://localhost:8080`:`http://52.77.203.48:8080`;
// export const HOMEMOCK = isDev? `http://localhost:8080/mock`:`http://52.77.203.48:8080/mock`;
// export const HOME = `http://localhost:${PORT}`;
// export const HOMEMOCK = `http://localhost:${PORT}/mock`;
// export const HOME = getHomeURL(process.env.NODE_ENV);
// console.log("API URL",HOME)
// export const HOMEMOCK = HOME + '/mock';
// export const HOME = `http://52.77.203.48:8080`;
// export const HOMEMOCK = `http://52.77.203.48:8080`;
export const HOME = `http://localhost:8080`;
export const HOMEMOCK = `http://localhost:8080/mock`;
export const GET_CATEGORIES = HOME + "/categories";
export const GET_NEW_PRODUCTS = HOMEMOCK + "/new_products";
export const GET_FILTERED_PRODUCTS = HOMEMOCK + "/testFilterProduct";
export const GET_MOCK_PRODUCT_DETAIL = HOMEMOCK + "/mockProductDetail";
export const GET_PRODUCT_OTHER_COLOR = HOMEMOCK + "/requestProductOtherColor";


// me
// export const GET_MY_CART_ITEMS = HOMEMOCK+"/myCart"
export const GET_MY_CART_ITEMS = HOME + "/me/cart";
export const PUT_MY_CART_ITEMS_TO_SERVER = HOME + "/me/cart/update";
export const PUT_ADDRESS_LIST_TO_SERVER = HOME + "/me/addressList/update";
export const GET_ADDRESS_LIST_FROM_SERVER = HOME + "/me/addressList";

export const POST_ORDER_TO_SERVER = HOME + "/orders/add";
export const GET_ORDERS = HOME + "/orders";
export const GET_COUPONS = HOME + "/coupons";
export const PUT_SLIP_TO_SERVER = HOME + "/orders/addSlip";

//ME
export const PUT_USER_INFO_TO_SERVER = HOME + "/me/updateinfo";
export const UPDATE_NAME = HOME + "/me/updateinfo";
export const GET_PURCHASE_HISTORY = HOME + "/me/purchaseHistory";

//USER
export const GET_A_USER_EMAIL = HOME + "/users";
export const CREATE_USER_INFO_TO_DB = HOME + "/users";
export const SAVE_PASSWORD_AND_HASH_TO_DB =
  HOME + "/users/saveAndHashPasswordToDB";

//ORDER
export const GET_SUMMARY_PRICE = HOME + "/orders/summary/price"

//products
export const GET_PRODUCTS = HOME + "/products";
export const GET_A_PRODUCT_BY_SKU = HOME + "/products/sku";
export const GET_A_PRODUCT_BY_COLOR = HOME + "/products/color";
export const GET_COLORLIST_FROM_PRODUCT = HOME + "/products/colorList";

//coupons
export const GET_COUPON = HOME + "/coupons";
export const GET_ALL_COUPON = HOME + "/coupons/all";
export const CHECK_A_COUPON = HOME + "/coupons/check";
export const CREATE_COUPON = HOME + "/coupons/create";
export const EDIT_COUPON = HOME + "/coupons/edit";
export const DELETE_COUPON = HOME + "/coupons/delete";

//payment
export const GET_PAYMENT_URL = HOME + "/payment/redirectURL";
export const REDIRECT_TO_FAIL_PAGE = HOME + "/cats/redirectToFailPage";

function getHomeURL(env) {
  console.log("env",env);
  switch(env){
    case "beta":
      return "http://52.77.203.48:8080"
    case "production":
      return "http://52.77.203.48:8080"
    default:
      return "http://localhost:8080"
  }
}
