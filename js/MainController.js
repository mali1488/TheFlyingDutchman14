angular.module('Dutchman')

.controller('MainCtrl',['$scope','$rootScope',function($scope, $rootScope){
	$rootScope.user = $cookieStore.get('userInfo');
	$rootScope.loggedIn = $cookieStore.get('loggedin');
	console.log($scope.user);
	$scope.getUser = function(){
		return $scope.user;
	}

	$scope.setUser = function(user){
		$scope.user = user;
	}

	this.drop = function(ev, ui, item){
		console.log(ev, item);
	}
}]);