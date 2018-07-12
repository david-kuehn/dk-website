const routes = require('express').Router();

routes.get('/', (req, res) => res.render('index'));
routes.get('/developer', (req, res) => res.render('developer'))
routes.get('/photographer', (req, res) => res.render('photographer'))

module.exports = routes;
