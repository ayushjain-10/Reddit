const Post = require('../models/post');

module.exports = (app) => {

    app.get('/', (req, res) => {
        const currentUser = req.user;
        Post.find({}).lean()
            .then((posts) => res.render('posts-index', { posts, currentUser }))
            .catch((err) => {
                console.log(err.message);
            })
    })

    app.get('/posts/new', (req, res) => {
        const currentUser = req.user;
        res.render('posts-new', { currentUser });
    });

    // CREATE
    app.post('/posts/new', (req, res) => {
        if (req.user) {
            const post = new Post(req.body);
                post.save(() => res.redirect('/'));
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // LOOK UP THE POST
    app.get('/posts/:id', (req, res) => {
        const currentUser = req.user;
        Post.findById(req.params.id).lean().populate('comments')
            .then((post) => res.render('posts-show', { post, currentUser }))
            .catch((err) => {
                console.log(err.message);
            });
    });

    // SUBREDDIT
    app.get('/n/:subreddit', (req, res) => {
        const currentUser = req.user;
        Post.find({ subreddit: req.params.subreddit }).lean()
            .then((posts) => res.render('posts-index', { posts, currentUser }))
            .catch((err) => {
                console.log(err);
            });
    });

};