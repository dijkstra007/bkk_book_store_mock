const headerReducerDefaultState = {
  showQuickLogin: false,
  showQuickRegister: false,
  showMyAccount: false,
  showMyCart: false,

};

export default (state = headerReducerDefaultState, action) => {
  switch (action.type) {
    case "FORCE_SHOW_QUICK_LOGIN": 
    return {
      ...state,
      showQuickLogin: true
    }
    case "SHOW_QUICK_LOGIN":
      return {
        ...state,
        showQuickLogin: !state.showQuickLogin
      };
    case "CLOSE_QUICK_LOGIN":
      return {
        ...state,
        showQuickLogin: false
      };
    case "SHOW_QUICK_REGISTER":
      return {
        ...state,
        showQuickRegister: !state.showQuickRegister
      };

    case "CLOSE_QUICK_REGISTER":
      return {
        ...state,
        showQuickRegister: false
      };
    case 'SHOW_MY_ACCOUNT':
      return {
        ...state,
        showMyAccount: !state.showMyAccount,
      }
    case 'CLOSE_MY_ACCOUNT':
      return {
        ...state,
        showMyAccount: false,
      }
    case 'SHOW_MY_CART':
      return {
        ...state,
        showMyCart: !state.showMyCart,
      }
      case 'CLOSE_MY_CART':
      return {
        ...state,
        showMyCart: false,
      }
    default:
      return state;
  }
};
