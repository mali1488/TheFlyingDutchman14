angular.module('Dutchman')

.controller('MainCtrl',['$scope',function($scope){
	$scope.user = {};

	$scope.getUser = function(){
		return $scope.user;
	}

	$scope.setUser = function(user){
		$scope.user = user;
	}
}]);