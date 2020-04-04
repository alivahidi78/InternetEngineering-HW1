const express = require('express');
const router = express.Router();
const logger = require('./logger');

router.use('/', (req, res, next) => {
    logger.log('info', 'REQUEST RECIEVED - Method:' + req.method +
        " Query:" + JSON.stringify(req.query) + " body:" + JSON.stringify(req.body));
    next();
})
module.exports = router;