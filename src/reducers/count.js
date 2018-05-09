const initialState = {
    count: 0
}

export const actionTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE'
}

 const countReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD:
            return Object.assign({}, state, {
                count: state.count + 1
            })
        case actionTypes.REMOVE:
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state
    }
}
export default countReducer;