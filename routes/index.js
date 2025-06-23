const express = require('express');
const router = express.Router();

const name = 'Evgenii';
const title = 'Express Demo App';

/* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', {
      title: title,
      name: name,});
  });



module.exports = router;