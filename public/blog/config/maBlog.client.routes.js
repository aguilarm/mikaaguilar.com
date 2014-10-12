angular.module('maBlog').config(['$stateProvider',
    function ($stateProvider) {
        // Blog posts state routing
        $stateProvider.
        state('mainPage', {
            url: '/',
            templateUrl: 'index.html'
        }).
        state('listPosts', {
            url: '/blog/posts',
            templateUrl: 'modules/blog/views/blog-list-posts.view.html'
        }).
        state('viewPost', {
            url:'/blog/:postId',
            templateUrl: 'modules/blog/views/blog-view-post.view.html'
        });
        
        $urlRouterProvider.otherwise('mainPage');
    }
]);

/*maBlog.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {
//resolve ensures that any time home is entered, we always load all of the posts
//before the state finishes loading.  a blocking preload?
//more info at
//https://github.com/angular-ui/ui-router/wiki
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
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
  
  $urlRouterProvider.otherwise('home');
  
  //$locationProvider.html5Mode(true);
  
}]);