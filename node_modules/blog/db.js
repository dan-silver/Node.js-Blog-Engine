var mysql = require('mysql'),
	Sequelize = require("sequelize"),
	sequelize,
	db = {};
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

db.posts = sequelize.define('posts-local', {
	title: Sequelize.STRING,
	content: Sequelize.TEXT,
	status: Sequelize.STRING //currently either 'published' or 'draft'
})
db.posts.sync();
module.exports = db;