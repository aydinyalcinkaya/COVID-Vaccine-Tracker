var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/addperson', function(req, res, next) {
  res.render('addperson', { title: 'Add New Person' });
});

module.exports = router;
