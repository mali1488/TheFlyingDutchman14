
// This is the controller for the Order view.
angular.module('Dutchman')

.controller('OrderCtrl', ['$scope','Order' ,function($scope, Order){
	
	$scope.order = Order.all();

	$scope.addToOrder = function(product){
		Order.add(product);
	};

	$scope.removeFromOrder = function(item){
		Order.delete(item);
	}

	$scope.dec = function(item){ 
		item.quantity--;
		if(item.quantity <= 0)
			$scope.removeFromOrder(item);
	}
	$scope.inc = function(item){
		item.quantity++;
	}

	$scope.checkout = function(){
		console.log("checkout:");
	}

}]);
