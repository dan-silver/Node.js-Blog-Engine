
/*
 * GET home page.
 */
var db = require('../db')
exports.index = function(req, res){
	db.posts.findAll().success(function(posts) {
		res.render('index', { title: 'Dan\'s Blog', posts: posts});
	});
};