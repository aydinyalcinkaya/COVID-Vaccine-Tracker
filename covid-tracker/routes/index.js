var express = require('express');
var Person = require('../person.js')
var router = express.Router();
const DAY = 86400000;

/**
 * GET function for the HOME page.
 * Renders the index.ejs file.
 */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/**
 * GET function for the NEW PERSON page.
 * Renders the newperson.ejs file.
 * This page is used to take input from the user to add a new person to the database.
 */
router.get('/newperson', function (req, res) {
  res.render('newperson', {
    title: 'Add New User'
  });
});

/**
 * GET function for the PERSON LIST page.
 * Renders the personlist.ejs file.
 * Sorts the collection (database), and sends it as "personlist" to the personlist.ejs file.
 */
router.get('/personlist', async function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');

  collection.find({}, {
    sort: {
      priority: 1,
      birthDate: 1
    }
  }, function (e, docs) {
    res.render('personlist', {
      "personlist": docs,
      title: "Person List"
    });
  })
});

/**
 * GET function for the ADD PERSON page.
 * Receives the data from the form on /newperson, keeps it for the POST request.
 */
router.get('/addperson', function (req, res) {
  res.render('addperson', {
    title: 'Add New Person'
  });
});

/**
 * POST function for the ADD PERSON page.
 * Uses the information from the GET request and creates a person object, then insersts that person object into the collection (database).
 */
router.post('/addperson', function (req, res) {

  var db = req.db;
  var bd = req.body;
  var firstName = bd.firstName;
  var lastName = bd.lastName;
  var sex = bd.sex;
  var healthCardNumber = Number(bd.healthCardNumber);
  var email = bd.email;
  var phoneNumber = bd.phoneNumber;

  var dateInMilleseconds = new Date(bd.birthDate)
  var today = new Date();

  var priority;

  if (bd.priority == "noPriority" && (today.getFullYear() - dateInMilleseconds.getFullYear() >= 70)) {
    priority = 1;
  } else if (bd.priority == "essentialWorker") {
    priority = 2;
  } else if (bd.priority == "healthCareWorker") {
    priority = 0;
  } else {
    priority = 3;
  }

  var person = new Person(firstName, lastName, dateInMilleseconds.getTime(), sex, healthCardNumber, bd.firstDoseDate, bd.secondDoseDate, email, phoneNumber, priority, false);

  var collection = db.get('usercollection');

  console.log(JSON.stringify(person));

  collection.insert(person, function (err, doc) {
    if (err) {
      res.send("There was a problem adding the information to the database.");
    } else {
      res.redirect("personlist");
    }
  });

});
/**
 * GET function for the SET DATES page.
 */
router.get('/setdates', function (req, res) {
  res.render('setdates', {
    title: 'Set Dates'
  });
})

/**
 * POST function for the SET DATES page.
 * Reads the database, and assigns appointments based on age, priority, and alpha.
 */
router.post('/setdates', async function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');

  var people = await collection.find({}, {
    sort: {
      priority: 1,
      birthDate: 1
    }
  });

  people = Object.values(people);

  var dateInMilleseconds = new Date().getTime();

  for (var i = 0; i < people.length; i++) {

    var today = new Date(dateInMilleseconds);

    collection.remove({
      _id: people[i]._id
    });
    delete people[i]["_id"];
    people[i].firstDoseDate = today.toDateString();
    dateInMilleseconds += DAY;
  }
  var today = new Date().getTime();
  if (dateInMilleseconds < today + (DAY * 28)) {
    dateInMilleseconds = today + (DAY * 28);
  }

  for (var i = 0; i < people.length; i++) {

    var today = new Date(dateInMilleseconds);

    people[i].secondDoseDate = today.toDateString();

    dateInMilleseconds += DAY;
  }

  console.log(people);
  people = Object.assign(people);

  collection.insert(people, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send(verr);

    } else {
      // And forward to success page
      res.redirect("personlist");
    }
  }, {
    castIds: false
  });
});

/**
 * GET function for the UPDATE page.
 */
router.get('/update', function (req, res) {
  res.render('update', {
    title: 'Refresh the Database'
  });
})

/**
 * POST function for the UPDATE page.
 * Refreshes certain values, like isVaccinated for each person.
 */
router.post('/update', async function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');

  var people = await collection.find({}, {
    sort: {
      priority: 1,
      birthDate: 1
    }
  });

  people = Object.values(people);

  var dateInMilleseconds = new Date().getTime();

  for (var i = 0; i < people.length; i++) {

    collection.remove({
      _id: people[i]._id
    });
    delete people[i]["_id"];

    var secondDoseDate = new Date(people[i].secondDoseDate).getTime();

    if (secondDoseDate <= dateInMilleseconds) {

      people[i].isVaccinated = true;

    } else {
      
      people[i].isVaccinated = false;

    }
  }

  console.log(people);
  people = Object.assign(people);
  collection.insert(people, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send(verr);

    } else {
      // And forward to success page
      res.redirect("personlist");
    }
  }, {
    castIds: false
  });
});

module.exports = router;