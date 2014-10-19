var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    date: {
        type: Date,
        default: Date.now
    },
    body: String
});

mongoose.model('Post', PostSchema);