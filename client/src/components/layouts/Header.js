import React, { useState, useContext, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { ShopOutlined } from '@ant-design/icons'
import { Dropdown, Button } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import { GlobalContext } from '../../context/GlobalContext'
import { setAuthToken, clearToken } from '../../utils'

import MainMenu from '../menu/MainMenu'

import './styles.css'
import './base.css'
import './responsive.css'
import './grid.css'

const Header = () => {
  const { setCurrentUser, user, isAuthenticated, getCategories, getProducts, getCombos, setCurrentCart } = useContext(GlobalContext)

  const [currentLink, setCurrentLink] = useState('')

  let location = useLocation()

  const checkPath = () => {
    if (location.pathname.includes('combos'))
      setCurrentLink('combos')
    else if (location.pathname.includes('products'))
      setCurrentLink('products')
    else
      setCurrentLink('')
  }

  let token = localStorage.getItem('token')
  let isAdmin = false
  if (token) {
    let user = jwt_decode(token)
    let { role } = user
    isAdmin = role == 'admin' ? true : false
  }

  if (location.pathname.includes('admin/login')) {
    isAdmin = true
  }

  const checkToken = () => {
    let token = localStorage.getItem('token')
    let cart = localStorage.getItem('cart')
    if (cart) {
      setCurrentCart(JSON.parse(cart))
    }
    // check for token
    if (token) {
      // set auth token to header
      setAuthToken(token)
      // decode token
      const decoded = jwt_decode(token)
      // set current user
      setCurrentUser(decoded)
      if (decoded.role === 'admin') {
        if (!location.pathname.includes('admin')) {
          window.location.href = '/admin'
        }
      }


      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        clearToken()
        setAuthToken(false)
      }
    }
  }

  useEffect(() => {
    checkToken()
    getCategories()
    getProducts()
    getCombos()
  }, [])

  useEffect(() => {
    checkPath()
  }, [location.pathname])

  const menu = (
    <MainMenu />
  );


  return (
    !isAdmin ? <>
      <header className="header">
        <div className="background_img"></div>
        <div className="grid wide menu">
          <nav className="topbar_menu hide-on-mobile">
            <ul className="topbar_menu-list">
              <li className="topbar_menu-item">
                <Link to="/" className="topbar_menu-item-link">
                  <img className="topbar_menu-item-logo hide-on-mobile"
                    src="https://vnnic.vn/sites/default/files/pictures/Logo%20VNNIC%20Final_VNNIC%20LOGO%201.jpg" alt="logo-pc" />
                </Link>
              </li>
              <li className="topbar_menu-item">
                {!isAuthenticated ? <Link style={{ fontSize: '18px', fontWeight: 700 }} to='/login'>Login</Link> : <Dropdown overlay={menu} placement="bottomRight" arrow>
                  <Button>{user.name}</Button>
                </Dropdown>}
              </li>
            </ul>
          </nav>

          <nav className="navbar_menu">
            <ul className="navbar_menu-list">
              <li className="navbar_menu-item">
                <Link to="/combos" className={currentLink === 'combos' ? 'navbar_menu-item-link active' : 'navbar_menu-item-link'}>COMBO</Link>
              </li>
              <li className="navbar_menu-item">
                <Link to="/products" className={currentLink === 'products' ? 'navbar_menu-item-link active' : 'navbar_menu-item-link'}>A LA CARTE</Link>
              </li>

            </ul>
            <Link to="/cart" className="navbar_menu-cart" style={{ border: '1px solid #333' }}>
              <div className="navbar_menu-cart-text"><ShopOutlined />{' '}CART</div>
            </Link>
          </nav>
        </div>
      </header>
    </> : ''
  )
}

export default Header
