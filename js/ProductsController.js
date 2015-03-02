angular.module('Dutchman')
.controller('ProductIndexCtrl', ['$location','$timeout','Inventory','$rootScope','$cookieStore','$scope','Products', 'Order', '$modal', 
function($location,$timeout,Inventory,$rootScope,$cookieStore,$scope, Products,Order ,$modal){

	$scope.products = [];
	$scope.user = $cookieStore.get('userInfo');
	// Load the product list
	Products.all().success(function(data){
		$scope.products = data.payload;
	});

	// start timer for a user, 30000 ms = 30 seconds
    var timer = $timeout( function() { 
    	$scope.callAtTimeout(); 
    },3000000);

	$scope.callAtTimeout = function(){
		// Delete timer
		$timeout.cancel(timer);
		$rootScope.currentUser = $cookieStore.get('userInfo');
		$rootScope.loggedin = false;
		$location.path('/logout');
	}

	$scope.buy = function(id){
		Order.add(id);
	}	

	$scope.reeStock = function(id,amount, price) {
		console.log('restocking');
		console.log(id+amount+price);
		Inventory.reeStock(id,amount, price);
	}
	// Product info modal window 
	var modalInstance = null;
	$scope.openInfo = function(selected){

		modalInstance = $modal.open({
			templateUrl: 'views/products/infomodal.html',
			controller: function($scope, Products){
						$scope.item = {};
					// Just closes the modal.
					$scope.ok = function(){
							modalInstance.close();
							modalInstance = null;
						}
					// Get specific product for the modal
					Products.get(selected.beer_id).success(function(data){
						$scope.item = data.payload[0];
						});
			}
		});
	}

	$scope.reeStockInfo = function(selected,st){

		modalInstance = $modal.open({
			templateUrl: 'views/products/inforeestock.html',
			controller: function($scope, Products){

					$scope.reeStock = function(id,amount, price) {
					console.log('restocking');
					console.log(amount);
					console.log(price);
					console.log(id);

					Inventory.reeStock(id,amount, price);
					modalInstance.close();
					modalInstance = null;
				}
						$scope.item = {};
				
					// Get specific product for the modal
					Products.get(selected.beer_id).success(function(data){
						$scope.item = data.payload[0];
						$scope.stock = st;
						});
			}
		});
	}
}]);
