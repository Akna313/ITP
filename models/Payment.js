const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
    amount : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    bank : {
        type : String,
        required : true
    },
    branch : {
        type : String,
        required : true
    },
    remark : {
        type : String,
        required : true
    }})

const Payment = mongoose.model("Payment",paymentSchema);

module.exports = Payment;