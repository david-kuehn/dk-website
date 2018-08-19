// Gives the app access to the MongoDB database at mLab

var mongoUriBuilder = require('mongo-uri-builder');

var connectionString = mongoUriBuilder({
	username: encodeURIComponent('access'),
	password: encodeURIComponent('F2s5dX#b5!Fx'),
	host: 'ds259351.mlab.com',
	port: 59351,
	database: 'dk-website'
});

console.log(connectionString);

module.exports = {
  url: connectionString
}
