var express = require('express');
var bodyParser = require('body-parser');
var loginController = require('./api/login').controller;

var app = express();

//app.disable('etag');
//app.use(bodyParser.json());
//app.use(function (request, response, next) {
//	response.set("Content-Type", "application/json");
//	next();
//});
app.use('/lib', express.static('lib'));
app.use('/img', express.static('img'));
app.use('/', express.static('app'));

app.post('/api/login', loginController.login);

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Babbler started on port %s', port);
});
