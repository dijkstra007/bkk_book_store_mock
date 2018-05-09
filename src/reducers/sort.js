export const sortReducerDefaultState ={
  sortBy: 'createdAt',
  order: 'DESC'
}

const sortReducer = (state = sortReducerDefaultState, action) => {
  switch (action.type) {
      case 'SORT_PRODUCTS_BY_PRICE':
          return {
              sortBy: 'price',
              order: action.order
          }
      case 'SORT_PRODUCTS_BY_CREATE_AT':
          return {
            sortBy: 'createdAt',
            order: action.order
        }
      case 'SORT_PRODUCTS_BY_BEST_SELLER': 
          return {
            sortBy: 'soldItems',
            order: action.order
        }
      default:
          return state;
  }
}

export default sortReducer;