/*global require, __dirname, console, setTimeout */
(function () {
	'use strict';
	var express = require('express'),
		app = express(),
		host = 'localhost',
		port = 8188;

	app.use(app.router);
	app.use(express['static'](__dirname + '/app'));
    
    app.listen(port, host, function () {
		console.log('Server running on: ' + host + ':' + port);
	});

}());