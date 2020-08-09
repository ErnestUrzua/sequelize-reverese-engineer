'use strict';
//require returns the object
var fs        = require('fs'); 
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);//sets the path basename
var env       = process.env.NODE_ENV || 'development'; //sets the env variable 
var config    = require(__dirname + '/../config/config.json')[env]; //require the config file
var db        = {}; //instantiate our empty database

//if the config file condition is true, create a new sequelize process using the env variable
//else make a new sequelize using the config databse, username and password.
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//read the directory and filter out .js, if the period is not equal to 0 and matches .js
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  //for each file returned create a seqelized model for it. and make an entry in the db for it.
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

  //take keys and match them to db
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//sequelize the db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//exprort the db
module.exports = db;
