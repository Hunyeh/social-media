const router = require('express').Router();
const thoughtController = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(thoughtController.findAllThoughts)
  
// /api/thoughts/:userId
router
  .route('/:userId')  
  .post(thoughtController.addAThought)

// /api/thoughts/:id
router
  .route('/:id')
  .get(thoughtController.findOneThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought)
  
// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(thoughtController.addReaction)

// /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.deleteReaction) 

module.exports = router;