const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  email: String,
  amount: Number
});
module.exports = wallet = mongoose.model('Users', walletSchema);
