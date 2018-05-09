const closeActionList = ['CLOSE_QUICK_LOGIN','CLOSE_QUICK_REGISTER','CLOSE_MY_ACCOUNT','CLOSE_MY_CART']
export const showQuickLoginForm = () => {
  return async (dispatch) => {
    await dispatch(closeExcept('CLOSE_QUICK_LOGIN'))
    dispatch({type:'SHOW_QUICK_LOGIN'})
  }
}
export const showQuickRegisterForm = () => {
  return async (dispatch) => {
    await dispatch(closeExcept('CLOSE_QUICK_REGISTER'))
    dispatch({type:'SHOW_QUICK_REGISTER'})
  }
}
export const showMyAccount = () => {
  return async (dispatch) => {
    await dispatch(closeExcept('CLOSE_MY_ACCOUNT'))
    dispatch({type:'SHOW_MY_ACCOUNT'})
  }
}
export const showMyCart =() => {
  return async (dispatch) => {
    await dispatch(closeExcept('CLOSE_MY_CART'))
    dispatch({type:'SHOW_MY_CART'})
  }
}

export const forceShowQuickLoginForm = () => {
  return async (dispatch) => {
    await dispatch(closeAll())
    dispatch({type: 'FORCE_SHOW_QUICK_LOGIN'})
  }
}
export const closeExcept = (except) => {
  const list = closeActionList.filter( c => c!=except)
  return async (dispatch) => {
    await list.map( c => {
      dispatch({type: c})
    })
  }
}

export const closeAll = () => {
  return async (dispatch) => {
    await closeActionList.map( c => {
      dispatch({type: c})
    })
  }
}
