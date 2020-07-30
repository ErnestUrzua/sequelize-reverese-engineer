// npm packages that are required for the program to run correctly
var express = require("express");
var session = require("express-session");

// passport.js is required for authentication, it is middleware
// we require the config file.
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
// we set up the port for our server to listen on, 8080 for localhost or process.env.port for deployment on a web based server
// we require our models for interfacing with the db
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
//a method in express to recognize the incoming Request Object as strings or arrays. 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//allows the public folder to be accessed by express
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
//creates a session with a secret keyword, and resave saves the session, uninitialized saves a session that is new but not configured.
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize()); //initializes passport
app.use(passport.session()); //initializes the session

// Requiring our routes
require("./routes/html-routes.js")(app); //html route for client side
require("./routes/api-routes.js")(app); //api route for server side

// Syncing our database and logging a message to the user upon success
//sync the db
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    //logging out the port
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
