var db = require('../db')
  , moment = require('moment');
exports.set = function(options) {
	exports.index = function(req, res) {
		
		if (req.user && (req.user.emails[0].value == options.adminGoogleEmail || options.adminGoogleEmail == "*")) {
			db.posts.findAll({order: 'createdAt DESC'}).success(function(posts) {
				posts.forEach(function(post) {
					post.createdAt = moment(post.createdAt).format("MMMM Do YYYY");
				});
				res.render('index', {posts: posts, noTitleLink: false});
			});
		} else {
			db.posts.findAll({order: 'createdAt DESC', where: {status: 'published'}}).success(function(posts) {
				posts.forEach(function(post) {
					post.createdAt = moment(post.createdAt).format("MMMM Do YYYY");
				});
				res.render('index', {posts: posts, noTitleLink: false});
			});
		}
	};

	exports.post = function(req, res) {
		if (req.user && (req.user.emails[0].value == options.adminGoogleEmail || options.adminGoogleEmail == "*")) {
			db.posts.find({where: {title:req.params.title}}).success(function(post) {
				if (post) {
					post.createdAt = moment(post.createdAt).format("MMMM Do YYYY");
					res.render('post', {post: post, noTitleLink: true});
				} else {
					res.send(404, 'Sorry, I can\'t find that entry!');
				}
			});
		} else {
			db.posts.find({where: {title:req.params.title, status: 'published'}}).success(function(post) {
				if (post) {
					post.createdAt = moment(post.createdAt).format("MMMM Do YYYY");
					res.render('post', {post: post, noTitleLink: true});
				} else {
					res.send(404, 'Sorry, I can\'t find that entry!');
				}
			});
		}
	};

	exports.newPost = function(req, res) {
		res.render('editPost', {post:{
			content: '',
			title: ''
		}});
	};

	exports.editPost = function(req, res) {
		db.posts.find({where: {title:req.params.title}}).success(function(post) {
			switch(req.params.mode) {
				case "edit":
					res.render('editPost', {post: post});
				break;
				case "confirm-deletion":
					res.render('confirmDeletePost', {post:post});
				break;
				case "delete":
					post.destroy().success(function() {
						res.redirect('/');
					});
				break;
			}
		});
	};

}