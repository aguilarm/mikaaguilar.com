'use strict';

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Post = mongoose.model('Post');

//TODO: make some kind of index page with possible queries as buttons or something
//For now it's just going to do the same thing /api/posts does...
router.get('/api', function (req, res) {
    Post.find(function (err, posts) {
        if (err) {
            return next(err);
        }
        res.json(posts);
    });
});

router.get('/api/posts', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) {
            return next(err);
        }
        
        res.json(posts);
    });
});

router.post('/api/posts', function (req, res, next) {
    var post = new Post(req.body);
    
    post.save(function (err, post) {
        if (err) { return next(err); }
        
        res.json(post);
    });
});

//get post by id
router.param('post', function (req, res, next, id) {
    var query = Post.findById(id);
    query.exec(function (err, post) {
        if (err) { return next(err); }
        if (!post) { return next(new Error("Cannot find post!")); }
        req.post = post;
        return next();
    });
});

//posts by year
router.param('postYear', function (req, res, next, year) {
    var start = new Date(year, 0, 1),
        end = new Date(year, 11, 31);
    var query = Post.find({date: {$gte: start, $lt: end}});
    query.exec(function (err, posts) {
        if (err) { return next(err); }
        if (!posts) { return next(new Error("Cannot find posts!")); }
        req.posts = posts;
        return next();
    });
});


router.get('/api/postid/:post', function (req, res) {
    res.json(req.post);
});

router.get('/api/postdate/:postYear', function (req, res) {
    res.json(req.posts);
});

router.get('/api/postdate/:postYear/:postMonth', function (req, res) {
    res.json(req.posts);
});

module.exports = router;
    