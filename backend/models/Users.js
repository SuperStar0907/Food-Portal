const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false
  },
  role: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  mobileno: {
    type: String,
    required: false
  },
  opentime: {
    type: String,
    required: false
  },
  closetime: {
    type: String,
    required: false
  },
  shopname: {
    type: String,
    required: false
  },
  managername: {
    type: String,
    required: false
  },
  age: {
    type: String,
    required: false
  },
  year: {
    type: String,
    required: false
  },
  wallet: {
    type: Number,
    required: false
  }
});
const foodSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String,
  shop: String,
  rating: Number,
  tags: Array
});
const walletSchema = new Schema({
  email: String,
  amount: Number
});


module.exports = user = mongoose.model('Users', UserSchema);
