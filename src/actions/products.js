import database from '../firebase/firebase';

export const setProducts = (products) => {
    return ({
        type: 'SET_PRODUCTS',
        products
    })
}
export const startGetProducts = () => {
    return (dispatch) => {
        return database.ref('products').once('value').then( (snapshot) => {
            const products = [];

            snapshot.forEach( (childSnapshot) => {
                products.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            })
            dispatch(setProducts(products));
        })
    }
}

export const getProducts = () => {
    return ({
        type: 'GET_PRODUCTS',
    })
}