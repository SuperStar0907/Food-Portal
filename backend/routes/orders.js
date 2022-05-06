var express = require('express');
var router = express.Router();
var Orders = require('../models/orders');

// // Load User model
// const User = require('../models/Users');

// GET request
// Getting all the users
router.get('/', function (req, res) {
  Orders.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post('/stats', function (req, res) {
  Orders.find({"vendorname":req.body.managername},function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post('/addorder', function (req, res) {
  var newOrder = new Orders();
  newOrder.buyername = req.body.buyername;
  newOrder.foodname = req.body.foodname;
  newOrder.vendorname = req.body.vendorname;
  newOrder.price = req.body.price;
  newOrder.category = req.body.category;
  newOrder.shopname = req.body.shopname;
  newOrder.total = req.body.total;
  newOrder.quantity = req.body.quantity;
  newOrder.status = req.body.status;
  newOrder.date = req.body.date;
  newOrder.save(function (err) {
    if (err) {
      console.log(err);
      res.send({ message: 'Ured, Please Register.' });
    } else {
      res.send({ message: 'created', food: food });
    }
  });
});

router.post('/accept', function (req, res) {
  console.log(req.body);
  const id = req.body;
  Orders.findOneAndUpdate(
    { _id: id._id },
    {
      $set: {
        buyername: id.buyername,
        foodname: id.foodname,
        vendorname: id.vendorname,
        price: id.price,
        category: id.category,
        shopname: id.shopname,
        total: id.total,
        quantity: id.quantity,
        date: id.date,
        status: 'Accepted'
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        console.log(doc);
      }
    }
  );
});

router.post('/reject', function (req, res) {
  console.log(req.body);
  const id = req.body;
  Orders.findOneAndUpdate(
    { _id: id._id },
    {
      $set: {
        buyername: id.buyername,
        foodname: id.foodname,
        vendorname: id.vendorname,
        price: id.price,
        category: id.category,
        shopname: id.shopname,
        total: id.total,
        quantity: id.quantity,
        date: id.date,
        status: 'Rejected'
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        console.log(doc);
      }
    }
  );
});
router.post('/nextstage', function (req, res) {
  console.log(req.body);
  const id = req.body;
  if (id.status == 'Accepted') {
    Orders.findOneAndUpdate(
      { _id: id._id },
      {
        $set: {
          buyername: id.buyername,
          foodname: id.foodname,
          vendorname: id.vendorname,
          price: id.price,
          category: id.category,
          shopname: id.shopname,
          total: id.total,
          quantity: id.quantity,
          date: id.date,
          status: 'Preparing'
        }
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          console.log(doc);
        }
      }
    );
  }
  if (id.status == 'Preparing') {
    Orders.findOneAndUpdate(
      { _id: id._id },
      {
        $set: {
          buyername: id.buyername,
          foodname: id.foodname,
          vendorname: id.vendorname,
          price: id.price,
          category: id.category,
          shopname: id.shopname,
          total: id.total,
          quantity: id.quantity,
          date: id.date,
          status: 'Ready to pick up'
        }
      },
      { new: true },
      (err, doc) => {
        if (err) {
          res.send(err);
        } else {
          console.log(doc);
        }
      }
    );
  }
});
router.post('/picked', function (req, res) {
  console.log(req.body);
  const id = req.body;
  Orders.findOneAndUpdate(
    { _id: id._id },
    {
      $set: {
        buyername: id.buyername,
        foodname: id.foodname,
        vendorname: id.vendorname,
        price: id.price,
        category: id.category,
        shopname: id.shopname,
        total: id.total,
        quantity: id.quantity,
        date: id.date,
        status: 'Picked Up'
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        console.log(doc);
      }
    }
  );
});


module.exports = router;
