const {Post} = require('../models');

const  postData = [
    {
        title: 'Why is MVC so important',
        content: 'MVC allows developers to maintain a true separation of concerns...',
        user_id: 1
    },
    {
        title: 'Authenticaton vs. Authorization',
        content: 'Authentication means confirming your own identity, authorization gives you access to the system.',
        user_id: 2
    },
    {
        title: 'ORM Mapping',
        content: 'It is a great way to create queries in SQL.',
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;