var express = require('express');
var router = express.Router();
var Fav = require('../models/Fav');

// // Load User model
// const User = require('../models/Users');

// GET request
// Getting all the users
router.get('/', function (req, res) {
  Fav.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post('/add', function (req, res) {
  const p = new Fav();
  p.foodname=req.body.foodname;
  p.buyername=req.body.buyername;
  p.save(function (err) {
    if(err){
      console.log(err);
    }else{
      res.send('success');
    }
  });
});

router.post('/delete', function (req, res) {
  Fav.findOneAndDelete({foodname:req.body.foodname,buyername:req.body.buyername},function (err) {
    if(err){
      console.log(err);
    }else{
      res.send('success');
    }
  });
});

module.exports = router;
