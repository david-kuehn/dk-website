// Assemble all routes from all files and pass them to app.js

const apiRoutes = require('./apiroutes')

module.exports = function(app, db) {
  apiRoutes(app, db);
}
