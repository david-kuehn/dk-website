var ObjectID = require('mongodb').ObjectID;

// Contains all API routes
module.exports = function(app, db) {

  // Gets all items available for purchase in the print store
  app.get('/api/printstore/getitems', (req, res) => {

      // In the 'print-store' collection, get all documents and include all fields except _id
      // Put all the objects into an array
      db.collection('print-store').find({}, { _id: 0 }).toArray(function (err, result) {
        // If there's an error, throw it
        if (err) throw err;

        // Send the array as the response
        res.send(result);
      });
  });
};
