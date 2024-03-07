const express = require("express");
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser')
const user = require("./routes/user");
require('dotenv').config()
require("./config/db");


const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use("/user", user);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
