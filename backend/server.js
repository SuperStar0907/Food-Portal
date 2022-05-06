const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes
var foodRouter = require("./routes/food");
var userRouter = require("./routes/Users");
var orderRouter = require("./routes/orders");
var favRouter = require("./routes/fav");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect(
  'mongodb+srv://admin:admin@cluster0.ejbuu.mongodb.net/tutorial?retryWrites=true&w=majority',
  { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/food", foodRouter);
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/fav",favRouter);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
