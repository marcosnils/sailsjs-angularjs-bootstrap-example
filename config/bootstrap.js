/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

var async = require('async');

module.exports.bootstrap = function (cb) {

  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //cb();

  // ********************************************
  // Create Dummy Todo Data
  // ********************************************
  function createDummyTodoData(done) {
    var dummyTodos = [
      {
        "title": "First todo",
        "isComplete": false
      },
      {
        "title": "Completed todo",
        "isComplete": true
      },
      {
        "title": "One more todo",
        "isComplete": false
      }
    ];
    Todo.count().exec(function(err, count) {
      if (err) return done(err);
      if (count > 0) return done();
      Todo.create(dummyTodos).exec(done);
    });
  }

  // ********************************************
  // Create User Data
  // ********************************************
  function createUserData(done) {
    var users = [
      {
        "username": "test",
        "password": "test123",
        "email": "foo@bar.com"
      }
    ];
    User.count().exec(function(err, count) {
      if (err) return done(err);
      if (count > 0) return done();
      User.create(users).exec(done);
    });
  }

  //
  // Bootstrap
  //
  async.parallel([
    createDummyTodoData,
    createUserData,
  ], cb);

};
