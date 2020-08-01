import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Divider } from 'antd'

import { GlobalContext } from '../../context/GlobalContext'

import { formatDate } from '../../utils'

import MainMenu from '../menu/MainMenu'

import './styles.css'

const Transactions = () => {
  const { getTransactionsByUser, transactions } = useContext(GlobalContext)

  useEffect(() => {
    getTransactionsByUser()
  }, [])

  return (
    <>
      <div className='grid wide empty_cart-content'>
        <Row style={{ minHeight: 'calc(100vh - 164px)', padding: '16px' }}>
          <Col span={6}>
            <MainMenu />
          </Col>
          <Col span={18}>
            <Divider orientation="left">TRANSACTIONS HISTORY</Divider>
            <Row>
              {transactions ? transactions.map(e => <Col span={8} xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className="transaction_card">
                  <Row align='start' justify=''><div>{formatDate(e.createdAt)}</div></Row>
                  <Row align='start' justify='space-between'>
                    <div><strong className={e.status == 'in-process' ? 'text-process' : e.status == 'success' ? 'text-success' : 'text-danger'}>{e.status.charAt(0).toUpperCase() + e.status.slice(1)}</strong></div>
                    <div><span className="text-body">#{e.createdAt}</span></div>
                  </Row>
                  <hr />
                  <Row align='start' justify='space-between'>
                    <div><span className="transaction-count">{e.products.length + e.combos.length}</span> <strong className="text-body">items</strong></div>
                    <div>
                      <h4 className="card-price text-danger">{e.total}</h4>
                    </div>
                  </Row>
                  <hr />
                  <Row align='start' justify="start">
                    <div><img className="mr-1" src="https://kfcvietnam.com.vn/templates/images/icon_delivery.png" />{' '}{e.paymentMethod == 'balance' ? 'Cash By Balance' : 'Cash On Deliver'}</div>
                  </Row>
                </div>
              </Col>) : ''}
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Transactions
