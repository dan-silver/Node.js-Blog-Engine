var db = require('../db')
exports.index = function(req, res){
	if (req.user) {
	//	console.log(req.user);
		console.log('User is logged in as '+req.user.displayName);
	}
	db.posts.findAll().success(function(posts) {
		res.render('index', { title: 'Dan\'s Blog', posts: posts, user: req.user});
	});
};

exports.post = function(req, res){
	db.posts.find({where: {title:req.params.title}}).success(function(post) {
		res.render('post', { title: 'Dan\'s Blog', post: post});
	});
};