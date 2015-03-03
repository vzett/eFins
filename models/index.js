"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var basename  = path.basename(module.filename);

var pgConn;

/* istanbul ignore else */
if (process.env.NODE_ENV == 'test') {
  pgConn = process.env.EFINS_TEST_DB || 
    "postgres://localhost:5432/efins-test"
} else {
  pgConn = process.env.EFINS_DB || 
    "postgres://localhost:5432/efins"
}

var sequelize = new Sequelize(pgConn, {logging: false});
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  /* istanbul ignore next */
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
