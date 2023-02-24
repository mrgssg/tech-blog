const {User} = require('../models');

const userData = [
    {
        username: 'mrgssg',
        password: 'p@ssword'
    },
    {
        username: 'mrgdev',
        password: 'passw0rd'
    },
    {
        username: 'ssgdev',
        password: 'pass3'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;