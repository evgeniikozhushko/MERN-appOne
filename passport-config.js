// Passport Configuration

const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');

module.exports = function(passport) {
passport.use(
new LocalStrategy(async (username, password, done) => {
const user = await User.findOne({ username });
if (!user) return done(null, false, { message: 'No user found' });
const match = await bcrypt.compare(password, user.password);
if (!match) return done(null, false, { message: 'Incorrect password' });
return done(null, user);
})
);
passport.use(new GitHubStrategy({
clientID: process.env.GITHUB_CLIENT_ID,
clientSecret: process.env.GITHUB_CLIENT_SECRET,
callbackURL: '/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
let user = await User.findOne({ githubId: profile.id });
if (!user) {
user = await User.create({ githubId: profile.id, username: profile.username });
}
return done(null, user);
}));
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));
};