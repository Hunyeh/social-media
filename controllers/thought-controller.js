const {Thought} = require('../models');

module.exports = {
    findAllUsers:(req, res) => {
        Thought.find({}).then(dbThoughtdata => {
            res.json(dbThoughtdata)
        })
    },

}