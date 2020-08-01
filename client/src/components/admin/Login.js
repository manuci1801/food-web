import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Layout, Row, Col, Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { GlobalContext } from '../../context/GlobalContext'

import './styles.css'

const Login = () => {
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')

  const { login } = useContext(GlobalContext)

  let token = localStorage.getItem('token')
  let isAdmin = false
  if (token) {
    let user = jwt_decode(token)
    let { role } = user
    isAdmin = role == 'admin' ? true : false
  }

  const loginAdmin = () => {
    if (username && password) {
      login({
        email: username,
        password
      })
    }
  }

  return (
    !isAdmin ? <Layout style={{ width: '100vw', height: '100vh' }}>
      <Row>
        <Col span={12} offset={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10%' }}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            style={{ width: '50%' }}
          // onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your admin username!' }]}
            >
              <Input
                onChange={(e) => setUsername(e.target.value)}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button onClick={loginAdmin} type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout> : <Redirect to='/admin' />
  )
}

export default Login
