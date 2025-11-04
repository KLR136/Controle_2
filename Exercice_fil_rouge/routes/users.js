var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/me', verify, (req, res) => {
  res.json({ message: 'Token valide', user: req.user });
});

module.exports = router;
