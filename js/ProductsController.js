angular.module('Dutchman')
.controller('ProductIndexCtrl', ['$scope','Products', 'Order', '$modal', function($scope, Products,Order ,$modal){
	$scope.products = [];

	// Load the product list
	Products.all().success(function(data){
		$scope.products = data.payload;
	});

	//$scope.products = Products.getBeers();

	$scope.buy = function(id){
		Order.add(id);
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


}]);