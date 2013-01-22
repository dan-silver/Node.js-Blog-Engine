#Node.js Blog Engine
The goal of this project is to create a simple, reusable blog template for Node.js.  By passing in a few options, you can quickly have a fully functioning blog, including WYSIWYG editing, database saving, Disqus comments, draft saving options, and a responsive Twitter Bootstrap theme.


#Sample Usage
```javascript
var blog = require('blog');

blog.start({
	title: "My awesome blog",
	adminGoogleEmail: 'myGoogleEmail@gmail.com',
	port: 3000,
	liveDomain: 'http://some-app.herokuapp.com',
	database: {
		database: config.database,
		user: config.user,
		password: config.password,
		host: config.host,
		dbPort: config.dbPort
	}
});
```
#Project Status
This repository was initially for my personal blog, so I'm currently removing all files that were for my blog only.  Also, this node module will be published so it can be downloaded via npm in the near future. Feedback is welcome!
