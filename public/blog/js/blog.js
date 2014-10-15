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
            .state('post', {
                url:'/post/',
                templateUrl: '/blog/views/home.html',
                controller: 'MainCtrl',
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
            })
            .state('addpost', {
                url: '/blog/addpost/',
                templateUrl: '/blog/views/addpost.html',
                controller: 'MainCtrl'
            })
        
        $urlRouterProvider.otherwise('/blog/');
        
        $locationProvider.html5Mode(true);
        
}]);

maBlog.factory('posts', ['$http', function ($http){
    var o = {
        posts: []
    };
    o.getAll = function() {
        return $http.get('api/').success(function (data) {
            angular.copy(data, o.posts);
        });
    };
    o.create = function(post) {
        return $http.post('api/posts', post).success(function (data) {
            o.posts.push(data);
        });
    };
    o.get = function (id) {
        return $http.get('api/posts/' + id).then(function (res) {
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
    $scope.title = '';
    
    $scope.addPost = function () {
        if($scope.title === '') {return;}
        posts.create({
            title: $scope.title,
            date: $scope.link,
            body: $scope.body
        });
        
        $scope.title = '';
        $scope.date = '';
        $scope.body = '';
    };

}]);