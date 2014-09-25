var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/public'));

//subpathing 
//can also be used, saving for later
//this would handle mikaaguilar.com/blog
//would only work with static files, so I'll want to
//use views there
//app.use('/blog', express.static(__dirname + '/blog'));

app.listen(process.env.PORT || 3000);