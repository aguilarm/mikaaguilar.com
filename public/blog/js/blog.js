var maBlog = angular.module('maBlog', ['ui.router']);

maBlog.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('blog', {
                url: '/blog/',
                templateUrl: '/blog/views/home.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function (posts) {
                        return posts.getAll();
                    }]
                }
            })
            .state('addpost', {
                url: '/blog/addpost/',
                templateUrl: '/blog/views/addpost.html',
                controller: 'MainCtrl'
            })
            .state('getPost', {
                url: '/blog/posts/:id',
                templateUrl: '/blog/views/post.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function ($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            });
            
        $urlRouterProvider.otherwise('/blog/');
        
        $locationProvider.html5Mode(true);
        
}]);

maBlog.factory('posts', ['$http', function ($http){
    var o = {
        posts: []
    };
    o.getAll = function() {
        return $http.get('/blog/api/').success(function (data) {
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post) {
        return $http.post('/blog/api/posts', post).success(function (data) {
            o.posts.push(data);
        });
    };
    o.get = function (post) {
        if (typeof post === 'string') {
            console.log('postisastring');
            if (post.length === 24) {
                console.log('postisanid');
                return $http.get('/blog/api/postid/' + post).then(function (res) {
                    return res.data;
                });
            };
            //otherwise, it's a url id
            return $http.get('/blog/api/posturl/' + post).then(function (res) {
                console.log('postisaurl');
                return res.data;
            });
        };
        //
    };
    return o;
}]);

maBlog.controller('MainCtrl', [
    '$scope',
    'posts',
    function ($scope, posts) {
    
        $scope.posts = posts.posts;
        $scope.title = '';
        $scope.url= '';
        $scope.error = '';
        
        $scope.addPost = function () {
            if ($scope.title === '' || $scope.url ==='') {
                $scope.error = "Title and url fields are required!";
                return;
            }
            posts.create({
                title: $scope.title,
                url: $scope.url,
                date: $scope.date,
                body: $scope.body
            });
        
            $scope.title = '';
            $scope.url = '';
            $scope.date = '';
            $scope.body = '';
        };

}]);

maBlog.controller('PostsCtrl', [
    '$scope',
    'posts',
    'post',
    function ($scope, posts, post) {
        $scope.post = post;
}]);