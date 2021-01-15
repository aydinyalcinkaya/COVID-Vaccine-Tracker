var express = require('express');
var Person = require('../person.js')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET New User page. */
router.get('/newperson', function(req, res) {
  res.render('newperson', { title: 'Add New User' });
});

/* GET add person page. */
router.get('/addperson', function(req, res) {
  res.render('addperson', { title: 'Add New Person' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
      res.render('userlist', {
          "userlist" : docs
      });
  });
});

/* POST to Add User Service */
router.post('/addperson', function(req, res) {

  // Set our internal DB variable
  var db = req.db;
  var bd = req.body;

    // Get our form values. These rely on the "name" attributes
  var p = new Person(bd.firstName, bd.lastName, bd.birthDate, bd.sex, bd.cardNumber, bd.hadCovid, bd.firstDoseDate, bd.secondDoseDate);

  // Set our collection
  var collection = db.get('usercollection');

  console.log(JSON.stringify(p));
  // Submit to the DB
  collection.insert(p, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("userlist");
      }
  });

});

module.exports = router;
