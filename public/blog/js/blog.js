var maBlog = angular.module('maBlog', ['ui.router']);

maBlog.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('blog', {
                url: '/blog/',
                templateUrl: 'views/blog.html',
                controller: 'MainCtrl',
                resolve: {
                    postPromise: ['posts', function (posts) {
                        return posts.getAll();
                    }]
                }
            })
            .state('posts', {
                url: '/posts/:id',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl',
                resolve: {
                    post: ['$stateParams', 'posts', function ($stateParams, posts) {
                        return posts.get($stateParams.id);
                    }]
                }
            });
        
        $urlRouterProvider.otherwise('/');
        
        $locationProvider.html5Mode(true);
        
}]);

maBlog.factory('posts', ['$http', function ($http){
    var o = {
        posts: []
    };
    o.getAll = function() {
        return $http.get('/blogapi/').success(function (data) {
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post) {
        return $http.post('/blogapi/posts', post).success(function (data) {
            o.posts.push(data);
        });
    };
    o.get = function (id) {
        return $http.get('/blogapi/posts/' + id).then(function (res) {
            return res.data;
        });
    };
    return o;
}]);

maBlog.controller('MainCtrl', [
    '$scope',
    'posts',
    function ($scope, posts) {
    $scope.posts = posts.posts;
}]);