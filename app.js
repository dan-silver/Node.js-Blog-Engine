
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , db = require('./db')
  , path = require('path')
  , passport = require('passport')
  , GoogleStrategy = require('passport-google').Strategy;

var app = express();

app.locals.title = 'Dan Silver\'s Blog';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here35'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});
if (!process.env.database) {
	var callbackURL = 'http://localhost:3000/auth/google/return'; 
	var realm = 'http://localhost:3000/'; 
} else {
	var callbackURL = 'http://dan-silver.herokuapp.com/auth/google/return'; 
	var realm = 'http://dan-silver.herokuapp.com'; 
}
passport.use(new GoogleStrategy({
    returnURL: callbackURL,
    realm: realm
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));
app.get('/', routes.index);
app.get('/post/:title', routes.post);

app.get('/newPost', routes.newPost);
app.get('/createPost', function(req, res) {
	db.posts.create({title: req.query.title, content: req.query.content}).success(function(result) {
		res.redirect('/');
	});
});

app.get('/post/:title/:mode', ensureAdmin, routes.editPost);
app.get('/updatePost', ensureAdmin, function (req, res) {
	db.posts.find( {where: {id:req.query.postId}}).success(function(post) {
		post.title = req.query.title;
		post.content = req.query.content;
		post.save();
		res.redirect('/');
	});
});

app.get('/auth/google', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
app.get('/auth/google/return', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
	if (req.user && req.user.emails[0].value == "dannysilver3@gmail.com") {
		res.redirect('/');
	} else {
		res.redirect('/logout');
	}
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

function ensureAdmin(req, res, next) {
  if (req.user && req.user.emails[0].value == "dannysilver3@gmail.com") { return next(); }
  res.redirect('/');
}