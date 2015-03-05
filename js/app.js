'use strict';

// Declare app level module which depends on views, and components
angular.module('Dutchman', ['ngCookies','ngRoute', 'ngResource', 'ui.bootstrap.modal',"template/modal/backdrop.html","template/modal/window.html",
	'ui.bootstrap.accordion','template/accordion/accordion-group.html','template/accordion/accordion.html'])

.config(['$routeProvider', function($routeProvider) { // This tells angular to render a specific view when 
  $routeProvider.when('/products',					  // you visit the corresponding url
  {
  	templateUrl : 'views/products/index.html',
    scope: { '=ngModel' : '=ngModel'},
  	controller: 'ProductIndexCtrl', // Add the controller to the view
  	controllerAs: 'ProductsCtrl'    // And optionally give an alias to the controller
  }).
  when('/login',{
  	templateUrl : 'views/login/login.html',
    scope: { '=ngModel' : '=ngModel'},
  	controller: 'LoginCtrl' // Add the controller to the view
  }).
  when('/logout',{
    templateUrl : 'views/logout/logout.html',
    scope: { '=ngModel' : '=ngModel'},
    controller: 'LoginCtrl' // Add the controller to the view
  }).
  when('/settings',{
    templateUrl : 'views/settings/settings.html',
    scope: { '=ngModel' : '=ngModel'},
    controller: 'SettingsCtrl' // Add the controller to the view
  }).
  when('/logtest',{
    templateUrl : 'views/login/loginTest.html',
    controller: 'LoginCtrl' // Add the controller to the view
  }).
  when('/help',{
    templateUrl : 'views/help/help.html',
    controller: 'HelpCtrl' // Add the controller to the view
  }).
  when('/adduser',{
    templateUrl : 'views/user/adduser.html',
    controller: 'UserCtrl' // Add the controller to the view
  }).
  otherwise({redirectTo: '/products'}); // A default route for anything that does not match a specific route.
}]);


