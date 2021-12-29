const {User} = require('../models');
const {Types} = require('mongoose');

module.exports = {
    findAllUsers:(req, res) => {
        User.find({})
          .populate({
              path: 'friends',
              select: '-__v'
          })
          .populate({
              path: 'thoughts',
              select: '-__v'
          })
          .then(dbUserdata => {
            res.json(dbUserdata)
        })
    },
    findOneUser: ({params}, res) => {
        User.findOne({_id: params.id})
          .populate({
              path: 'thoughts',
              select: '-__v'
          })
          .select('-__v')
          .then(dbUserdata => {
              if (!dbUserdata) {
                  res.status(404).json({message: 'no user with this id'});
                  return
              }
              res.json(dbUserdata)
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err)
          });
    },
    createUser: ({params, body}, res) => {
        User.create(body)
          .then(dbUserdata => res.json(dbUserdata))
          .catch(err => res.status(400).json(err));
    },
    updateUser: ({params, body}, res) => {
        User.findByIdAndUpdate({_id: params.id}, body, {new:true, runValidators:true})
          .then(dbUserdata => {
              if (!dbUserdata) {
                  res.status(404).json({message: 'no user with this id!'});
                  return;
              }
              res.json(dbUserdata);
          })
          .catch(err => res.status(400).json(err));
    },
    deleteUser: ({params}, res) => {
        User.findOneAndDelete({_id: params.id})
          .then(dbUserdata => {
              if (!dbUserdata) {
                  res.status(404).json({message: 'no user with this id!'});
                  return;
              }
              res.json(dbUserdata)
          })
          .catch(err => res.status(400).json(err));
    },
    addAFriend: ({params, body}, res) => {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends:{_id: params.friendId}}},
            {new:true, runValidators:true}
        )
        .then(dbUserdata => {
            if (!dbUserdata) {
                res.status(404).json({message: 'no user with this id!'});
                return;
            }
            res.json(dbUserdata)
        })
        .catch(err => res.status(400).json(err));
    },
    deleteFriend: ({params}, res) => {
        console.log('userId', params.userId)
        console.log('friendId', params.friendId)
        User.findOneAndUpdate(
            {_id: Types.ObjectId(params.userId)},
            {$pull: {friends:Types.ObjectId(params.friendId)}},
            {safe: true},
        )
        .then(dbUserdata => {
            if (!dbUserdata) {
                res.status(404).json({message: 'no user with this id!'});
                return;
            }
            console.log(dbUserdata)
            res.json(dbUserdata)
        })
        .catch(err => res.status(400).json(err));
    }
};