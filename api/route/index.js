import graphqlRouter from '../graphql';
var express = require('express'),
  router = express.Router();

router.use('/users', require('./users'));

router.use('/media', require('./media'));

router.use(graphqlRouter);

module.exports = router;
