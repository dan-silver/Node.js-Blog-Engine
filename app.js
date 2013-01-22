var blog = require('blog');

if (!process.env.PORT) {
	var config = require('./config');
}

blog.start({
	title: "Dan Silver's Blog",
	adminGoogleEmail: 'dannysilver3@gmail.com',
	port: 3000,
	liveDomain: 'http://dan-silver.herokuapp.com',
	database: {
		database: process.env.database || config.database,
		user: process.env.user || config.user,
		password: process.env.password || config.password,
		host: process.env.host || config.host,
		dbPort: process.env.dbPort || config.dbPort
	}
});