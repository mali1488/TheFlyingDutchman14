angular.module('Dutchman').
directive('orderPane', function(){
	return {
		restrict: 'E',
		templateUrl: 'views/order/index.html',
		controller: 'OrderCtrl'
	};
});