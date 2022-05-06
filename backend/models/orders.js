const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  buyername: String,
  foodname: String,
  vendorname: String,
  price: Number,
  category: String,
  shopname: String,
  total: String,
  quantity: String,
  status: String,
  date: Date,
});

module.exports = order = mongoose.model('Order', OrderSchema);
