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
	res.render('newPost', {});
};
exports.editPost = function(req, res){
	db.posts.find({where: {title:req.params.title}}).success(function(post) {
		if (req.params.mode == "edit") {
			res.render('editPost', {post: post});
		}
	});
};