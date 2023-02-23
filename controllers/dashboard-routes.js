const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'create_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_tex', 'post_id', 'user_id', 'create_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true}));
        res.render('dashboard', {posts, loggedIn: truea});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'create_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'create_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'no post found with this id'});
            return;
        }
        // serialize post data
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', {post, loggedIn: true});
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// sending users to sign in after signing up
router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;