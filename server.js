// Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var flash = require('connect-flash');
var jwt = require('express-jwt');
var cors = require('cors');

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));

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

mongoose.Promise = Promise;

// -------------------------------------------------
// Session Configuration

var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);

app.use(expressSession({
    secret: 'darkKnight',
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false
}));

//===========================================================
// Auth
//===========================================================
var config = require('./app/config/config.js');
app.use(cors());

// Authentication middleware provided by express-jwt.
// This middleware will check incoming requests for a valid
// JWT on any routes that it is applied to.
var authCheck = jwt({
  secret: new Buffer(config.auth0Secret, 'base64'),
  audience: config.auth0ClientId
});

//===========================================================
// Router
//===========================================================

// Home page - the user is sent the ReactJS page
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

// Articles
app.get("/api/saved", function(req, res) {
    Article.find({}).sort([
        ["createdAt", "descending"]
    ]).limit(5).exec(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.send(doc);
        }
    });
});

// This route saves articles when the user clicks the 'save' button
app.post("/api/saved", authCheck, function(req, res) {

    console.log('Req body: ' + JSON.stringify(req.body));
    Article.create({
        title: req.body.headline.main,
        date: req.body.pub_date,
        url: req.body.web_url
    }, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.send("Article Saved");
        }
    });
});

// This route deletes articles when the user clicks the 'delete' button
app.delete("/api/saved/:articleID", authCheck, function(req, res) {
    // console.log(JSON.stringify(req.body));
    Article.findByIdAndRemove(mongoose.Types.ObjectId(req.params.articleID), function(err, article) {
      if (err) {
        console.log(err);
      }
      else{
        // var response = {
        //     message: "Article deleted.",
        //     id: article._id
        // };
        // res.send(response);
      }

    });
});

//=============================================
// SIGNUP
//=============================================
app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/signup', function(req,res){
});

//=============================================
// LOGIN
//=============================================
app.get('/login', function(req, res) {

});

app.post('/login', function(req, res) {

});

app.get('/logout', function(req, res) {

});

// -------------------------------------------------

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
