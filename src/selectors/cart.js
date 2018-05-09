export const getTotalPrice = (products) => {
    const arr = products.map( (product) => {
        return {
            price: product.price,
            quantity: product.quantity
        }
    })
    const totalPrice = arr.reduce((sum, val) => {
        return sum = sum + val.price*val.quantity;
    },0)
    return totalPrice
}
export const getTotalItem = (products) => {
    const arr = products.map( (product) => {
        return {
            quantity: product.quantity
        }
    })
    const totalItems = arr.reduce((sum, val) => {
        return sum = sum + val.quantity;
    },0)
    return totalItems
}
export const getDisCountPrice = (products, coupon) => {
    const totalPrice = getTotalPrice(products);
    if(coupon.ok === false) {
        return totalPrice
    }
    else if(coupon.type === "PERCENTAGE_DISCOUNT" ) {
        return totalPrice*(1-coupon.amount/100);
    } else if( coupon.type === "RAW_DISCOUNT") {
        let newPrice = totalPrice - coupon.amount
        return newPrice < 0 ? 0 : newPrice;
    } else {
        return totalPrice;
    }
}