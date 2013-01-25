#Node.js Blog Engine
The goal of this project is to create a simple, reusable blog template for Node.js.  By passing in a few options, you can quickly have a fully functioning blog, including WYSIWYG editing, database saving, Disqus comments, draft saving options, and a responsive Twitter Bootstrap theme.

<img width="800px" src="http://content.screencast.com/users/dan-silver78/folders/Jing/media/e7768b90-d5fd-49fb-9cd6-1dfb103ecc40/2013-01-25_1535.png">

##Live Example
You can go to http://nodejs-blog-engine-example.herokuapp.com/ to view the example site.  To login as the admin, go to http://nodejs-blog-engine-example.herokuapp.com/login. For the example website, any Google account will have admin access.

##Installation
Warning! This is still being developed!!!  But, if you want to help out in development, you can install it with:
```
npm install bootstrap-blog
```

##Simple Usage
The following code should be placed in your main serverside javascript file that is executed with node. For example, if this is placed in app.js, then node app.js would run the blog.
```javascript
var blog = require('blog');

blog.start({
	title: "My awesome blog",
	adminGoogleEmail: 'myGoogleEmail@gmail.com',
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
##Options
###Menu Items and Custom Pages
Custom menu items can be set by passing in an array of menu objects.  The same goes for custom pages.
```javascript
	pages:[
		{
			path: '/about',
			callback: function (req,res) {
				console.log('User has visitied the about page.');
				res.send('About page coming soon!');
			}
		},
		{
			path: '/about/history',
			callback: function (req,res) {
				console.log('User has visitied the history page.');
				res.send('History page coming soon!');
			}	
		}
	],
	menu: [
		{
			title: 'Google',
			path: 'http://www.google.com'
		}, {
			title: 'Amazon',
			path: 'http://www.amazon.com'
		}
	]
```

###Different Bootstrap Themes
You can load in any Twitter Bootstrap theme by specifying the path to the css file.
```javascript
bootstrapPath: '/css/bootstrap.min.css'
```
###Modifying templates
  When you run the blog for the first time, a views folder is created in your top directory.  Edit these files to change the layout of the website.  Since these are outside the node_modules folder, they will not be overridden during updates.
###Example
```javascript
var blog = require('blog');

blog.start({
	title: "My awesome blog",
	adminGoogleEmail: 'myGoogleEmail@gmail.com',
	localPort: 5000, //defaults to 3000
	liveDomain: 'http://some-app.herokuapp.com',
	database: {
		database: config.database,
		user: config.user,
		password: config.password,
		host: config.host,
		dbPort: config.dbPort
	},
	bootstrapPath: '/css/bootstrap.min.css',
	pages:[
		{
			path: '/about',
			callback: function (req,res) {
				console.log('User has visitied the about page.');
				res.send('About page coming soon!');
			}
		},
		{
			path: '/about/history',
			callback: function (req,res) {
				console.log('User has visitied the history page.');
				res.send('History page coming soon!');
			}	
		}
	],
	menu: [
		{
			title: 'Google',
			path: 'http://www.google.com'
		}, {
			title: 'Amazon',
			path: 'http://www.amazon.com'
		}
	]
});
```
