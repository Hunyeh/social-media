const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');

router
  .route('/')
  .get(thoughtController)
  
module.exports = router;