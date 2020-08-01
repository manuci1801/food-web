import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'

import AppReducer from './AppReducer'
import { setAuthToken, clearToken } from '../utils'

// init state
const initState = {
  isAuthenticated: false,
  user: {},
  users: [],
  categories: [],
  products: [],
  combos: [],
  cart: [],
  transactions: [],
  allTransactions: [],
  cards: [],
  loading: true
}

// create context
export const GlobalContext = createContext(initState)

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initState)

  // actions
  async function handleErrors(err) {
    if (err.response.data.errors && err.response.data.errors.length > 0) {
      toast.warn(err.response.data.errors[0], {
        position: toast.POSITION.TOP_RIGHT
      })
    } else {
      toast.warn("ERROR!", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }
  async function register(data) {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/register', data)

      if (res.data.success) {
        toast.success("Register Success! You can login now.", {
          position: toast.POSITION.TOP_RIGHT
        })
        setTimeout(() => window.location.href = '/login', 5000)
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function login(data) {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/login', data)

      const { token } = res.data
      // set token to localStorage
      localStorage.setItem('token', token)
      // set token to auth header
      setAuthToken(token)
      // decode token
      const decoded = jwt_decode(token)
      // set current user
      setCurrentUser(decoded)

      toast.success("Login Success!", {
        position: toast.POSITION.TOP_RIGHT
      })

      if (decoded.role === 'admin') {
        window.location.href = '/admin'
      } else {
        window.location.href = '/'
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  function setCurrentUser(user) {
    dispatch({
      type: 'SET_USER',
      payload: user
    })
  }

  function logout({ isAdmin }) {
    clearToken(isAdmin)
    setAuthToken(false)
    dispatch({
      type: 'LOGOUT_USER'
    })
  }

  async function getUsers() {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/users')

      dispatch({
        type: 'GET_USERS',
        payload: res.data.data
      })
    } catch (err) {
      handleErrors(err)
    }
  }

  async function getCategories() {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/categories')

      dispatch({
        type: 'GET_CATEGORIES',
        payload: res.data.data
      })
    } catch (err) {
      handleErrors(err)
    }
  }

  async function getProducts() {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/products')

      dispatch({
        type: 'GET_PRODUCTS',
        payload: res.data.data
      })
    } catch (err) {
      handleErrors(err)
    }
  }

  async function getCombos() {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/combos')

      dispatch({
        type: 'GET_COMBOS',
        payload: res.data.data
      })
    } catch (err) {
      handleErrors(err)
    }
  }

  async function newCategory(data) {
    try {
      const res = await axios.post('http://localhost:5000/api/v1/categories', data)

      if (res.data.success) {
        dispatch({
          type: 'NEW_CATEGORY',
          payload: res.data.data
        })
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function deleteCategory(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/categories/${id}`)

      if (res.data.success) {
        toast.success("Delete Success!", {
          position: toast.POSITION.TOP_RIGHT
        })

        dispatch({
          type: 'DELETE_CATEGORY',
          payload: id
        })
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function newProduct(data) {
    try {
      console.log(data)
      let { name, category, price, image } = data

      let formData = new FormData()
      formData.append('name', name)
      formData.append('category', category)
      formData.append('price', price)
      formData.append('image', image)
      const res = await axios.post(`http://localhost:5000/api/v1/products`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (res.data.success) {
        toast.success("Add Success!", {
          position: toast.POSITION.TOP_RIGHT
        })

        dispatch({
          type: 'NEW_PRODUCT',
          payload: res.data.data
        })
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function deleteProduct(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/products/${id}`)

      if (res.data.success) {
        toast.success("Delete Success!", {
          position: toast.POSITION.TOP_RIGHT
        })

        dispatch({
          type: 'DELETE_PRODUCT',
          payload: id
        })
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function newCombo(data) {
    try {
      console.log(data)
      let { name, category, products, price, image } = data

      let formData = new FormData()
      formData.append('name', name)
      formData.append('category', category)
      formData.append('products', JSON.stringify(products))
      formData.append('price', price)
      formData.append('image', image)
      const res = await axios.post(`http://localhost:5000/api/v1/combos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (res.data.success) {
        toast.success("Add Success!", {
          position: toast.POSITION.TOP_RIGHT
        })

        dispatch({
          type: 'NEW_COMBO',
          payload: res.data.data
        })
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function deleteCombo(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/v1/combos/${id}`)

      if (res.data.success) {
        toast.success("Delete Success!", {
          position: toast.POSITION.TOP_RIGHT
        })

        dispatch({
          type: 'DELETE_COMBO',
          payload: id
        })
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  function setCurrentCart(cart) {
    if (cart) {
      dispatch({
        type: 'SET_CURRENT_CART',
        payload: cart
      })
    }
  }

  function addToCart({ id, type }) {
    toast.success('ADDED!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    let cart = JSON.parse(localStorage.getItem('cart'))

    if (cart && cart.length > 0) {
      let exist = cart.find(e => e.id == id)
      if (exist) {
        exist.count += 1
        localStorage.setItem('cart', JSON.stringify(cart))
      } else {
        cart.push({ id, type, count: 1 })
        localStorage.setItem('cart', JSON.stringify(cart))
      }

    } else {
      let e = { id, type, count: 1 }
      cart = [e]
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    setCurrentCart(cart)
  }

  function minusFromCart({ id, type }) {

    const cart = JSON.parse(localStorage.getItem('cart'))

    if (cart.length > 0) {
      let exist = cart.find(e => e.id == id)
      if (exist) {
        if (exist.count != 1) {
          exist.count -= 1
          localStorage.setItem('cart', JSON.stringify(cart))
          toast.success('MINUS!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    }

    setCurrentCart(cart)
  }

  function deleteFromCart({ id }) {
    toast.success('DELETE SUCCESS!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    let cart = JSON.parse(localStorage.getItem('cart'))

    if (cart.length > 0) {
      let cartFilter = cart.filter(e => e.id != id)
      console.log(cartFilter)
      localStorage.setItem('cart', JSON.stringify(cartFilter))
      setCurrentCart(cartFilter)
    }
  }

  function updateBalance(num) {
    dispatch({
      type: 'UPDATE_BALANCE',
      payload: num
    })
  }

  async function checkout({ cart, total, paymentMethod }) {
    try {
      const res = await axios.post(`/api/v1/transactions`, { cart, total, paymentMethod })

      if (res.data.success) {
        localStorage.removeItem('cart')
        dispatch({
          type: 'CLEAR_CART'
        })

        // update balance if checkout by balance
        if (paymentMethod === 'balance')
          await refreshToken()

        toast.success('Checkout Successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function getTransactionsByUser() {
    try {
      const res = await axios.get(`/api/v1/transactions`)

      if (res.data.success) {
        dispatch({
          type: 'GET_TRANSACTIONS_USER',
          payload: res.data.data
        })
      }
    } catch (err) {
      toast.warn('ERROR!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  async function getAllTransactionsByAdmin() {
    try {
      const res = await axios.get(`/api/v1/transactions/admin`)

      if (res.data.success) {
        dispatch({
          type: 'GET_ALL_TRANSACTIONS_ADMIN',
          payload: res.data.data
        })
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function confirmTransaction(id) {
    try {
      const res = await axios.post(`/api/v1/transactions/admin/confirm`, { id })

      if (res.data.success) {
        dispatch({
          type: 'CONFIRM_TRANSACTION',
          payload: id
        })
        toast.success('Confirm Success!', {
          position: "top-right"
        });
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function cancelTransaction(id) {
    try {
      const res = await axios.post(`/api/v1/transactions/admin/cancel`, { id })

      if (res.data.success) {
        dispatch({
          type: 'CANCEL_TRANSACTION',
          payload: id
        })
        toast.success('Cancel Success!', {
          position: "top-right"
        });
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function newCard(data) {
    try {
      const res = await axios.post(`/api/v1/cards`, data)

      if (res.data.success) {
        dispatch({
          type: 'NEW_CARD',
          payload: res.data.data
        })
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function getCardsByUser() {
    try {
      const res = await axios.get(`/api/v1/cards`)

      if (res.data.success) {
        dispatch({
          type: 'GET_CARDS',
          payload: res.data.data
        })
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function depositIntoBalance(data) {
    try {
      const res = await axios.post(`/api/v1/balances`, data)

      if (res.data.success) {
        await refreshToken()
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  async function refreshToken() {
    try {
      const res = await axios.get(`/api/v1/auth/refresh-token`)

      if (res.data.success) {
        const { token } = res.data
        // set token to localStorage
        localStorage.setItem('token', token)
        // set token to auth header
        setAuthToken(token)
        // decode token
        const decoded = jwt_decode(token)
        // set current user
        setCurrentUser(decoded)
      }
    } catch (err) {
      handleErrors(err)
    }
  }

  return (<GlobalContext.Provider value={{
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    users: state.users,
    categories: state.categories,
    products: state.products,
    combos: state.combos,
    loading: state.loading,
    cart: state.cart,
    transactions: state.transactions,
    allTransactions: state.allTransactions,
    cards: state.cards,
    register,
    login,
    setCurrentUser,
    logout,
    getUsers,
    getCategories,
    getProducts,
    getCombos,
    newCategory,
    deleteCategory,
    newProduct,
    newCombo,
    deleteProduct,
    deleteCombo,
    addToCart,
    minusFromCart,
    setCurrentCart,
    deleteFromCart,
    checkout,
    getTransactionsByUser,
    getAllTransactionsByAdmin,
    confirmTransaction,
    cancelTransaction,
    getCardsByUser,
    newCard,
    depositIntoBalance,
    refreshToken
  }}>
    {children}
  </GlobalContext.Provider>)
}