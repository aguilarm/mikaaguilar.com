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
            .state('postById', {
                url: '/blog/post/:id',
                templateUrl: '/blog/views/post.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function ($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            })
            .state('postByDate', {
                url: '/blog/posts/:year',
                templateUrl: '/blog/views/home.html',
                controller: 'PostsCtrl',
                resolve: {
                    postsYear: ['$stateParams', 'posts', function ($stateParams, posts) {
                        return posts.get($stateParams.year);
                    }]
                }
            })
            .state('postByDate.month', {
                url: '/:month',
                templateUrl: '/blog/views/home.html',
                controller: 'PostsCtrl',
                resolve: {
                    postsMonth: ['stateParams', 'posts', function ($stateParams, post) {
                        return posts.get($stateParams.month);
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
        //check if we are looking up by id
        if (post.length === 24) {
            return $http.get('/blog/api/postid/' + post).then(function (res) {
                return res.data;
            });
        };
        //check for year
        if (post.length === 4) {
            return $http.get('/blog/api/postdate/' + post).then(function (res) {
                return res.data;
            });
        };
    };
    return o;
}]);

maBlog.controller('MainCtrl', [
    '$scope',
    'posts',
    function ($scope, posts) {
    
        $scope.posts = posts.posts;
        $scope.title = '';
        $scope.error = '';
        
        $scope.addPost = function () {
            if ($scope.title === '') {
                $scope.error = "Please enter a title!";
                return;
            }
            posts.create({
                title: $scope.title,
                date: $scope.date,
                body: $scope.body
            });
        
            $scope.title = '';
            $scope.date = '';
            $scope.body = '';
        };

}]);

maBlog.controller('PostsCtrl', [
    '$scope',
    'posts',
    'postsYear',
    function ($scope, posts, postsYear) {
        $scope.posts = postsYear;
        
}]);