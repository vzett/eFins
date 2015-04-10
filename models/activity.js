"use strict";

module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    type: {
      type:   DataTypes.ENUM,
      values: ['cdfwCommercialBoardingCard', 'npsRecreationalBoardingCard', 'activityLog']
    },
    usn: {
      type: DataTypes.BIGINT,
      //allowNull: false,
      unique: true//,
      // validate: {
      //   notEmpty: true
      // }
    },
    time: {
      type: DataTypes.DATE
    },
    remarks: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.FLOAT
    },
    longitude: {
      type: DataTypes.FLOAT
    },
    locationManuallyEntered: {
      type: DataTypes.BOOLEAN
    }
  }, {
    classMethods: {
      apiSetup: apiSetup,
      associate: function(models) {
        this.belongsToMany(models.FreeTextCrew, {through: "Activity2FreeTextCrew"});
        this.belongsToMany(models.User, {through: "Activity2User"});
        this.belongsTo(models.Catch);
        this.hasOne(models.Port);
        this.hasOne(models.Vessel);
        this.belongsTo(models.Fishery);
        this.belongsTo(models.Action);
        this.belongsTo(models.Person, {as: 'captain'});
        this.belongsTo(models.Person, {as: 'person'});
        this.belongsToMany(models.Person, {as: 'crew', through: "Activity2Person"})
        this.hasMany(models.Photo)
        this.belongsToMany(models.EnforcementActionTaken, {as: 'enforcementActionsTaken', through: "Activity2EnforcementActionTaken"})
        this.belongsTo(models.ContactType)
        this.belongsTo(models.PatrolLog, {through: "Activity2PatrolLog"})
      }
    },
    instanceMethods: {
      
    }
  }, {
    paranoid: true,
    timestamps: true
  });
  return Activity;
};

function apiSetup() {
  return( {
    configHash: {
      endpoints: ['/activity', '/activity/:id'],
      actions: ['list']
    },
    customizationFunction: function(activities) {
      activities.use({});
      return;
    }
  });
}
