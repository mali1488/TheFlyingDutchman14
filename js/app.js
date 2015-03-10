'use strict';

// Declare app level module which depends on views, and components
angular.module('Dutchman', ['pascalprecht.translate','ngCookies','ngRoute', 'ngResource', 'ngDragDrop', 'ui.bootstrap.modal',"template/modal/backdrop.html","template/modal/window.html",
	'ui.bootstrap.accordion','template/accordion/accordion-group.html','template/accordion/accordion.html'])

.config(['$routeProvider',  '$translateProvider', function($routeProvider,$translateProvider) { // This tells angular to render a specific view when 
  $translateProvider.translations('en', {
    // Login page
    USERNAME: 'Enter username', PASSWORD: 'Enter password', LOGIN: 'Login',
    // index page
    HOME: 'Home', SETTINGS: 'Settings', HELP: 'Help', LOGOUT: 'Logout',
    // Product page
    REESTOCK: 'Need to be restocked: ', TYPE: 'Type', PRICE: 'Price: ', STOCK: 'Stock: ', SEARCH: 'Search...', POPULAR: 'Most popular products',
    // Settings page
    THEME: 'theme: ', DEFAULT: 'Default', XMAS: 'Christmas',
    // Help page
    CONTACT: 'Contact us ', HERE: 'here',
    // Log out page
    LOGINAGAIN: 'Log in', LOGOUTMSG: 'Thank you!',
    POPULAR: 'Most popular products',
    ORDERS: "Orders",
    ORDERLOG : "All orders"
  }).
  translations('swe', {
    // Login page
    USERNAME: 'Ange användarnamn', PASSWORD: 'Ange lösenord', LOGIN: 'Logga in',
    // index page
    HOME: 'Start', SETTINGS: 'Verktyg', HELP: 'Hjälp', LOGOUT: 'Logga ut',
    // Product page
    REESTOCK: 'Behöver fyllas på: ', TYPE: 'Sort', PRICE: 'Pris: ', STOCK: 'Lager: ', SEARCH: 'Sök...',POPULAR: 'Mest köpta produkterna',
    // Settings page
    THEME: 'Tema: ', DEFAULT: 'Standard', XMAS: 'Jultema',
    // Help page
    CONTACT: 'Kontakta oss ', HERE: 'här',
    // Log out page
    LOGINAGAIN: 'Logga in', LOGOUTMSG: 'Tack och välkommen åter!',
    ORDERS: "Beställningar",
    ORDERLOG : "Samtliga beställningar"
  }),

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
  when('/orderlog', {
    templateUrl : 'views/user/orderlog.html',
    controller: 'OrderLogCtrl',
    controllerAs: 'LogCtrl'
  }).
  otherwise({redirectTo: '/products'}); // A default route for anything that does not match a specific route.

}]);

