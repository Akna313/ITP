import React, { Component } from 'react';
import axios from 'axios';
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payments: [],
      searchAmount: '',
    };
  }

  componentDidMount() {
    this.retrievePayments();
  }

  retrievePayments() {
    axios
      .get(`http://localhost:8070/payment?amount=${this.state.searchAmount}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            payments: res.data.existingPayments,
          });
        }
      });
  }

  deletePayment(id) {
    axios.delete(`http://localhost:8070/payment/delete/${id}`).then((res) => {
      alert(res.data.status);
      this.retrievePayments();
    });
  }

  handleSearchChange = (event) => {
    this.setState({
      searchAmount: event.target.value,
    });
  };

  handleSearch = () => {
    this.retrievePayments();
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Search by Amount"
              value={this.state.searchAmount}
              onChange={this.handleSearchChange}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary" onClick={this.handleSearch}>
              Search
            </button>
          </div>
        </div>
        <p>All Payments</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Bank</th>
              <th scope="col">Branch</th>
              <th scope="col">Remark</th>
              
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.payments.map((payment, index) => (
              <tr key={payment._id}>
                <th scope="row">{index + 1}</th>
                <td>{payment.amount}</td>
                <td>{payment.date}</td>
                <td>{payment.bank}</td>
                <td>{payment.branch}</td>
                <td>{payment.remark}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.deletePayment(payment._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success">
          <a href="/add" style={{ textDecoration: `none`, color: `white` }}>
            Make Payment
          </a>
        </button>
      </div>
    );
  }
}