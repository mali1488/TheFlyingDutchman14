angular.module('Dutchman')

.controller('LoginCtrl',['$cookieStore','$scope','User', '$location','$rootScope',function($cookieStore,$scope, User, $location,$rootScope){


	$scope.authenticate = function(user){
		this.auth = {};
		var self = this;
		//User is the factory UserService
		User.authenticate(user,function(data){
			if(data.authenticated){
				$location.path('/products');
			} else {
				alert(data.msg);
			}
		});
	}

	$scope.logOut = function(){
		// ---coockie test---
		//console.log("cookie get");
		//console.log($cookieStore.get('userInfo'));
		// -----endtest------

		// Fetsch user info. Need to do this when page has been refreshed.
		$rootScope.currentUser = $cookieStore.get('userInfo');
		// Remove the cookie
		$cookieStore.remove('userInfo');
		$location.path('/logout');
	}

}]);
