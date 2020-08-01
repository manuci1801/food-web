import React, { useState, useEffect, useContext } from 'react'

import { GlobalContext } from '../../context/GlobalContext'

import { formatPrice } from '../../utils'

import Slide from './Slide'

import './styles.css'

const Products = () => {
  const { categories, products, addToCart } = useContext(GlobalContext)

  const [category, setCategory] = useState('')

  const addProductToCart = id => {
    addToCart({ id, type: 'product' })
  }

  return (
    <>
      <div className="slideshow">
        <div className="grid wide">
          <div className="slideshow_container l-12 m-12 c-12">
            <Slide />
          </div>
        </div>
      </div>
      <div className="web_container">
        <div className="grid wide">
          <div className="web_content">
            <div className="row">
              <div className="col l-3 m-3 c-12">
                <nav className="category">
                  <span className="category_title">PRODUCT</span>
                  <ul className="category_list">
                    <li className="category_item">
                      <span className={category === '' ? 'category_item-link li-active' : 'category_item-link'} onClick={() => setCategory('')}>All Products</span>
                    </li>
                    {categories ? categories.filter(e => e.type === 'product').map(e => <li className="category_item" onClick={() => setCategory(e.name)}>
                      <span className={category === e.name ? "category_item-link li-active" : "category_item-link"}>{e.name}</span>
                    </li>) : ''}
                  </ul>
                </nav>
              </div>
              <div className="col l-9 m-9 c-12">
                <h2 className="title_heading">{category ? category : 'All Products'}</h2>
                <div className="menu_list">
                  <div className="row">

                    {products ? products.filter(e => e.category.type == 'product' && e.category.name.includes(category)).map(e => <div className="col l-4 m-9 c-12">
                      <div className="menu_list-item">
                        <span href="" className="menu_list-link"
                          style={{ backgroundImage: `url(http://localhost:5000/images\/${e.image})` }}>
                        </span>
                        <div className="menu_list-content">
                          <p className="menu_list-heading">{e.name}</p>
                          <p className="menu_list-price">{formatPrice(e.price)}$</p>
                          <span className="menu_list-icon">
                            <i className="fas fa-angle-down"></i>
                          </span>
                          <div className="menu_list-btn-group">
                            <span onClick={() => addProductToCart(e._id)} className="menu_list-btn option">
                              <span style={{ textAlign: 'center' }} className="menu_list-btn-option">ADD</span>
                            </span>
                            <span href="" className="menu_list-btn order">
                              <span style={{ textAlign: 'center' }} className="menu_list-btn-order">ORDER</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>) : ''}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products
