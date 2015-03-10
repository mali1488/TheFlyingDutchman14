
// This is the controller for the Order view.
angular.module('Dutchman')

.controller('OrderCtrl', ['$scope','$rootScope','Order' ,function($scope,$rootScope, Order){
	
	$scope.order = Order.all();
	

	$scope.addToOrder = function(product){
		Order.add(product);
		$scope.order = Order.all();
	};

	$scope.removeFromOrder = function(item){
		Order.delete(item);

	}

	$scope.dec = function(item){ 
		Order.dec(item);

	}
	$scope.inc = function(item){
		Order.inc(item);
	}

	$scope.checkout = function(){
		console.log($scope.order);
	}

	$scope.drop = function(ev, ui, item){
		console.log($rootScope.curDraggable);
		if($rootScope.curDraggable !== {}){
			Order.add($rootScope.curDraggable);
		}
	}
}]);


