
// This is the controller for the Order view.
angular.module('Dutchman')

.controller('OrderCtrl', ['$scope','Order' ,function($scope, Order){
	
	$scope.order = Order.all();

	this.addToOrder = function(id){
		Order.add(id);
	};


}]);
