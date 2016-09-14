var express = require('express');
var app = express();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// Create the method of authentication that passport will use to log the user in.
passport.use(new GoogleStrategy({
    // These need to be set in your environment
    clientID: process.env.GOOG_CLIENT_ID,
    clientSecret: process.env.GOOG_CLIENT_SECRET,
    // Everything before the "/auth/google/callback" should be pointing to where you have this hosted
    callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(token, tokenSecret, profile, callback) {
        // I appended "GOOG_" here because there might be a chance we authenticate with another service,
        // and when we check against the DB, I want to be able to differentiate the providers
        return callback(null, 'GOOG_' + profile.id);
    }
));

passport.serializeUser(function(user, callback) {
    // This function is called after we initially figure out who this user is (auth callback)
    console.log('deserializing the user');
    callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
    // This function is called every time our app wants to know who this is
    console.log('serializing the user');
    callback(null, obj);
});

// I never looked up the params here so I couldn't really tell you
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
    res.send('<a href="/login">Log In</a>');
});

app.get('/login', function (req, res) {
    res.send('Click <a href="/auth/google">here</a> to log in with Google.');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
});

app.get('/failed', function(req, res) {
    res.send('If you\'re seeing this, it\'s because your login failed.');
});

app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        res.send(req.user);
});

app.listen(3000, function () {
    console.log('passport-test listening on port 3000');
});
