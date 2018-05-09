import * as _ from 'lodash'
export const filtersReducerDefaultState = {
  activeFilters: [],
  activeHashTagFilters: [],
  activeProductType: undefined,
  activeSearchText: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_FILTER":
      return {
        ...state,
        activeFilters: _.uniq([...state.activeFilters, action.categoryID])
      };
    case "REMOVE_FILTER":
      return {
        ...state,
        activeFilters: state.activeFilters.filter(id => {
          return id !== action.categoryID;
        })
      };
    case "SET_FILER":
      return {
        ...state,
        activeFilters: _.uniq(action.idList)
      };
    case "SET_PRODUCT_TYPE_FILTER":
      return {
        ...state,
        activeProductType: action.productType
      };
    case "TOGGLE_PRODUCT_TYPE_FILTER":
      return {
        ...state,
        activeProductType:
          state.activeProductType === action.productType
            ? undefined
            : action.productType
      };
    case "RESET_FILTERS":
      return {
        ...filtersReducerDefaultState
      };
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        activeSearchText: action.text
      }
    default:
      return state;
  }
};

export default filtersReducer;
