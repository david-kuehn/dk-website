// Handles routing of static files

module.exports = function(app, db) {
  app.get('/', (req, res) => res.render('index'));
}
