import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../../context/GlobalContext'

import './styles.css'

const Register = () => {
  const { register } = useContext(GlobalContext)

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [password2, setPassword2] = useState('')
  let [phone, setPhone] = useState('')
  let [address, setAddress] = useState('')

  const registerUser = () => {
    if (name && email && password && password2 && phone && address) {
      register({
        name,
        email,
        password,
        password2,
        phone,
        address
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
              <h1 className="register_form-heading">BECOME A KFC MEMBER TODAY</h1>
              <p className="register_form-slogan">Enjoy a membership with special offers & promotions!</p>
              <div className="register_form-form">
                <div className="register_form-group">
                  <input onChange={e => setName(e.target.value)} type="text" className="register_form-input" placeholder='Name *' />
                </div>
                <div className="register_form-group">
                  <input onChange={e => setEmail(e.target.value)} type="text" className="register_form-input" placeholder='Email *' />
                </div>
                <div className="register_form-group">
                  <input onChange={e => setPassword(e.target.value)} type="password" className="register_form-input" placeholder='Password *' />
                  <i className="fas fa-eye register_form-input-show-password"></i>
                </div>
                <div className="register_form-group">
                  <input onChange={e => setPassword2(e.target.value)} type="password" className="register_form-input" placeholder='Password Confirm *' />
                  <i className="fas fa-eye register_form-input-show-password"></i>
                </div>
                <div className="register_form-group">
                  <input onChange={e => setPhone(e.target.value)} type="text" className="register_form-input" placeholder='Phone *' />
                </div>
                <div className="register_form-group">
                  <input onChange={e => setAddress(e.target.value)} type="text" className="register_form-input" placeholder='Address *' />
                </div>

                <div className="register_form-group">
                  <div className="register_form-policy">
                    <input type="checkbox" checked={true} className="register_form-checkbox" />
                    <span className="register_form-policy-text">
                      I have read and accepted with
                                        <a href="/#" className="register_form-policy-link">Operation Policy.</a>
                    </span>
                  </div>
                </div>
                <div className="register_form-group">
                  <div className="register_form-subcribe">
                    <input type="checkbox" checked={true} className="register_form-checkbox" />
                    <span className="register_form-subcribe-text">
                      Yes, I want the latest offers! I hereby
                                    </span>
                  </div>
                </div>

                <div className="register_form-controls">
                  <button onClick={() => registerUser()} className="register_form-btn btn">REGISTER</button>
                </div>


                <div className="register_form-login">
                  <p className="register_form-login-text">Already have an account? </p>
                  <Link to='/login'><button className="register_form-login-btn btn">LOGIN NOW</button></Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
