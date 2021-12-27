const {User} = require('../models');

let userData = [
    {
        username: "Billybob",
        email: "billybob123@mail.com"
    }
];

const userSeeds = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = userSeeds;