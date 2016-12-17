// Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var flash = require('connect-flash');

// MongoDB Schemas
var Article = require('./models/Article.js');
var User = require('./models/User.js');

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Configuration
mongoose.connect("mongodb://heroku_fdj2wmk7:r2npdn9l0c7t24ecprkknkoba9@ds133338.mlab.com:33338/heroku_fdj2wmk7");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Passport Configuration
var passport = require('passport');
require('./app/config/passport')(passport);
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

app.use(expressSession({secret: 'darkKnight',
                        store: new MongoStore({ mongooseConnection: mongoose.connection }),
                        resave: false,
                        saveUninitialized: false
                      }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//===========================================================
// Router
//===========================================================

// Home page - the user is sent the ReactJS page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Articles
app.get("/api/saved", function(req, res) {

});

// This route saves articles when the user clicks the 'save' button
app.post("/api/saved", function(req, res) {

});

// This route deletes articles when the user clicks the 'delete' button
app.delete("/api/saved", function(req, res) {

});

//=============================================
// SIGNUP
//=============================================
app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup/',
    failureFlash: false
}));

//=============================================
// LOGIN
//=============================================
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: false
}));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
