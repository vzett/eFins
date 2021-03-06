"use strict";
Promise = require('bluebird')

module.exports = function(sequelize, DataTypes) {
  var Species = sequelize.define("Species", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        notEmpty: true
      }
    },
    usn: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      unique: true//,
      // validate: {
      //   notEmpty: true
      // }
    }
  }, {
    classMethods: {
      apiSetup: apiSetup,
      associate: function(models) {
        this.hasMany(models.Catch);
      }
    },
    instanceMethods: {
     
    },
    paranoid: true,
    timestamps: true
  });
  return Species;
};

function apiSetup() {
  return( {
    configHash: {
      endpoints: ['/species', '/species/:id'],
      actions: ['list']
    },
    customizationFunction: function(species) {
      species.use({});
      return;
    }
  });
}
