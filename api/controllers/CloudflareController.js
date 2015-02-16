var cloudflare = require('cloudflare').createClient({
	email: 'taylor@hyprtxt.com',
	token: '5e6258200fedadb59be06a64c1793901103c4'
});

module.exports = {
	listDomains: function ( req, res ) {
		// List all available domains
		cloudflare.listDomains(function (err, domains) {
			if (err) throw err;
			res.send( JSON.stringify( domains ) );
		});
	}
}