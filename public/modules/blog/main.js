var maBlog = angular.module('maBlog', []);
maBlog.factory('Config', function () {
    return {
        title:"Post Title",
        body:"Post body, it's usually quite long.  Also tends to have a fair bit of rambling.  Today, not so much.",
        sizeSmall: "100px"
    }
})

//grab the Config service and inject it into the scope 
function addConfig ($scope, Config) {
    $scope.config = Config;
}


//second one to toy with data
function secondCtrl ($scope, Config) {
    //not in use
}


maBlog.directive("post", function () {
    return {
        //restrict defaults to A or attribute, so if you're making an attr you don't need restrict:
        restrict: "E",
        //scope needs to be set to limit it to each directive instance
        scope:{
            //if you put an "@", the item is set as an attr
            size:"@"
        },
        //template: for elements, link: for attr, if attr you can just return a function without any of this
        template: "<p>This is a post, as a directive element.  It's usually pretty long.  But not today!</p>" +
            "<p>The post size attribute is set to {{size}}</p>"
        
    }
})