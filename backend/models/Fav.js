const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavSchema = new Schema({
  foodname: String,
  buyername: String,
});

module.exports = Fav = mongoose.model('Fav', FavSchema);
