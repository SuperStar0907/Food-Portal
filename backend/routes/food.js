var express = require('express');
var router = express.Router();
var Food = require('../models/Food');

// // Load User model
// const User = require('../models/Users');

// GET request
// Getting all the users
router.get('/', function (req, res) {
  Food.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post('/vendor', function (req, res) {
  var food = req.body;
  Food.findAll({
    where: {
      vendorname: req.body.vendorname
    }
  }).then(function (foods) {
    res.json(foods);
  });
});

router.post('/addfood', function (req, res) {
  var newFood = new Food();
  newFood.foodname = req.body.foodname;
  newFood.price = req.body.price;
  newFood.description = req.body.description;
  newFood.shopname = req.body.shopname;
  newFood.ratings = req.body.ratings;
  newFood.tags = req.body.tags;
  newFood.category = req.body.category;
  Food.findOne({ foodname: newFood.foodname }, function (err, food) {
    if (food) {
      res.json({ success: false, msg: 'Food already exists' });
    } else {
      newFood.save(function (err) {
        if (err) {
          console.log(err);
          res.send({ message: 'Ured, Please Register.' });
        } else {
          res.send({ message: 'created', food: food });
        }
      });
    }
  });
});

router.post('/delfood', function (req, res) {
  Food.findOneAndRemove({ foodname: req.body.foodname, }, function (err, food) {
    if (err) {
      console.log(err);
    } else {
      res.json(food);
    }
  });
});

router.post('/updatefood', function (req, res) {
  Food.findOneAndUpdate({ foodname: req.body.foodname }, 
  req.body,{new:true}, function (err, food) {
    if (err) {
      console.log(err);
    } else {
      res.json(food);
    }
  });
});




module.exports = router;
