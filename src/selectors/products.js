import * as _ from 'lodash';

const getVisibleProducts = (products = [], filterList = []) => {
  if (filterList.length === 0) return products;
  else {
    return products.filter(product => {
        if(filterList === ["เบส"]) {
                console.log("YES");
        }
      const matchTag = product.categories.filter(x => {
        return filterList.includes(x);
      });

      return matchTag.length !== 0;
    });
  }
};

export default getVisibleProducts;

export const getStar = (star = [0,0,0,0,0,0]) => {
  let avgStar = 0;
  for (var i = 0; i < 5; i++) {
      avgStar = avgStar+star[i];
  } 
  return avgStar/5;
  
}

export const getQueryStringToRequestProductDetailOnColor  = (id = 0, color = "") => {
  let qStr = "?id="+id.toString()+"&color="+color.substring(1,color.length);
  return qStr;
}
export const groupProductsToArrayofChunckProduct = (products, nCol, nRow) => {
  const arrayOfChunckProduct =  _.chunk( _.chunk(products, nCol), nRow )
  return arrayOfChunckProduct
}
export const getTotalPriceField = (products = []) => {

  const arrPriceAndQuantity = products.map(product => {
    const price = product.onSale ? product.salesPrice : product.regularPrice
    const priceXquantity = price * product.quantity
    return priceXquantity
  })
  const totalPrice = arrPriceAndQuantity.reduce((a,b) => a+b,0)
  return totalPrice;
 };

 