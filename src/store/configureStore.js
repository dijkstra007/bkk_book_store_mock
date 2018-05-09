import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';



export default () => {
  
  const store = createStore(
    combineReducers({
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return store;
};
