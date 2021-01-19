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

  collection.find({},{sort : {priority : -1, birthDate : 1}},function(e,docs){
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
  var firstName = bd.firstName;
  var lastName = bd.lastName;
  var sex = bd.sex;
  var healthCardNumber = Number(bd.cardNumber);
  var hadCovid;

  if (bd.hadCovid == null) {
    hadCovid = false;
  } else {
    hadCovid = true;
  }

  var priority;

  if (bd.priority == "noPriority") {
    priority = 0;
  } else if (bd.priority == "essential") {
    priority = 1;
  } else if (bd.priority == "healthCare") {
    priority = 2;
  }

  var email = bd.email;
  var phoneNumber = bd.phoneNumber;

  var dateInMilleseconds = new Date(bd.birthDate)
    // Get our form values. These rely on the "name" attributes
  var person = new Person(firstName, lastName, dateInMilleseconds.getTime(), sex, healthCardNumber, hadCovid, bd.firstDoseDate, bd.secondDoseDate, email, phoneNumber, priority);
  
  // Set our collection
  var collection = db.get('usercollection');

  console.log(JSON.stringify(person));
  // Submit to the DB
  collection.insert(person, function (err, doc) {
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
