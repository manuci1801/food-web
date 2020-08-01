import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Card, Divider, Button, Modal, Input } from 'antd'
import Cards from 'react-credit-cards';

import { GlobalContext } from '../../context/GlobalContext'

import { formatPrice } from '../../utils'

import MainMenu from '../menu/MainMenu'

import './styles.css'

const Wallet = () => {
  const { getCardsByUser, newCard, cards, user, depositIntoBalance } = useContext(GlobalContext)

  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [cvc, setCvc] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [focus, setFocus] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [numberDeposit, setNumberDeposit] = useState('')
  const [cardSelected, setCardSelected] = useState('')

  useEffect(() => {
    getCardsByUser()
  }, [])

  const showModal = () => {
    setVisible(true)
  }

  const showModal1 = () => {
    setVisible(true)
  }

  const handleCancel = e => {
    setVisible(false)
    setName('')
    setNumber('')
    setMonth('')
    setYear('')
    setCvc('')
  }

  const handleCancel1 = e => {
    setVisible1(false)
    setCardSelected('')
    setNumberDeposit('')
  }

  const handleNewCard = () => {
    if (name && number && month && year && cvc) {
      newCard({ name, cardNumber: number, date: `${month}/${year}`, cvc })
      setVisible(false)
      setName('')
      setNumber('')
      setMonth('')
      setYear('')
      setCvc('')
    }
    else
      alert('Please fill all fields')
  }

  const handleDeposit = () => {
    if (numberDeposit && cardSelected) {
      depositIntoBalance({ cardId: cardSelected, amount: numberDeposit })
      setVisible1(false)
      setCardSelected('')
      setNumberDeposit('')
    }
    else
      alert('Please fill number deposit and select one card')
  }

  return (
    <>
      <div className='grid wide  empty_cart-content'>
        <Row style={{ minHeight: 'calc(100vh - 164px)', padding: '16px' }}>
          <Col span={6}>
            <MainMenu />
          </Col>
          <Col span={18}>
            <Divider orientation="left">MY WALLET</Divider>
            <div style={{ padding: '0 16px' }}>
              <Row justify='space-between' style={{ padding: '0 8px 8px', borderBottom: '1px solid #999' }}>
                <Col style={{ fontSize: '16px', fontWeight: '500' }}>Current Balance</Col>
                <Col style={{ fontSize: '20px', fontWeight: '700' }}><Button type='primary' onClick={() => setVisible1(true)}>Deposit</Button>{' '}{user ? formatPrice(parseInt(user.balance)) : ''}</Col>
              </Row>
              <Button onClick={() => showModal()} type='primary' style={{ margin: '8px 8px 0' }}>New Card</Button>
              <Row >
                {cards ? cards.map(e => <Col span={12} style={{ padding: '8px 8px' }} >
                  <Card className='card-item' style={{ width: "100%" }}>
                    <Row justify='space-between' align='center'>
                      <Col>
                        <div className='card-item_img visa'></div>
                      </Col>
                      <Col>
                        <div className='card-item_number'>{e.cardNumber}</div>
                        <div className='card-item_date'>{e.date}</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>) : ''}

                {/* <Col span={12} style={{ padding: '8px 8px' }} >
                  <Card className='card-item' style={{ width: "100%" }}>
                    <Row justify='space-between' align='center'>
                      <Col>
                        <div className='card-item_img amex'></div>
                      </Col>
                      <Col>
                        <div className='card-item_number'>**** **** **** 2172</div>
                        <div className='card-item_date'>12/21</div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={12} style={{ padding: '8px 8px' }} >
                  <Card className='card-item' style={{ width: "100%" }}>
                    <Row justify='space-between' align='center'>
                      <Col>
                        <div className='card-item_img master-card'></div>
                      </Col>
                      <Col>
                        <div className='card-item_number'>**** **** **** 2172</div>
                        <div className='card-item_date'>12/21</div>
                      </Col>
                    </Row>
                  </Card>
                </Col> */}
              </Row>
            </div>
          </Col>
        </Row>

        <Modal
          title="Add New Card"
          visible={visible}
          onOk={handleNewCard}
          onCancel={handleCancel}
        >
          <Cards
            cvc={cvc}
            expiry={`${month}/${year}`}
            focused={focus}
            name={name}
            number={number}
            acceptedCards={['visa', 'mastercard']}
          />
          <div class="form-body">
            <input name='name' value={name} onChange={e => setName(e.target.value)} type="text" class="card-number" placeholder="Name" />

            <input name='number' value={number} onChange={e => setNumber(e.target.value)} type="tel" class="card-number" placeholder="Card Number" maxLength={16} />


            <div class="date-field">
              <div class="month">
                <select value={month} name="month" onChange={e => setMonth(e.target.value)}>
                  <option value="">Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div class="year">
                <select value={year} name="year" onChange={e => setYear(e.target.value)} >
                  <option value="">Year</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>

            <div class="card-verification">
              <div class="cvv-input">
                <input value={cvc} name='cvc' onChange={e => setCvc(e.target.value)} type="tel" placeholder="CVV" maxLength={4} />
              </div>
              <div class="cvv-details">
                <p>3 or 4 digits usually found <br /> on the signature strip</p>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          title="Deposit Into My Balance"
          visible={visible1}
          onOk={handleDeposit}
          onCancel={handleCancel1}
        >
          <Input onChange={e => setNumberDeposit(e.target.value)} placeholder="Number to deposit" value={numberDeposit} />
          <select value={cardSelected} onChange={e => setCardSelected(e.target.value)} name="cards" >
            <option value="">Select card to deposit</option>
            {cards.map(e => <option value={e._id}>{e.cardNumber} - {e.date}</option>)}
          </select>
        </Modal>
      </div>
    </>
  )
}

export default Wallet
