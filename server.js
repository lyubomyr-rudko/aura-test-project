/*global require, __dirname, console, setTimeout */
(function () {
	'use strict';
	var express = require('express'),
		app = express(),
		host = 'localhost',
		port = 8188;

	app.use(app.router);
	app.use(express['static'](__dirname + '/app'));

	app.post('/api/exams', function (req, res) {
		res.end(JSON.stringify({success: true}));
	})
    
    app.listen(port, host, function () {
		console.log('Server running on: ' + host + ':' + port);
	});

}());