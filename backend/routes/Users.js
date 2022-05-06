var express = require('express');
var router = express.Router();
var Reg = require('./../models/Users');

// // Load User model
const User = require('../models/Users');

// GET request
// Getting all the users
router.get('/', function (req, res) {
  User.find(function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.get('/vendor', function (req, res) {
  User.find({ managername: { $exists: true } }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post('/register', (req, res) => {
  const newuser = new User({
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    password: req.body.password,
    mobileno: req.body.mobileno,
    role: req.body.role,
    year: req.body.year,
    age: req.body.age,
    opentime: req.body.opentime,
    closetime: req.body.closetime,
    shopname: req.body.shopname,
    managername: req.body.managername,
    wallet: req.body.wallet
  });
  Reg.findOne(
    {
      email: req.body.email
    },
    function (err, user) {
      if (user) {
        res.send({ message: 'User already registerd' });
      } else {
        if (req.body.role == 'Vendor') {
          Reg.findOne({
            shopname: req.body.shopname
          }).then(user => {
            if (user) {
              res.send({ message: 'Shopname already exist' });
            } else {
              newuser
                .save()
                .then(user => {
                  res.status(200).send({
                    message: 'Successfully Registered, Please login now.'
                  });
                })
                .catch(err => {
                  res.status(400).send(err);
                });
            }
          });
        } else {
          newuser
            .save()
            .then(user => {
              res.status(200).send({
                message: 'Successfully Registered, Please login now.'
              });
            })
            .catch(err => {
              res.status(400).send(err);
            });
        }
      }
    }
  );
});

// POST request
// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  user.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ user: user });
    } else {
      res.send({ message: 'Ured, Please Register.' });
    }
  });
  // const { email, password } = req.body;
  // // Find user by email
  // user.findOne({ email }),
  //   (err, userr) => {
  //     // Check if user email exists
  //     if(err){
  //       res.send({alert: 'User not found'});
  //     };
  //     if (!userr) {
  //       console.log(user);
  //       res.send({ message: 'User Not Registred, Pleister.' });
  //     } else {
  //       res.send({ user: userr });
  //     }
  //   };
});

router.post('/edit', (req, res) => {
  const { email } = req.body;

  Reg.findOneAndUpdate(
    {
      email: email
    },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        password: req.body.password,
        mobileno: req.body.mobileno,
        role: req.body.role,
        year: req.body.year,
        age: req.body.age,
        opentime: req.body.opentime,
        closetime: req.body.closetime,
        shopname: req.body.shopname,
        managername: req.body.managername,
        wallet: req.body.wallet
      }
    },
    { new: true },
    (err, doc) => {
      if (err) {
        res.send(err);
      } else {
        // localStorage.setItem('user', JSON.stringify(doc));
        res.send({ message: 'Successfully Updated' });
      }
    }
  );

  // const { email, password } = req.body;
  // // Find user by email
  // user.findOne({ email }),
  //   (err, userr) => {
  //     // Check if user email exists
  //     if(err){
  //       res.send({alert: 'User not found'});
  //     };
  //     if (!userr) {
  //       console.log(user);
  //       res.send({ message: 'User Not Registred, Pleister.' });
  //     } else {
  //       res.send({ user: userr });
  //     }
  //   };
});
router.post('/addmoney', (req, res) => {
  const { email, password } = req.body;
  User.findOneAndUpdate(
    { email: email },
    { wallet: req.body.wallet },
    { new: true },
    (err, user) => {
      if (err) {
        res.send(err);
      } else {
        // localStorage.setItem('user', JSON.stringify(doc));
        res.send(user);
      }
    }
  );
});
router.post('/retmoney', (req, res) => {
  const { name, amount } = req.body;
  User.findOne({ name: name }, (err, user) => {
    if (user) {
      var wallet = user.wallet;
      var newwallet = +wallet + +amount;
      console.log(newwallet);
      User.findOneAndUpdate(
        { name: name },
        { wallet: newwallet },
        { new: true },
        (err, user) => {
          if (err) {
            res.send(err);
          } else {
            // localStorage.setItem('user', JSON.stringify(doc));
            res.send(user);
          }
        }
      );
    }
  });
});

router.post('/aa', (req, res) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      // localStorage.setItem('user', JSON.stringify(doc));
      res.send(user);
    }
  });
});

router.post('/ab', (req, res) => {
  console.log(req.body);
  User.findOne({ shopname: req.body.name }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      // localStorage.setItem('user', JSON.stringify(doc));
      console.log(user);
      res.send(user);
    }
  });
});
module.exports = router;
