const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const Security = require('./util/cartsecurity');
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
    uri: db.url,
    collection: 'sessions'
});

app.use(session({
  secret: 'secret session key',
  resave: false,
  saveUninitialized: true,
  store: store,
  unset: 'destroy',
  name: 'session cookie name',
  cookie: {maxAge: (15*60*1000)}
}));

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

  // When index page is reached
  app.get('/', function(req, res) {
    // Render the HTML
    res.render('index');

    // If there is already a session
    if (req.session.test) {
      console.log(req.session.test);
      req.session.save();
    } else {  // If this is a new session
      req.session.test = 1;
      req.session.save();
      res.end();
    }
  });

  app.get('/test', (req, res) => {
    // If there is already a session
    if (req.session.test){
      req.session.test++;
      console.log(req.session.test);
      req.session.save();
      res.end();
    } else {  // If this is a new session
      req.session.test = 1;
      req.session.save();
      res.end('welcome to the session demo. refresh!');
    }

  });

  app.post('/test', (req, res) => {
    let token = req.body.nonce;
    if(Security.isValidNonce(token, req)) {
      // OK
    } else {
      // Reject the request
    }
  });

  app.listen(process.env.PORT || 3000, () => console.log(`App listening on port ${process.env.PORT || 3000}!`));

  // Static files and directories
  app.use(express.static('public'));
})
