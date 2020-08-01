export default (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    }
    case 'GET_USERS': {
      return {
        ...state,
        users: action.payload
      }
    }
    case 'GET_CATEGORIES': {
      return {
        ...state,
        categories: action.payload
      }
    }
    case 'GET_PRODUCTS': {
      return {
        ...state,
        products: action.payload
      }
    }
    case 'GET_COMBOS': {
      return {
        ...state,
        combos: action.payload
      }
    }
    case 'NEW_CATEGORY': {
      return {
        ...state,
        categories: [...state.categories, action.payload]
      }
    }
    case 'DELETE_CATEGORY': {
      return {
        ...state,
        categories: state.categories.filter(e => e._id !== action.payload)
      }
    }
    case 'NEW_PRODUCT': {
      return {
        ...state,
        products: [...state.products, action.payload]
      }
    }
    case 'DELETE_PRODUCT': {
      return {
        ...state,
        products: state.products.filter(e => e._id !== action.payload)
      }
    }
    case 'NEW_COMBO': {
      return {
        ...state,
        combos: [...state.combos, action.payload]
      }
    }
    case 'DELETE_COMBOS': {
      return {
        ...state,
        combos: state.combos.filter(e => e._id !== action.payload)
      }
    }
    case 'SET_CURRENT_CART': {
      return {
        ...state,
        cart: action.payload
      }
    }
    case 'UPDATE_BALANCE': {
      state.user.balance += action.payload
      return {
        ...state,
        user: state.user
      }
    }
    case 'CLEAR_CART': {
      return {
        ...state,
        cart: []
      }
    }
    case 'GET_TRANSACTIONS_USER': {
      return {
        ...state,
        transactions: action.payload
      }
    }
    case 'GET_ALL_TRANSACTIONS_ADMIN': {
      return {
        ...state,
        allTransactions: action.payload
      }
    }
    case 'CONFIRM_TRANSACTION': {
      let transaction = state.allTransactions.find(e => e._id == action.payload)
      transaction.status = 'success'
      return {
        ...state,
        allTransactions: state.allTransactions
      }
    }
    case 'CANCEL_TRANSACTION': {
      let transaction = state.allTransactions.find(e => e._id == action.payload)
      transaction.status = 'cancelled'
      return {
        ...state,
        allTransactions: state.allTransactions
      }
    }
    case 'GET_CARDS': {
      return {
        ...state,
        cards: action.payload
      }
    }
    case 'NEW_CARD': {
      return {
        ...state,
        cards: [...state.cards, action.payload]
      }
    }
    default:
      return state
  }
}