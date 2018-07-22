const routes = require('express').Router();

routes.get('/', (req, res) => res.render('index'));


routes.get('/software', (req, res) => res.render('software'))
routes.get('/photography', (req, res) => res.render('photography'))

module.exports = routes;