"use strict";

module.exports = function(sequelize, DataTypes) {
  var Port = sequelize.define("Port", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    usn: {
      type: DataTypes.BIGINT,
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
        this.belongsToMany(models.PatrolLog);
        this.belongsToMany(models.Activity);
      }
    },
    instanceMethods: {
      
    }
  }, {
    paranoid: true,
    timestamps: true
  });
  return Port;
};

function apiSetup() {
  return( {
    configHash: {
      endpoints: ['/port', '/port/:id'],
      actions: ['list']
    },
    customizationFunction: function(ports) {
      ports.use({});
      return;
    }
  });
}

