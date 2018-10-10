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
  cookie: {maxAge: (120*60*1000)}
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
  });

  // When this route is reached, the API to get a cart's contents is reached
  app.get('/api/cart/contents', (req, res) => {
    // If there is not already a cart declared for the current session
    if (!req.session.cart) {
      // Declare an empty cart
      req.session.cart = [];
    }

    // Get and store the session's cart
    const cart = req.session.cart;
    res.send(cart);
  });

  // When this route is reached, the API to clear a session's cart is reached
  app.get('/api/cart/clear', (req, res) => {
    // Set the session's cart to an empty array (clearing it)
    req.session.cart = [];
    res.end();
  });

  // When data is posted to this route, the API to add an item to the cart is accessed
  app.post('/api/cart/additem', (req, res) => {
    // Declare a new object for the product being added
    let product = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      size: req.body.size,
      finish: req.body.finish,
      previewImage: req.body.imgPath
    }

    // If there is not already a cart declared for the current session
    if (!req.session.cart) {
      // Declare an empty cart
      req.session.cart = [];
    }

    // Add the new product to the cart
    req.session.cart.push(product);

    // Save the session and end the request
    req.session.save();
    res.end();
  });

  // When data is posted to this route, the API to add an item to the cart is accessed
  app.post('/api/cart/removeitem', (req, res) => {
    /////////////////////////////////////////////////////////////
    ////IMPORTANT: POST request MUST BE x-www-form-urlencoded////
    /////////////////////////////////////////////////////////////

    // If there is not already a cart declared for the current session
    if (!req.session.cart) {
      // Declare an empty cart
      req.session.cart = [];
    }

    // Store the index of the item to be removed
    let itemIndex = req.body.itemIndex;

    // Remove the item from the cart
    req.session.cart.splice(itemIndex, 1);

    // Save the session and end the request
    req.session.save();
    res.end();
  });

  app.listen(process.env.PORT || 3000, () => console.log(`App listening on port ${process.env.PORT || 3000}!`));

  // Static files and directories
  app.use(express.static('public'));
})
