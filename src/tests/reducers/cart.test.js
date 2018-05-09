import cartReducer from '../../reducers/cart';
import getProductsList from '../__mocks__/products';
const productList = getProductsList();

test('should setup default cart values', () => {
    const state = cartReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        products:[]
    });
})

test('should add a product to product[]', () => {
    const prevState = {
        products:[]
    }
    const product = productList[0]
    const state = cartReducer(prevState, { type: 'ADD_TO_CART',product:{...product}});
    expect(state).toEqual({
        products:[{
            ...product
        }]
    });
})

test('should add a product to product[] (products exist)', () => {
    const prevState = {
        products:[productList[0]]
    }
    const product = productList[1]
    const state = cartReducer(prevState, { type: 'ADD_TO_CART',product:product});
    expect(state).toEqual({
        products:[...prevState.products, product
    ]
    });
})

test('should add a product to product[] (products exist same item)', () => {
    const prevState = {
        products:[productList[0]]
    }
    const product = productList[0]
    const state = cartReducer(prevState, { type: 'ADD_TO_CART',product:product});
    expect(state).toEqual({
        products:[{
            ...product,
            quantity:2
        }]
    });
})
test ('descrease quantity of product (quantity:2)', () => {
    const prevState = {
        products:[{...productList[0], quantity: 2}]
    }
    const nextState = {
        products:[{...productList[0], quantity: 1}]
    }
    const state = cartReducer(prevState, { type: 'REMOVE_FROM_CART_BY_ONE',id:productList[0].id })
    expect(state).toEqual(nextState);
})

test ('descrease quantity of product (quantity:1)', () => {
    const prevState = {
        products:[{...productList[0], quantity: 1}]
    }
    const nextState = {
        products:[]
    }
    const state = cartReducer(prevState, { type: 'REMOVE_FROM_CART_BY_ONE',id:productList[0].id })
    expect(state).toEqual(nextState);
})

test('increase quantity of product', () => {
    const prevState = {
        products:[{...productList[0], quantity: 1}]
    }
    const nextState = {
        products:[{...productList[0], quantity: 2}]
    }
    const state = cartReducer(prevState, { type: 'ADD_FROM_CART_BY_ONE', id: productList[0].id})
})