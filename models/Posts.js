var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    url: String,
    date: {
        type: Date,
        default: Date.now
    },
    summary: String,
    body: String
});

mongoose.model('Post', PostSchema);