export const sortByPrice = (order = "DESC") => {
  return {
    type: "SORT_PRODUCTS_BY_PRICE",
    order: order
  }
}

export const sortByCreatedAt = (order = "DESC") => {
  return {
    type: "SORT_PRODUCTS_BY_CREATE_AT",
    order: order
  }
}

export const sortByBestSeller = (order = "DESC") => {
  return {
    type: "SORT_PRODUCTS_BY_BEST_SELLER",
    order: order
  }
}
