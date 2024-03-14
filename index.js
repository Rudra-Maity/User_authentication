const express = require("express");
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser');
const session = require('express-session');
const expressfileupload=require('express-fileupload')
require('dotenv').config()

const user = require("./routes/user");
const posts=require('./routes/posts');
const Comment=require('./routes/comments')
const path = require("path");
require("./config/db");


const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressfileupload())
app.use(session({
  secret: process.env.auth_secrete, // Replace with a strong secret key in production
  resave: false,
  saveUninitialized: true,
})
)

// app.get("/", (req, res) => {
//   res.send("<h1>Home Page</h1>");
// });

/**
 * Router Middleware
 * Router - /user/*
 * Method - *
 */
app.use(express.static(path.resolve(__dirname,'/views')));
app.use(express.static(path.join(__dirname,'/public')));
app.use("/user", user);
app.use('/',posts)
app.use('/post',Comment)

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
