export const addFilter = (id) => {
    return  {
        type:'ADD_FILTER',
        categoryID: id
    }
}

export const addHashTagFilter = (hashtag) => {
    return {
        type: 'ADD_HASHTAG_FILTER',
        hashTag: hashTag
    }
}

export const removeHashTagFilter = (hashtag) => {
    return {
        type: 'REMOVE_HASHTAG_FILTER',
        hashTag: hashTag
    }
}

export const removeFilter = (id) => {
    return {
    type:'REMOVE_FILTER',
    categoryID: id
    }
}

export const setFilter = (idList) => {
    return {
        type: 'SET_FILTER',
        idList: idList
    }
}

export const setProductTypeFilter = (productType) => {
    return {
        type: 'SET_PRODUCT_TYPE_FILTER',
        productType: productType
    }
}

export const toggleProductTypeFilter = (productType) => {
    return {
        type: 'TOGGLE_PRODUCT_TYPE_FILTER',
        productType: productType
    }
}

export const resetFilters = () => {
    return {
        type: 'RESET_FILTERS'
    }
}

export const setSearchText = (text) => {
    return {
        type: "SET_SEARCH_TEXT",
        text: text
    }
}