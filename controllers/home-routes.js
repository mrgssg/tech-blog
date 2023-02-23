// this page contains all of the user routes
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const router = require('/express').Router();

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'create_at'
        ],
        include: [
            {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'create_at'],
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
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// sending users to homepage after logging in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// sending users to sign in page after they sign up
router.get('/signup', (req, res) => {
    res.render('signup');
});

// rendering a post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'create_at'
        ],
        include: [
            {model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'creat_at'],
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
        if (!dbPostData) {
            res.status(404).json({ message: 'no post found with that id' });
            return;
        }
        // serialize the data
        const post = dbPostData.get({ plain: true });
        console.log(post);
        res.render('single-post', { post, loggedIn: req.session.loggedIn});

    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// redirecting user to see their posts 
