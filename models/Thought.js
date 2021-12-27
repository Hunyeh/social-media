const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280
    },
    createdAt: {
        type: String,
        default: Date.now,
        get: formatTime
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

function formatTime() {
    return moment(this.createdAt).format('MM/DD/YYYY')
};

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;