#Node.js Blog Engine
The goal of this project is to create a simple, reusable blog template for Node.js.  By passing in a few options, you can quickly have a fully functioning blog, including WYSIWYG editing, database saving, Disqus comments, draft saving options, and a responsive Twitter Bootstrap theme.
##Example
You can go to http://nodejs-blog-engine-example.herokuapp.com/ to view the example site.  To login as the admin, go to http://nodejs-blog-engine-example.herokuapp.com/login. For the example website, any Google account will have admin access.

##Installation
Warning! This is still being developed!!!  But, if you want to help out in development, you can install it with:
```
npm install bootstrap-blog
```

##Sample Usage
The following code should be placed in your main serverside javascript file that is executed with node. For example, if this is placed in app.js, then node app.js would run the blog.
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

