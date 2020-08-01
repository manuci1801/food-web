import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../../context/GlobalContext'

import './styles.css'

const Login = () => {
  const { login } = useContext(GlobalContext)

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  const loginUser = () => {
    if (email && password) {
      login({
        email,
        password
      })
    } else {

    }
  }

  return (
    <>
      <div className="section_container">
        <div className="grid wide">
          <div className="register_form">
            <div className="register_form-inner">
              <h1 className="register_form-heading">LOGIN TO YOUR ACCOUNT</h1>
              <p className="register_form-slogan">Enjoy a membership with special offers & promotions!</p>
              <div className="register_form-form">

                <div className="register_form-group">
                  <input type="text" onChange={e => setEmail(e.target.value)} className="register_form-input" placeholder='Email *' />
                </div>
                <div className="register_form-group">
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="register_form-input" placeholder='Password *' />
                  <i className="fas fa-eye register_form-input-show-password"></i>
                </div>

                <div className="register_form-controls">
                  <button onClick={() => loginUser()} className="register_form-btn btn">LOGIN</button>
                </div>

                <div className="register_form-login">
                  <p className="register_form-login-text">Create new account </p>
                  <Link to='/register'><button className="register_form-login-btn btn">REGISTER NOW</button></Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
