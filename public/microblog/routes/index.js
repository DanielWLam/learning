var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var Post = require('../models/post');

/* GET home page. */
router.get('/', function(req, res, next) {
    Post.get(null, function(err, posts) {
        if (err) {
            posts = [];
        }
        res.render('index', {
            title: 'Index',
            posts: posts
        });
    });
});

// router.post('/reg',checkNotLogin);
router.post('/reg', function(req, res) {
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', 'the two passwords can not be the same!');
        return res.redirect('/reg');
    }

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        name: req.body.username,
        password: password
    });

    User.get(newUser.name, function(err, user) {
        if (user) {
            err = 'Username already exists.';
        }

        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }

        newUser.save(function(err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            };

            req.session.user = newUser;
            req.flash('success', 'register successfully');
            res.redirect('/');
        })
    })
});

// router.get('/reg',checkNotLogin);
router.get('/reg', function(req, res) {
    res.render('reg', {
        title: 'Register'
    });
});

router.get('/login', checkNotLogin);
router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

router.post('/login', checkNotLogin);
router.post('/login', function(req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function(err, user) {
        if (!user) {
            req.flash('error', 'User is not exists!');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', 'password is wrong');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', 'Login successfully');
        res.redirect('/');
    });
});

router.get('/logout', checkLogin);
router.get('/logout', function(req, res) {
    req.session.user = null;
    req.flash('success', 'logout successfully');
    res.redirect('/');
});

router.post('/post', checkLogin);
router.post('/post', function(req, res) {
    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.post);
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', 'post successfully');
        res.redirect('/');
    });
})

router.get('/u/:user', function(req, res) {
    User.get(req.params.user, function(err, user) {
        if (!user) {
            req.flash('error', 'user doesn"t exists');
        }
        Post.get(user.name, function(err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('user', {
                title: user.name,
                posts: posts
            })
        })
    })
})

function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', 'already login');
        return res.redirect('/');
    }
    next();
}

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'not log in');
        return res.redirect('/login');
    }
    next();
}

module.exports = router;