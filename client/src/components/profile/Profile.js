import React, { useContext } from 'react'
import { Row, Col, Form, Input, Divider } from 'antd'

import { GlobalContext } from '../../context/GlobalContext'

import MainMenu from '../menu/MainMenu'

const Profile = () => {
  const { user } = useContext(GlobalContext)

  return (
    <>
      <div className='grid wide  empty_cart-content'>
        <Row style={{ minHeight: 'calc(100vh - 164px)', padding: '16px' }}>

          <Col span={6}>
            <MainMenu />
          </Col>
          <Col span={18}>
            <Divider orientation="left">ACCOUNT INFORMATION</Divider>
            <Row>
              <Col span={12} offset={6}>
                {user ? <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  initialValues={{ size: 'default' }}
                  size={'default'}
                >
                  <Form.Item label="Name">
                    <Input disabled value={user.name} />
                  </Form.Item>
                  <Form.Item label="Email">
                    <Input disabled value={user.email} />
                  </Form.Item>
                  <Form.Item label="Phone">
                    <Input disabled value={user.phone} />
                  </Form.Item>
                  <Form.Item label="Address">
                    <Input disabled value={user.address} />
                  </Form.Item>

                </Form> : ''}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Profile
