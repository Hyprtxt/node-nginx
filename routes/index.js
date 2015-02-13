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
			pileodata.symlinked = [];
			pileodata.notsymlinked = [];
			_.forEach( sites_available, function ( v, i ) {
				if( _.includes( sites_enabled, v ) ) {
					pileodata.symlinked.push( v );
				}
				else {
					pileodata.notsymlinked.push( v );
				}
			});
			pileodata.tomove = [];
			_.forEach( sites_enabled, function ( v, i ) {
				if( !_.includes( sites_available, v ) ) {
					pileodata.tomove.push( v );
				}
			});
			pileodata.available = sites_available;
			pileodata.enabled = sites_enabled;x
			res.render('index', { title: 'Nginx Sites Config', data: pileodata });
		})
	})
});

module.exports = router;
