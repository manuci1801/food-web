import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Row, Col, Radio, Button } from 'antd'
import { PlusCircleOutlined, MinusOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'

import { GlobalContext } from '../../context/GlobalContext'

import './styles.css'

const Cart = () => {
  const { user, isAuthenticated, products, combos, cart, addToCart, minusFromCart, deleteFromCart, checkout } = useContext(GlobalContext)

  const [paymentMethod, setPaymentMethod] = useState('ship-cod')

  const getProductById = id => {
    if (products.length > 0) {
      return products.find(e => e._id == id)
    }
  }

  const getComboById = id => {
    if (combos.length > 0)
      return combos.find(e => e._id == id)
  }

  const getTotal = () => {
    if (combos.length > 0 && products.length > 0 && cart.length > 0) {
      return cart.reduce((acc, e) => {
        let i
        if (e.type == 'product')
          i = getProductById(e.id)
        else if (e.type == 'combo')
          i = getComboById(e.id)
        return acc + i.price * e.count
      }, 0)
    }
  }

  const handleAddToCart = (id, type) => {
    addToCart({ id, type })
  }

  const handleMinusFromCart = (id, type) => {
    minusFromCart({ id, type })
  }

  const handleDeleteFromCart = id => {
    deleteFromCart({ id })
  }

  const handleProcessPayment = () => {
    if (!isAuthenticated) {
      toast.warn('Please login to do it!', {
        position: "top-right",
      });
      setTimeout(() => {
        window.location.href = '/login'
      }, 5000)
    } else {
      let total = getTotal()
      if (paymentMethod == 'balance' && total > user.balance)
        toast.warn('Your balance is not enough!', {
          position: "top-right",
        });
      else
        checkout({ cart, total, paymentMethod })
    }
  }

  return (
    <>
      <div>
        <div className="grid wide  empty_cart-content">
          <div className="col l-12 m-12 c-12">
            <div className="row">
              <h2 className="empty_cart-heading">YOUR CART</h2>
              <div className="empty_cart-container">
                {cart.length > 0 ? <Row style={{ width: '100%' }}>
                  <Col span={16}>
                    <ul style={{ listStyle: 'none', margin: '0 8px 0 0' }}>
                      {cart ? cart.map(e => {
                        return e.type === 'product' ? <li style={{ marginBottom: '16px', padding: '16px 30px', border: '1px solid #999', borderRadius: '6px' }}>
                          <div className='cart_top'>
                            <div className='cart_header'>
                              <h3 style={{ margin: 0 }}>{getProductById(e.id) ? getProductById(e.id).name : ' '}</h3>
                              <CloseCircleOutlined onClick={() => handleDeleteFromCart(e.id)} style={{ fontSize: '16px', cursor: 'pointer' }} />
                            </div>
                          </div>
                          <div className='cart_footer'>
                            <div>
                              <MinusOutlined onClick={() => handleMinusFromCart(e.id, 'product')} style={{ fontSize: '20px', cursor: 'pointer' }} />
                              <span style={{ fontSize: '20px', margin: '0 6px' }}>{e.count}</span>
                              <PlusCircleOutlined onClick={() => handleAddToCart(e.id, 'product')} style={{ fontSize: '20px', cursor: 'pointer' }} />
                            </div>
                            <h1 style={{ margin: 0, fontWeight: '500' }}>{getProductById(e.id) ? getProductById(e.id).price * e.count : ' '}$</h1>
                          </div>
                        </li> : e.type == 'combo' ? <>
                          <li style={{ marginBottom: '16px', padding: '16px 30px', border: '1px solid #999', borderRadius: '6px' }}>
                            <div className='cart_top'>
                              <div className='cart_header'>
                                <h3 style={{ margin: 0 }}>{getComboById(e.id) ? getComboById(e.id).name : ' '}</h3>
                                <CloseCircleOutlined onClick={() => handleDeleteFromCart(e.id)} style={{ fontSize: '16px', cursor: 'pointer' }} />
                              </div>
                              <div className="cart_description">
                                {getComboById(e.id) && getComboById(e.id).products.map(i => <div>{`${i.count} x ${i.productName}`}</div>)}
                              </div>
                            </div>
                            <div className='cart_footer'>
                              <div>
                                <MinusOutlined onClick={() => handleMinusFromCart(e.id, 'combo')} style={{ fontSize: '20px', cursor: 'pointer' }} />
                                <span style={{ fontSize: '20px', margin: '0 6px' }}>{e.count}</span>
                                <PlusCircleOutlined onClick={() => handleAddToCart(e.id, 'combo')} style={{ fontSize: '20px', cursor: 'pointer' }} />
                              </div>
                              <h1 style={{ margin: 0, fontWeight: '500' }}>{getComboById(e.id) ? getComboById(e.id).price * e.count : ' '}$</h1>
                            </div>
                          </li>
                        </> : ''
                      }) : ''}
                    </ul>
                  </Col>
                  <Col span={8}>
                    <div style={{ padding: '16px 24px' }} >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '20px', fontSize: '16px', fontWeight: 1000 }}>
                        <div>{cart ? `${cart.length} items` : ''}</div>

                        <div>{products && combos && cart && getTotal()}</div>
                      </div>
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                        , paddingBottom: '20px', fontSize: '16px', fontWeight: 1000
                      }}>
                        <div>SUBTOTAL</div>
                        <div style={{ fontSize: '32px', color: '#e4002b' }}>{products && combos && cart && getTotal()}</div>
                      </div>
                      <div style={{ fontSize: 16, margin: '0 0 8px' }}>
                        <div>Select payment method</div>
                        <Radio.Group onChange={e => setPaymentMethod(e.target.value)} value={paymentMethod}>
                          <Radio checked value={'ship-cod'}>Ship Cod</Radio>
                          <Radio value={'balance'}>Balance</Radio>
                        </Radio.Group>
                      </div>
                      <Button onClick={() => handleProcessPayment()} style={{ backgroundColor: '#e4002b', color: '#fff', width: '100%', borderRadius: '6px' }}>PROCEED TO PAYMENT</Button>
                    </div>
                  </Col>
                </Row> : <>
                    <img src="https://kfcvietnam.com.vn/templates/images/cart_empty_new.png" alt="" className="empty_cart-img" />
                    <div className="empty_cart-description">
                      <p className="empty_cart-title">
                        Your Cart is empty?
                                </p>
                      <p className="empty_cart-text">
                        Making order to enjoy special secret recipes.
                                </p>
                    </div>
                    <div className="empty_cart-btn">
                      <Link to="/" className="empty_cart-btn-link">ORDER NOW</Link>
                    </div>
                  </>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Cart
