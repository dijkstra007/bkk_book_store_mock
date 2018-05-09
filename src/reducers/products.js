const productsReducerDefaultState = {
    productList: [],
    featured_products: [],
};


const productsReducer = (state = productsReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                productList:action.products
            }
        case 'GET_PRODUCTS':
            return state;
        default:
            return state;
    }
}

export default productsReducer;
 