import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import { GlobalProvider } from './context/GlobalContext'

import Header from './components/layouts/Header'
import Admin from './components/admin/Admin'
import AdminLogin from './components/admin/Login'
import Combos from './components/home/Combos'
import Products from './components/home/Products'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Cart from './components/cart/Cart'
import Transactions from './components/transaction/Transactions'
import Profile from './components/profile/Profile'
import Wallet from './components/wallet/Wallet'

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-credit-cards/es/styles-compiled.css';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to='/combos' />
          </Route>
          <Route exact path="/combos">
            <Combos />
          </Route>
          <Route exact path="/products">
            <Products />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/transactions">
            <Transactions />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/wallet">
            <Wallet />
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/admin/login">
            <AdminLogin />
          </Route>
        </Switch>
        <ToastContainer />
      </Router>
    </GlobalProvider>
  );
}

export default App;
