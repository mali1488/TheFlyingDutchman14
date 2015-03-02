angular.module('Dutchman')

.controller('LoginCtrl',['$window','Auth','$cookieStore','$scope','User', '$location','$rootScope',
	function($window,Auth,$cookieStore,$scope, User, $location,$rootScope){


	$rootScope.loggedIn = $cookieStore.get('loggedin');

	$scope.authenticate = function(user){
		this.auth = {};
		var self = this;
		$cookieStore.put('loggedin',true);
		$rootScope.loggedIn = true;
		//User is the factory UserService
		User.authenticate(user,function(data){
			if(data.authenticated){
				//$window.location.reload();
				$location.path('/products');
			} else {
				alert(data.msg);
			}
		});
		
	}


	$scope.logOut = function(){
		// Fetsch user info. Need to do this when page has been refreshed.
		$rootScope.currentUser = $cookieStore.get('userInfo');
		$cookieStore.put('loggedin',false);
		$rootScope.loggedin = false;
		//$window.location.reload();
		$location.path('/logout');
	}

}]);
