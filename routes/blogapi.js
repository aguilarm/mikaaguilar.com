'use strict';

var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Post = mongoose.model('Post');

// blog index
router.get('/blogapi', function (req, res) {
    Post.find(function (err, posts) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(posts);
    });
});

router.get('/blogapi/posts', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) {
            return next(err);
        }
        
        res.json(posts);
    });
});

router.post('/blogapi/posts', function (req, res, next) {
    var post = new Post(req.body);
    
    post.save(function (err, post) {
        if (err) { return next(err); }
        
        res.json(post);
    });
});

router.param('post', function (req, res, next, id) {
    var query = Post.findById(id);
    query.exec(function (err, post) {
        //first throw an error if found through http
        if (err) { return next(err); }
        //again throw and error if the post does not exist for this id
        if (!post) { return next(new Error("Cannot find post!")); }
        //if no errors, toss post to the request object to use later
        req.post = post;
        //http://stackoverflow.com/questions/8710669/having-a-hard-time-trying-to-understand-next-next-in-express-js
        //next calls the next middleware in the que
        //in this case, it is the route handler
        //at least if used in router.post('/posts:post')
        //here this param is called first, THEN the router finishes after retrieving the post
        return next();
    });
});

//for comment upvotes, I also need a comment param
router.param('comment', function (req, res, next, id) {
    console.log('comment param');
    var query = Comment.findById(id);
    query.exec(function (err, comment) {
        if (err) {return next(err); }
        if (!comment) { return next(new Error("Cannot find comment!")); }
        req.comment = comment;
        return next();
    });
});

router.get('/blogapi/posts/:post', function (req, res) {
    //using the populate() method, all of the comments associated with this post
    //are loaded
    req.post.populate('comments', function (err, post) {
    //the post object will be retrieved and added to the req object by
    //the param middleware, so we just have to send the
    //json back to the client
        res.json(req.post);
    });
});

//route for post upvotes
router.put('/blogapi/posts/:post/upvote', function (req, res, next) {
    req.post.upvote(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});

//route for post downvotes
router.put('/blogapi/posts/:post/downvote', function (req, res, next) {
    console.log('downvote');
    req.post.downvote(function (err, post) {
        if (err) { return next(err); }
        res.json(post);
    });
});


//comments routing, per post
router.post('/blogapi/posts/:post/comments', function (req, res, next) {
    //pass the request body into a new Comment mongoose model
    console.log('potato');
    var comment = new Comment(req.body);
    console.log('pajama');
    //check for errors, and save the comment if none
    comment.save(function (err, comment) {
        if (err) { return next(err); }
        //no http errors, add this comment to the comments array
        req.post.comments.push(comment);
        
        req.post.save(function (err, post) {
            if (err) { return next(err); }
            
            res.json(comment);
        });
    });
});

router.get('/blogapi/posts/:post/comments', function (req, res) {
    res.json(req.post.comments);
});

//comment upvotes
router.put('/blogapi/posts/:post/comments/:comment/upvote', function (req, res, next) {
    req.comment.upvote(function (err, comment) {
        if (err) { return next(err); }
        res.json(comment);
    });
});

//comment downvotes
router.put('/blogapi/posts/:post/comments/:comment/downvote', function (req, res, next) {
    req.comment.downvote(function (err, comment) {
        if (err) { return next(err); }
        res.json(comment);
    });
});

module.exports = router;
    