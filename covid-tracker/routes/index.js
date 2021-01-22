var express = require('express');
var Person = require('../person.js')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/* GET New User page. */
router.get('/newperson', function (req, res) {
  res.render('newperson', {
    title: 'Add New User'
  });
});

/* GET PERSONLIST page. */
router.get('/personlist', async function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.findOneAndUpdate({
    firstName: "Emilio"
  }, {
    $set: {
      firstName: "Emilio" + 'cheese'
    }
  });

  var people = await collection.find({}, {
    sort: {
      priority: -1,
      birthDate: 1
    }
  });

  people = Object.values(people);
  people[0].firstName = 'Sermet';
  console.log(people[0].firstName);


  collection.find({}, {
    sort: {
      priority: -1,
      birthDate: 1
    }
  }, function (e, docs) {
    res.render('personlist', {
      "personlist": docs,
      title: "Person List"
    });
  })
});


/* GET add person page. */
router.get('/addperson', function (req, res) {
  res.render('addperson', {
    title: 'Add New Person'
  });
});

/* POST to Add User Service */
router.post('/addperson', function (req, res) {

  // Set our internal DB variable
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
    priority = 2;
  } else if (bd.priority == "essentialWorker") {
    priority = 1;
  } else if (bd.priority == "healthCareWorker") {
    priority = 3;
  } else {
    priority = 0;
  }

  // Get our form values. These rely on the "name" attributes
  var person = new Person(firstName, lastName, dateInMilleseconds.getTime(), sex, healthCardNumber, bd.firstDoseDate, bd.secondDoseDate, email, phoneNumber, priority);

  // Set our collection
  var collection = db.get('usercollection');



  console.log(JSON.stringify(person));
  // Submit to the DB
  collection.insert(person, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    } else {
      // And forward to success page
      res.redirect("personlist");
    }
  });

});

router.get('/setdates', function (req, res) {
  res.render('setdates', {
    title: 'Set Dates'
  });
})

router.post('/setdates', async function (req, res) {
  var db = req.db;
  var collection = db.get('usercollection');

  var people = await collection.find({}, {
    sort: {
      priority: -1,
      birthDate: 1
    }
  });
  
  people = Object.values(people);
  //delete people[0]["_id"];
  var date = new Date().getTime();
  var today = new Date(date);
  

  for(var i = 0; i < people.length; i++) {

    var today = new Date(date);

    collection.remove({_id: people[i]._id});
    delete people[i]["_id"];
    people[i].firstDoseDate = today.toDateString();
    date+=86400000;
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
  }, {castIds: false});
});

module.exports = router;