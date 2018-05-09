import * as API from "../constants/apiURL";
import axios from "axios";
import * as _ from 'lodash'

const cartReducerDefaultState = {
  products: []
};

const updateMyCartToServer = async (products = [], user) => {
  if (user) {
    try {
      let res = await axios ({
              method: "put",
      url: API.PUT_MY_CART_ITEMS_TO_SERVER,
      headers: {
        email: user.email || ""
      },
      data: {
        products: products
      }
      });
              // console.log("Res", res.status);
    }catch(err){
        console.log("Error", error.response.status);
        return err;
    }
  }
};

const combineProduct = (existProduct, additionalProduct) => {
  return existProduct.map(product => {
    if (product.sku === additionalProduct.sku) {
      const newQuantity = product.quantity + additionalProduct.quantity;
      return {
        ...product,
        quantity: newQuantity
      };
    } else {
      return product;
    }
  });
};
const cartReducer = (state = cartReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const isInCart =
        state.products.filter(product => {
          return product.sku === action.product.sku;
        }).length !== 0;
      const addedProducts = isInCart
        ? combineProduct(state.products, action.product)
        : [...state.products, action.product];
      return {
        ...state,
        products: addedProducts
      };
    case "REMOVE_FROM_CART":
      const removedProduct = state.products.filter(s => {
        return s.sku !== action.sku;
      });
      return {
        ...state,
        products: removedProduct
      };
    case "ADD_FROM_CART_BY_ONE":
      const addFromCartByOneState = state.products.map(product => {
        if (product.sku === action.sku) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        } else {
          return product;
        }
      });
      return {
        ...state,
        products: addFromCartByOneState
      };

    case "REMOVE_FROM_CART_BY_ONE":
      const removeFromCartByOneState = state.products
        .map(product => {
          if (product.sku === action.sku) {
            return {
              ...product,
              quantity: product.quantity - 1
            };
          } else {
            return product;
          }
        })
        .filter(product => {
          return product.quantity !== 0;
        });
      return {
        ...state,
        products: removeFromCartByOneState
      };
    case "SET_MY_CART":
      return {
        products: action.products
      };
    case "GET_PRODUCTS":
      return state;
    case "CLEAR_MY_CART":
      return cartReducerDefaultState;
    case "LIMIT_QUANTITY" : 
      return {
        ...state,
        products: state.products.map( product =>{
          if(product.quantity > 20 && product.quantity <= product.inStock) {
            return {
              ...product,
              quantity: 20
            }
          }
          else if(product.quantity <= 20 && product.quantity > product.inStock ) {
            return {
              ...product,
              quantity: product.inStock
            }
          } else {
            return product
          }
          
        })
      }
    default:
      return state;
  }
};

export default cartReducer;
