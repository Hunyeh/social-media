const router = require('express').Router();
const userController = require('../../controllers/user-controller');

// /api/users/
router
  .route('/')
  .get(userController.findAllUsers)
  .post(userController.createUser)

  // /api/users/:id
router
  .route('/:id')
  .get(userController.findOneUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser)

// /api/users/:userId/friends/:friendId
router 
  .route('/:userId/friends/:friendId')
  .post(userController.addAFriend)
  .delete(userController.deleteFriend)

module.exports = router;