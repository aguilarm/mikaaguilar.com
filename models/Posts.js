var mongoose = require('mongoose');

//dates are going to be stored as MMDDYYYY
var PostSchema = new mongoose.Schema({
    title: String,
    date: Number,
    body: String,
});

mongoose.model('Post', PostSchema);