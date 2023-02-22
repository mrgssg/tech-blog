const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// route to get all comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => { 
        console.log(err);
        res.status(500).json(err);
    })
});

// routes to: get a comment
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id}
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// ...create a comment
router.post('/', withAuth, (req, res) => {
    // check the session and use the id from the session
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    }
});

// ...update a comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
    },
    {
        where: {
            id: req.params.id
        }
    }).then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'no comment found with this id'});
            return;
        }
        res.json(dbCommentData);
    })  .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// ...delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }) .then(dbCommentData => {
        if (!dbCommentData) {
            res.status(404).json({ message: 'no comment found with this id'}); 
            return;
        }
        res.json(dbCommentData);
    }) .catch (err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
