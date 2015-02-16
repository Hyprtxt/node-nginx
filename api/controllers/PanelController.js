/**
 * PanelController
 *
 * @description :: Server-side logic for managing sites
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');
var glob = require('glob');
var exec = require('child_process').exec;

var getNginxData = function ( callback ) {
	var sites = {};
	glob("*", { cwd: sails.config.nginx_path +'/sites-available' }, function ( er, sites_available ) {
		sites = _.map( sites_available, function( site ) {
			return { name: site };
		});
		glob("*", { cwd: sails.config.nginx_path +'/sites-enabled' }, function ( er, sites_enabled ) {
			_.each( sites, function ( site ) {
				if( _.includes( sites_enabled, site.name ) ) {
					site.nginx_enabled = true;
				}
				else {
					site.nginx_enabled = false;
				}
			});
			callback( sites );
		});
	});
}

module.exports = {
	renderPanel: function ( req, res ) {
		getNginxData( function ( data ) {
			return res.view('controlPanel', {
				title: 'Nginx Manager',
				data: data
			});
		});
	},
	nginxData: function ( req, res ) {
		getNginxData( function ( data ) {
			res.setHeader('Content-Type', 'application/json');
			res.send( JSON.stringify( data, null, 2 ) );
		});
	}
}
