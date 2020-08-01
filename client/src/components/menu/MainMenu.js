import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { UserOutlined, HistoryOutlined, CreditCardOutlined, LogoutOutlined, ShopOutlined } from '@ant-design/icons'

import { GlobalContext } from '../../context/GlobalContext'

const MainMenu = () => {
  const { logout } = useContext(GlobalContext)

  return (
    <>
      <Menu>
        <Menu.Item>
          <Link rel="noopener noreferrer" to="/profile">
            <UserOutlined />{' '}Account Information
                </Link>
        </Menu.Item>
        <Menu.Item>
          <Link rel="noopener noreferrer" to="/wallet">
            <CreditCardOutlined />{' '}My Wallet
                </Link>
        </Menu.Item>
        <Menu.Item>
          <Link rel="noopener noreferrer" to="/transactions">
            <HistoryOutlined />{' '}Transactions
                </Link>
        </Menu.Item>
        <Menu.Item onClick={() => logout({ isAdmin: false })} style={{ borderTop: '1px solid #333' }}>
          <LogoutOutlined />{' '}Logout
              </Menu.Item>
      </Menu>
    </>
  )
}

export default MainMenu
