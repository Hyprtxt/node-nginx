var express = require('express');
var router = express.Router();

var glob = require('glob');

/* GET home page. */
router.get('/', function ( req, res ) {
	var pileodata = {};

	glob("*", { cwd: '/etc/nginx/sites-enabled' }, function ( er, files ) {
		pileodata.enabled = files;
		glob("*", { cwd: '/etc/nginx/sites-available' }, function ( er, files ) {
			pileodata.available = files;
			res.render('index', { title: '', files: pileodata });
		})
	})
});

router.get('/enabled', function ( req, res ) {
	glob("*", { cwd: '/etc/nginx/sites-enabled' }, function ( er, files ) {
		res.render('index', { title: 'Sites Enabled', files: files });
	})
});

router.get('/available', function ( req, res ) {
	glob("*", { cwd: '/etc/nginx/sites-available' }, function ( er, files ) {
		res.render('index', { title: 'Sites Available', files: files });
	})
});

module.exports = router;
