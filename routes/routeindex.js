// Assemble all routes from all files and pass them to app.js

const mainRoutes = require('./routes')
const apiRoutes = require('./apiroutes')

module.exports = function(app, db) {
  mainRoutes(app, db);
  apiRoutes(app, db);
}
