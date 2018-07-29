const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

// Enables use of body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Enables EJS, allowing the rendering of static HTML files
app.set('views', __dirname + '/public/html');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)

  // Sets up the external router file
  require('./routes/routeindex')(app, database);

  app.listen(process.env.PORT || 3000, () => console.log(`App listening on port ${process.env.PORT || 3000}!`));

  // Static files and directories
  app.use(express.static('public'));
})
