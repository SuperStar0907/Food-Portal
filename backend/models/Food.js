const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  foodname: String,
  price: Number,
  description: String,
  category: String,
  shopname: String,
  ratings: Number,
  tags: Array,
  vendorname: String,
  fav: Boolean,
});

module.exports = food = mongoose.model('Food', foodSchema);
