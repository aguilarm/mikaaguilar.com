angular.module('maBlog').config(['$stateProvider',
    function ($stateProvider) {
        // Blog posts state routing
        $stateProvider.
        state('mainPage', {
            url: '/blog',
            templateUrl: 'modules/blog/views/blog-main.view.html'
        }).
        state('listPosts', {
            url: '/blog/posts',
            templateUrl: 'modules/blog/views/blog-list-posts.view.html'
        }).
        state('viewPost', {
            url:'/blog/:postId',
            templateUrl: 'modules/blog/views/blog-view-post.view.html'
        });
    }
]);