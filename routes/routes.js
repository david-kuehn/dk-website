// Handles routing of static files

module.exports = function(app, db) {
  app.get('/', (req, res) => res.render('index'));
  app.get('/btstrp', (req, res) => res.render('index_btstrp'));
}
