import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from '../reducers/auth';
import cartReducer from '../reducers/cart';
import couponReducer from '../reducers/coupon';
import filtersReducer from '../reducers/filters';
import headerReducer from'../reducers/header'
import orderReducer from '../reducers/order';
import productsReducer from '../reducers/products';
import sortReducer from '../reducers/sort';
import userReducer from '../reducers/user';



export default () => {
  
  const store = createStore(
    combineReducers({
      auth: authReducer,
      coupon: couponReducer,
      filters: filtersReducer,
      sort: sortReducer,
      header: headerReducer,
      myCart: cartReducer,
      products: productsReducer,
      user:userReducer,
      order: orderReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
