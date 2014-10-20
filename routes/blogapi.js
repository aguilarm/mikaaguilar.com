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
    console.log('postparam');
    var query = Post.findById(id);
    query.exec(function (err, post) {
        if (err) { return next(err); }
        if (!post) { return next(new Error("Cannot find post with id!")); }
        req.post = post;
        return next();
    });
});

//alternatively, get post by url string
router.param('posturl', function (req, res, next, posturl) {
    console.log('posturl');
    var query = Post.find({ url: posturl });
    query.exec(function (err, post) {
        if (err) { return next(err); }
        if (!post) { return next(new Error("Cannot find post with this URL")); }
        req.post = post[0];
        return next();
    });
});

router.get('/api/postid/:post', function (req, res) {
    res.json(req.post);
});

router.get('/api/posturl/:posturl', function (req, res) {
    res.json(req.post);
});

module.exports = router;
    