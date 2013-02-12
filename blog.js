var express = require('express')
  , http = require('http')
  , path = require('path')
  , passport = require('passport')
  , fs = require('fs')
  , util = require('util')
  , moment = require('moment')
  , GoogleStrategy = require('passport-google').Strategy;
fs.mkdir('views',function(e){
  if(!e || (e.code === 'EEXIST')){
    fs.readdir(__dirname+'/default_views/', function(err,files) {
      files.forEach(function(file) {
        fs.exists('views/'+file, function (exists) {
          if (!exists) {
            fs.createReadStream(__dirname+'/default_views/'+file).pipe(fs.createWriteStream('views/'+file));
          }
        });
      });
    });
  } else {
    console.log(e);
  }
});

var app = express();
exports.start = function(options) {
	if (!options.adminGoogleEmail) {
		console.log('Warning! You need to add the "adminGoogleEmail" property to access the administration settings.');
	}
	if (!process.env.database) {
		process.env.database = options.database.database;
		process.env.user = options.database.user;
		process.env.password = options.database.password;
		process.env.host = options.database.host;
		process.env.dbPort = options.database.dbPort;
	}
	var db = require('./db')
	  , routes = require('./routes/index.js');
	routes.set(options);

	app.locals.title = options.title || 'No Title Set!';
	app.locals.menu = options.menu || [];
	app.locals.bootstrapPath = options.bootstrapPath || '/stylesheets/bootstrap.min.css';

	passport.serializeUser(function(user, done) {
	  done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	  done(null, obj);
	});

	app.configure(function(){
	  app.set('port', process.env.PORT || options.localPort || 3000);
    app.set('views','./views');
	  app.set('view engine', 'jade');
	  app.use(express.favicon());
//	  app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(express.cookieParser(options.cookieSecret || Math.random().toString(36).substring(7)));
	  app.use(express.session());
	  app.use(passport.initialize());
	  app.use(passport.session());
	  app.use(function (req, res, next) { // Add user variable to every template
		res.locals.user = req.user;
		next();
	  });
	  app.use(require('stylus').middleware(__dirname + '/resources'));
	  app.use(express.static(path.join(__dirname,'resources')));
	  app.use(express.static(__dirname + '/../../public'));
	  app.use(app.router);
	});

	app.configure('development', function(){
	  app.use(express.errorHandler());
	});
	if (!process.env.PORT) {
		var callbackURL = 'http://localhost:'+app.get('port')+'/auth/google/return'; 
		var realm = 'http://localhost:'+ app.get('port'); 
	} else {
		var callbackURL = options.liveDomain+'/auth/google/return'; 
		var realm = options.liveDomain; 
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

	app.get('/newPost', ensureAdmin, routes.newPost);
	app.get('/createPost', function(req, res) {
		db.posts.create({title: req.query.title, content: req.query.content, status:req.query.status}).success(function(result) {
			res.redirect('/');
		});
	});

	app.get('/post/:title/:mode', ensureAdmin, routes.editPost);
	app.get('/updatePost', ensureAdmin, function (req, res) {
		db.posts.find( {where: {id:req.query.postId}}).success(function(post) {
			post.title = req.query.title;
			post.content = req.query.content;
			post.createdAt = new Date(moment(req.query.createdAt, "MM/DD/YYYY").utc());
			post.status = req.query.status;
			post.save();
			res.redirect('/');
		});
	});

	app.get('/login',
	  passport.authenticate('google', { failureRedirect: '/' }),
	  function(req, res) {
		res.redirect('/');
	  });
	app.get('/auth/google/return', passport.authenticate('google', { failureRedirect: '/' }), function(req, res) {
		if (req.user && (req.user.emails[0].value == options.adminGoogleEmail || options.adminGoogleEmail == "*")) {
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
	  console.log('Blog started on port ' + app.get('port') + '.');
	  console.log('Go to /login to create and edit blog entries.');
	});

	function ensureAdmin(req, res, next) {
	  if (req.user) { return next(); }
	  res.redirect('/');
	}
	if (options.pages) {
		options.pages.forEach(function(page) {
			app.get(page.path, page.callback);
		});
	}
}
