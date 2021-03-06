var Models = require('../models');
var User = Models.User;

exports.canCreateAndSave = function(test) {
  var user = User.build({
    email: 'chad@underbluewaters.net',
    name: 'Chad Burt'
  });

  test.ok(!user.approved, "user should not be approved yet.");
  user.setPassword('password', function(err) {
    test.ifError(err);
    test.ok(user.hash !== 'password',
      'Whoa.. password should not be cleartext');
    user.verifyPassword("password", function(err, valid) {
      test.ifError(err);
      test.ok(valid);
      user.save().done(test.done);
    });
  });

};

exports.validatesAttributes = function(test) {

  var user = User.build({
    email: 'blah',
    name: ''
  });

  user.validate().done(function(err, validator) {
    test.ifError(err);
    test.ok(validator.errors instanceof Array,
      "Should be validation errors");

    var errors = validator.errors.reduce(function(memo, error) {
      memo[error.path] = error;
      return memo;
    }, {});

    test.ok(errors.hash,
      "Should have password validation error");
    test.ok(/null/.test(errors.hash.message),
      "No null passwords allowed");
    test.ok(errors.email,
      "Should have email validation error");
    test.ok(/isEmail/.test(errors.email.message),
      "Email must be an email");
    test.ok(errors.name,
      "Should have name validation error");
    test.ok(/notEmpty/.test(errors.name.message),
      "Name not allowed to be empty");

    test.done();

  });

};


exports.dontResendConfirmationEmailUnlessApproved = function(test) {
  var user = User.build({
    email: 'test2@efins.org',
    name: 'Test Burt'
  });
  user.resendConfirmationEmail(function(err, email) {
    test.ok(err, "Should not allow without approval of user");
    test.done();
  });
}

exports.dontAllowDirectSettingOfPasswordHash = function(test) {
  test.throws(function() {
    var user = User.build({
      email: 'test2@efins.org',
      name: 'Test Burt',
      hash: 'cleartext-password'
    });
  }, Error, "Should not be able to set cleartext password");
  test.done();
}