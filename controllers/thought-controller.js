const {Thought, User} = require('../models');
const {Types} = require('mongoose');

module.exports = {
    findAllThoughts:(req, res) => {
        Thought.find({}).then(dbThoughtdata => {
            res.json(dbThoughtdata)
        })
    },
    findOneThought: ({params}, res) => {
        Thought.findOne({_id: params.id})
          .populate({
              path: 'reactions',
              select: '-__v'
          })
          .select('__v')
          .then(dbThoughtdata => {
              if (!dbThoughtdata) {
                  res.status(404).json({message: 'no thought found with this id'});
                  return;
              }
              res.json(dbThoughtdata)
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
    },
    addAThought: ({params, body}, res) => {
        console.log(body)
        Thought.create(body)
          .then(({_id}) => {
              return User.findOneAndUpdate(
                  {_id: params.userId},
                  {$push: {thoughts: _id}},
                  {news: true}
              );
          })
          .then(dbThoughtdata => {
              if (!dbThoughtdata) {
                  res.status(404).json({message: 'no user with this id'});
                  return;
              }
              res.json(dbThoughtdata)
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    updateThought: ({params, body}, res) => {
        Thought.findByIdAndUpdate({_id: params.id}, body, {new:true, runValidators:true})
          .then(dbThoughtdata => {
              if (!dbThoughtdata) {
                  res.status(404).json({message: 'no thought with this id!'});
                  return;
              }
              res.json(dbThoughtdata);
          })
          .catch(err => res.status(400).json(err));
    },
    deleteThought: ({params}, res) => {
        Thought.findOneAndDelete({_id: params.id})
          .then(dbThoughtdata => {
              if (!dbThoughtdata) {
                  res.status(404).json({message: 'no thought with this id!'});
                  return;
              }
              res.json(dbThoughtdata)
          })
          .catch(err => res.status(400).json(err));
    },
    addReaction: ({params, body}, res) => {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions:body}},
            {new:true, runValidators:true}
        )
        .then(dbThoughtdata => {
            if (!dbThoughtdata) {
                res.status(404).json({message: 'no thought with this id!'});
                return;
            }
            res.json(dbThoughtdata)
        })
        .catch(err => res.status(400).json(err));
    },
    deleteReaction: ({params}, res) => {
        console.log('thoughtId', params.thoughtId)
        console.log('reactionId', params.reactionId)
        Thought.findOneAndUpdate(
            {_id: Types.ObjectId(params.thoughtId)},
            {$pull: {reactions:{reactionId:Types.ObjectId(params.reactionId)}}},
            {safe: true},
        )
        .then(dbThoughtdata => {
            if (!dbThoughtdata) {
                res.status(404).json({message: 'no thought with this id!'});
                return;
            }
            console.log(dbThoughtdata)
            res.json(dbThoughtdata)
        })
        .catch(err => res.status(400).json(err));
    }
};