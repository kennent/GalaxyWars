const express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index.html');
});

module.exports = router;