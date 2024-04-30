import React, { Component } from 'react';
import CreatePayment from './components/CreatePayment';
import Home from './components/Home';
import NavBar from './components/NavBar';
import PaymentDetails from './components/PaymentDetails';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import EditPayment from './components/EditPayment';


export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
      
          <Route path="/" element={<Home />} exact />
          <Route path="/add" element={<CreatePayment />} exact />
          <Route path="/update/:id" element={<EditPayment/>} exact />
          <Route path="/post/:id" element={<PaymentDetails />} exact />

        </Routes>
      </BrowserRouter>
    );
  }
}
