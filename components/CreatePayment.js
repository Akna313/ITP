import React, { useState } from "react";
import axios from "axios";
import "./CreatePayment.css";

function CreatePayment() {
	
	const [amount, setAmount] = useState("");
	const [date, setDate] = useState("");
	const [bank, setBank] = useState("");
	const [branch, setBranch] = useState("");
	const [remark, setRemark] = useState("");
	const [errors, setErrors] = useState({});
	
	const validateInputs = () => {
		const errors = {};
		
		if (!amount.trim()) {
			errors.amount = "Amount is required";
		} else if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
			errors.amount = "Amount must be a valid number with up to 2 decimal places";
		}
		
		if (!date.trim()) {
			errors.date = "Date is required";
		} else if (!/^\d{1,2}\ \d{1,2}\ \d{4}$/.test(date)) {
			errors.date = "Date must be in the format dd/mm/yyyy";
		}
		
		if (!bank.trim()) {
			errors.bank = "Bank is required";
		}
		
		if (!branch.trim()) {
			errors.branch = "Branch is required";
		}
		
		if (!remark.trim()) {
			errors.remark = "Remark is required";
		}
		
		setErrors(errors);
		return Object.keys(errors).length === 0;
	};
	
	const sendData = (e) => {
		e.preventDefault();
		if (validateInputs()) {
			const newPayment = { amount, date, bank, branch, remark };
			
			axios.post("http://localhost:8070/payment/add", newPayment)
			.then(() => {
				alert("Payment Success");
				setAmount("");
				setDate("");
				setBank("");
				setBranch("");
				setRemark("");
				setErrors({});
			})
			.catch((err) => {
				alert(err.response?.data?.error || "An error occurred");
			});
		}
	};
	
	return (
		<div className="container">
		<form onSubmit={sendData} className="payment-form">
		<div className="form-group">
		<label htmlFor="amount" className="label">Amount</label>
		<input
		type="number"
		className="form-control"
		id="amount"
		placeholder="Amount"
		value={amount}
		onChange={(e) => setAmount(e.target.value)}
		/>
		{errors.amount && <div className="text-danger">{errors.amount}</div>}
		</div>
		<div className="form-group">
		<label htmlFor="date" className="label">Date (dd/mm/yyyy)</label>
		<input
		type="text"
		className="form-control"
		id="date"
		placeholder="Date"
		value={date}
		onChange={(e) => setDate(e.target.value)}
		/>
		{errors.date && <div className="text-danger">{errors.date}</div>}
		</div>
		<div className="form-group">
		<label htmlFor="bank" className="label">Bank</label>
		<input
		type="text"
		className="form-control"
		id="bank"
		placeholder="Bank"
		value={bank}
		onChange={(e) => setBank(e.target.value)}
		/>
		{errors.bank && <div className="text-danger">{errors.bank}</div>}
		</div>
		<div className="form-group">
		<label htmlFor="branch" className="label">Branch</label>
		<input
		type="text"
		className="form-control"
		id="branch"
		placeholder="Branch"
		value={branch}
		onChange={(e) => setBranch(e.target.value)}
		/>
		{errors.branch && <div className="text-danger">{errors.branch}</div>}
		</div>
		<div className="form-group">
		<label htmlFor="remark" className="label">Remark</label>
		<input
		type="text"
		className="form-control"
		id="remark"
		placeholder="Remark"
		value={remark}
		onChange={(e) => setRemark(e.target.value)}
		/>
		{errors.remark && <div className="text-danger">{errors.remark}</div>}
		</div>
		<button type="submit" className="btn btn-primary">Submit</button>
		</form>
		</div>
	);
}

export default CreatePayment;
