var blog = require('blog')
  , config = require('./config');

blog.start({
	title: "Dan Silver's Blog",
	adminGoogleEmail: 'dannysilver3@gmail.com',
	port: 3000,
	liveDomain: 'http://dan-silver.herokuapp.com',
	database: {
		database: config.database || process.env.database,
		user: config.user || process.env.user,
		password: config.password || process.env.password,
		host: config.host || process.env.host,
		dbPort: config.dbPort || process.env.dbPort
	}
});