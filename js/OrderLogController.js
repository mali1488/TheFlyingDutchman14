angular.module('Dutchman')
.controller('OrderLogCtrl', ['$scope','$rootScope','User','$http', function ($scope, $rootScope, User, $http){
	$scope.orders = [];

	User.getAllOrders(function(data){
		$scope.orders = data;
	});
}]);