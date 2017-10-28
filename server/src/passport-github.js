const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy;
const config = require('./config/config')

passport.use(new GitHubStrategy({
    clientID: '84bae1544802ef7ee01c',
    clientSecret: config.authentication.clientSecret,
    callbackURL: "https://project-zero147x.c9users.io/#/register"
  },
  function(access_token, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));