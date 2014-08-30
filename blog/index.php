<?php
//composer autoloader
require 'vendor/autoload.php';

//including custom functions.php
require 'app/includes/functions.php';

//required base path for dispatch views
config('dispatch.views', '../views');
//configuration file for dispatch.php(composer autoloaded)
config('source', 'app/config.ini');

//front page of the blog
on('GET','/index', function() {
    $page = from($_GET, 'page');
    $page = $page ? (int)$page : 1;
    
    $posts = get_posts($page);
    
    if(empty(posts) || $page < 1){
        //a non-existing page
        not_found();
    }
    
    render('main',array(
        'page' => $page,
        'posts' => $posts,
        'has_pagination' => has_pagination($page)
    ));
});

//the post page
on('GET','/:year/:month/:name',function($year, $month, $name){
    $post = find_post($year,$month,$name);
    
    if(!$post){
        not_found();
    }
    
    render('post', array(
        'title' => $post->title .' ⋅ ' . config('blog.title'),
        'p' => $post
    ));
});

//the JSON API
on('GET','/api/json', function() {
    header('Content-type: application/json');
    //print the 10 latest posts as JSON
    echo generate_json(get_posts(1,10));
});

//show the rss feed
on('GET','/rss',function() {
    header('Content-Type: application/rss+xml');
    //show and rss feed with the 30 latests posts
    echo generate_rss(get_posts(1,30));
});

//if we get here, nothing has been matched above
on('GET','.*',function(){
    not_found();
});

//Serve the blog
dispatch();
?>