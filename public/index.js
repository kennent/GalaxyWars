const express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index.html');
});

// router.get('/reset', (req, res, next) => {
//     res.render('reset.html');
// });

module.exports = router;