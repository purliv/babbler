/**
 * Created by Liviu Purjea on 5/27/2015.
 */
var uuid = require('uuid');

exports.controller = {
	login: function(req, res, next) {
		res.status(200).set("Content-Type", "application/json").send('{"valid": "' + uuid.v1().toUpperCase().split('-').join('') + '"}');
	}
};
