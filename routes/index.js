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
			res.render('index', { title: 'Nginx Sites Config', data: pileodata });
		})
	})
});

router.get('/ln', function ( req, res ) {
	var pileodata = {};
	glob("*", { cwd: '/etc/nginx/sites-available' }, function ( er, sites_available ) {
		glob("*", { cwd: '/etc/nginx/sites-enabled' }, function ( er, sites_enabled ) {
			pileodata.good = [];
			pileodata.notgood = [];
			_.forEach( sites_available, function ( v, i ) {
				console.log( v )
				if( _.includes( sites_enabled, v ) ) {
					pileodata.good.push( v );
				}
				else {
					pileodata.notgood.push( v );
				}
			})
			pileodata.available = sites_available;
			pileodata.enabled = sites_enabled;
			res.render('index', { title: 'Nginx Sites Config', files: pileodata });
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
