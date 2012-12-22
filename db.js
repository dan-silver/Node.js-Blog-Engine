var mysql = require('mysql');
var Sequelize = require("sequelize")
var sequelize;
if (!process.env.database) {
	var config = require('./config');
	sequelize = new Sequelize(config.database, config.user, config.password, {
		host: config.host,
		port: config.dbPort
	})
} else {
	sequelize = new Sequelize(process.env.database, process.env.user,  process.env.password, {
		host: process.env.host,
		port: process.env.dbPort
	})
}


var db = {};
db.posts = sequelize.define('posts', {
	title: Sequelize.STRING,
	content: Sequelize.STRING
})
db.posts.sync();
module.exports = db;