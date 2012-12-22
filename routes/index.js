var db = require('../db')
exports.index = function(req, res){
	db.posts.findAll().success(function(posts) {
		res.render('index', { title: 'Dan\'s Blog', posts: posts});
	});
};

exports.post = function(req, res){
	console.log('A');
	db.posts.find({where: {title:req.params.title}}).success(function(post) {
		console.log('B');
		res.render('post', { title: 'Dan\'s Blog', post: post});
	});
};