const express = require('express');
const app = express();

// Enables EJS, allowing the rendering of static HTML files
app.set('views', __dirname + '/public/html');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Sets up the external router file
const routes = require('./routes.js')
app.use('/', routes)

app.listen(process.env.PORT || 3000, () => console.log('App listening on port 3000!'));

// Static files and directories
app.use(express.static('public'));
