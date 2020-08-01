import React, { useState, useEffect, useContext } from 'react'

import { GlobalContext } from '../../context/GlobalContext'

import { formatPrice } from '../../utils'

import Slide from './Slide'

import './styles.css'

const Combos = () => {
  const { categories, combos, addToCart } = useContext(GlobalContext)

  const [category, setCategory] = useState('')

  const addComboToCart = (id) => {
    addToCart({ id, type: 'combo' })
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
                  <span className="category_title">COMBO</span>
                  <ul className="category_list">
                    <li className="category_item">
                      <span className={category === '' ? 'category_item-link li-active' : 'category_item-link'} onClick={() => setCategory('')}>All Combos</span>
                    </li>
                    {categories ? categories.filter(e => e.type === 'combo').map(e => <li className="category_item" onClick={() => setCategory(e.name)}>
                      <span className={category === e.name ? "category_item-link li-active" : "category_item-link"}>{e.name}</span>
                    </li>) : ''}
                  </ul>
                </nav>
              </div>
              <div className="col l-9 m-9 c-12">
                <h2 className="title_heading">{category ? category : 'All Combos'}</h2>
                <div className="menu_list">
                  <div className="row">

                    {combos ? combos.filter(e => e.category.type == 'combo' && e.category.name.includes(category)).map(e => <div className="col l-4 m-6 c-12">
                      <div className="menu_list-item">
                        <span href="" className="menu_list-link"
                          style={{ backgroundImage: `url(http://localhost:5000/images\/${e.image})` }}>
                        </span>
                        <div className="menu_list-content">
                          <p className="menu_list-heading">{e.name}</p>
                          <p className="menu_list-price">{formatPrice(e.price)}$</p>
                          <div className="menu_list-description">{
                            e.products.map(i => <div>{`${i.count} x ${i.productName}`}</div>)
                          }</div>
                          <span className="menu_list-icon">
                            <i className="fas fa-angle-down"></i>
                          </span>
                          <div className="menu_list-btn-group">
                            <span onClick={() => addComboToCart(e._id)} className="menu_list-btn option">
                              <span style={{ textAlign: 'center' }} className="menu_list-btn-option">ADD</span>
                            </span>
                            <span className="menu_list-btn order">
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

export default Combos
