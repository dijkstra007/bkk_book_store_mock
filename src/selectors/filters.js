const getQueryStringFromFilterList  = (filterList) => {
    let qStr = "?"
    filterList.forEach( (filter,idx) => {
        qStr = qStr.concat("filter="+filter+"&")
    })
    return qStr.substring(0,qStr.length - 1);

}

export default getQueryStringFromFilterList