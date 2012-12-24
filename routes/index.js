var db = require('../db')
exports.index = function(req, res){
	if (req.user) {
	//	console.log(req.user);
		console.log('User is logged in as '+req.user.displayName);
	}
	db.posts.findAll({order: 'createdAt DESC'}).success(function(posts) {
		res.render('index', {posts: posts, user: req.user});
	});
};

exports.post = function(req, res){
	db.posts.find({where: {title:req.params.title}}).success(function(post) {
		res.render('post', {post: post});
	});
};

exports.newPost = function(req, res){
	res.render('editPost');
};

exports.editPost = function(req, res){
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

