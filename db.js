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

db.posts = sequelize.define('posts', {
	title: Sequelize.STRING,
	content: Sequelize.TEXT
})
db.posts.sync();
db.users = sequelize.define('users', {
	GoogleId: Sequelize.STRING,
	name: Sequelize.STRING,
	email: Sequelize.STRING
})
db.posts.sync();
module.exports = db;