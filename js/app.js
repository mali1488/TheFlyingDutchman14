'use strict';

// Declare app level module which depends on views, and components
angular.module('Dutchman', ['ngRoute', 'ngResource', 'ui.bootstrap.modal',"template/modal/backdrop.html","template/modal/window.html",
	'ui.bootstrap.accordion','template/accordion/accordion-group.html','template/accordion/accordion.html'])

.config(['$routeProvider', function($routeProvider) { // This tells angular to render a specific view when 
  $routeProvider.when('/products',					  // you visit the corresponding url
  {
  	templateUrl : 'views/products/index.html',
    scope: { '=ngModel' : '=ngModel'},
  	controller: 'ProductIndexCtrl', // Add the controller to the view
  	controllerAs: 'ProductsCtrl'    // And optionally give an alias to the controller
  }).
  otherwise({redirectTo: '/products'}); // A default route for anything that does not match a specific route.
}]);


