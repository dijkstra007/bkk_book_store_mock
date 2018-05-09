export const actionTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
}
export const addCount = ()  => {
    return { type: actionTypes.ADD }
}

export const removeCount = () => {
    return { type: actionTypes.REMOVE }
}