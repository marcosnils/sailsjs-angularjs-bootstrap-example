var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports.express = {
  customMiddleware: function (app) {


    // ********************************************
    // Bootstrap Passport Middleware
    // Credit:
    // @theangryangel https://gist.github.com/theangryangel/5060446
    // @Mantish https://gist.github.com/Mantish/6366642
    // @anhnt https://gist.github.com/anhnt/8297229
    // @adityamukho https://gist.github.com/adityamukho/6260759
    // ********************************************

    // Passport session setup.
    // To support persistent login sessions, Passport needs to be able to
    // serialize users into and deserialize users out of the session. Typically,
    // this will be as simple as storing the user ID when serializing, and finding
    // the user by ID when deserializing.
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findOne(id).done(function (err, user) {
        done(err, user);
      });
    });


    // Use the LocalStrategy within Passport.
    // Strategies in passport require a `verify` function, which accept
    // credentials (in this case, a username and password), and invoke a callback
    // with a user object. In the real world, this would query a database;
    // however, in this example we are using a baked-in set of users.
    passport.use(new LocalStrategy(
      function(username, password, done) {
        // Find the user by username. If there is no user with the given
        // username, or the password is not correct, set the user to `false` to
        // indicate failure and set a flash message. Otherwise, return the
        // authenticated `user`.
        User.findOneByUsername(username).done(function(err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
          user.validPassword(password, function(err, res) {
            if (err) { return done(err); }
            if (!res) { return done(null, false, { message: 'Invalid password' }); }
            done(null, user);
          })
        });
      }
    ));

    // Passport Auth Middleware
    // Credit:
    // @theangryangel https://gist.github.com/theangryangel/5060446
    // @Mantish https://gist.github.com/Mantish/6366642
    // @anhnt https://gist.github.com/anhnt/8297229
    app.use(passport.initialize());
    app.use(passport.session());
  }
};
