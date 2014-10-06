var maBlog = angular.module('maBlog', []);
maBlog.factory('Config', function () {
    return {
        title:"Post Title",
        body:"Post body, it's usually quite long.  Also tends to have a fair bit of rambling.  Today, not so much.",
        sizeSmall: "100px",
        date: "Yestermorrow"
    }
})

//grab the Config service and inject it into the scope 
maBlog.controller("addConfig", function ($scope, Config) {
    $scope.config = Config;
})


//second one to toy with data
function secondCtrl ($scope, Config) {
    //not in use
}


maBlog.directive("post", function () {
    return {
        //restrict defaults to A or attribute, so if you're making an attr you don't need restrict:
        restrict: "E",
        //replace can make the compiler remove the element wrapper, in this case post, and just put the template
        replace:"true",
        //scope needs to be set to limit it to each directive instance
        scope:{
            //if you put an "@", the item is set as an attr.  can use {{}}
            size:"@",
            //if you put an "=" the binding is set both ways so from directive to controller.  no {{}} needed
            //this way you can edit things INSIDE the directive and send that info out to the service
            date:"="
            //& would use the scope from the parent angular construct, like a controller
        },
        //template: for elements, link: for attr, if attr you can just return a function without any of this
        template: '<div><p>Date: {{date}}</p>' +
            '<p>This is a post, as a directive element.  It\'s usually pretty long.  But not today!</p>' +
            '<p>The post size attribute is set to {{size}}</p>' +
            //this goes outside of the directive and binds with the service
            '<input type="text" ng-model="date"></div>'
        
    }
})