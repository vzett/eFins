"use strict";

module.exports = function(sequelize, DataTypes) {
  var FreeTextCrew = sequelize.define("FreeTextCrew", {
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
  return FreeTextCrew;
};

function apiSetup() {
  return( {
    configHash: {
      endpoints: ['/freetextcrew', '/freetextcrew/:id'],
      actions: ['list']
    },
    customizationFunction: function(freeTextCrew) {
      freeTextCrew.use({});
      return;
    }
  });
}

