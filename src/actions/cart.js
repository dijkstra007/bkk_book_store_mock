import axios from "axios";
import * as API from "../constants/apiURL";

export const productDefaultObject = {
  categoryID: "",
  productID: "",
  productName: "",
  salesPrice: 0,
  regularPrice: 0,
  tag: "",
  image0: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  thumnailImage: "",
  colorList: "",
  onSale: "FALSE",
  description: "",
  shortDescription: "",
  featureOn: "",
  star: [0, 0, 0, 0, 0, 0],
  size: "",
  sku: "",
  color: "",
  colorList: []
};
export const addLocalProductsToRedux = (products = []) => {
  const tempProducts = products || []
  return async (dispatch, getState) => {
    dispatch({type:'CLEAR_MY_CART'})
    tempProducts.map(product => {
      dispatch({
        type: "ADD_TO_CART",
        product: product
      });
    });
    dispatch({
      type: "LIMIT_QUANTITY"
    });
    const user = getState().user;
    const updatedProducts = getState().myCart.products;
    try {
      await updateMyCartToServer(updatedProducts, user);
      localStorage.removeItem("mycart");
    } catch (err) {
      console.log("There was an error while add an item to cart", err);
    }
  };
};
export const addToCart = (product, quantity = 0) => {
  const _product = {
    ...productDefaultObject,
    ...product,
    createdAt: Math.round(new Date() / 1000),
    quantity: quantity
  };
  return async (dispatch, getState) => {
    dispatch({
      type: "ADD_TO_CART",
      product: {
        ..._product
      }
    });
    dispatch({
      type: "LIMIT_QUANTITY"
    });
    const user = getState().user;
    const products = getState().myCart.products;
    try {
      await updateMyCartToServer(products, user);
    } catch (err) {
      console.log("There was an error while add an item to cart", err);
    }
  };
};

export const setMyCart = (products = []) => {
  return {
    type: "SET_MY_CART",
    products: [...products]
  };
};

export const clearMyCart = () => ({
  type: "CLEAR_MY_CART"
});

export const removeFromCart = sku => {
  return async (dispatch, getState) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      sku: sku,
      user: user
    });
    dispatch({
      type: "LIMIT_QUANTITY"
    });
    const user = getState().user;
    const products = getState().myCart.products;
    try {
      await updateMyCartToServer(products, user);
    } catch (err) {
      console.log("There was an error while remove an item to cart", err);
    }
  };
};

export const addFromCartByOne = sku => {
  return async (dispatch, getState) => {
    dispatch({
      type: "ADD_FROM_CART_BY_ONE",
      sku: sku,
      user: user
    });
    dispatch({
      type: "LIMIT_QUANTITY"
    });
    const user = getState().user;
    const products = getState().myCart.products;
    try {
      await updateMyCartToServer(products, user);
    } catch (err) {
      console.log(
        "There was an error while add a quantity on item in cart",
        err
      );
    }
  };
};

export const removeFromCartByOne = (sku, user) => {
  return async (dispatch, getState) => {
    dispatch({
      type: "REMOVE_FROM_CART_BY_ONE",
      sku: sku,
      user: user
    });
    dispatch({
      type: "LIMIT_QUANTITY"
    });
    const user = getState().user;
    const products = getState().myCart.products;
    try {
      await updateMyCartToServer(products, user);
    } catch (err) {
      console.log(
        "There was an error while remove a quantity on item in cart",
        err
      );
    }
  };
};

export const getMyCartProducts = () => ({
  type: "GET_PRODUCTS"
});

export const changeColorProduct = (oldProduct, newProduct, quantity) => {
  return async (dispatch, getState) => {
    let products = getState().myCart.products;
    const oldSkuList = products.map(p => p.sku);
    if (_.includes(oldSkuList, newProduct.sku)) {
      products = products.filter(p => p.sku != oldProduct.sku);
      products = products.map(
        p =>
          p.sku == newProduct.sku
            ? { ...p, quantity: p.quantity + quantity }
            : p
      );
    } else {
      /*
      fix bug when current product quantity is 0 when select other color product will be 1
      */
      products = products.map(
        p =>
          p.sku === oldProduct.sku ? { ...newProduct, quantity: Math.max(quantity,1) } : p
      );
    }
    dispatch({
      type: "SET_MY_CART",
      products: products
    });
    dispatch({
      type: "LIMIT_QUANTITY"
    });
    const user = getState().user;
    const updatedProducts = getState().myCart.products;
    try {
      await updateMyCartToServer(updatedProducts, user);
    } catch (err) {
      console.log("There was an error while change color an item in cart", err);
    }
  };
};

export const updateMyCartToServer = (products = [], user) => {
  if (user && user.uid != "") {
    return axios({
      method: "put",
      url: API.PUT_MY_CART_ITEMS_TO_SERVER,
      headers: {
        email: user.email || ""
      },
      data: {
        products: products
      }
    });
  } else {
    localStorage.setItem("mycart", JSON.stringify(products));
  }
};
