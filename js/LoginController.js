angular.module('Dutchman')

.controller('LoginCtrl',['$translate','$window','Auth','$cookieStore','$scope','User', '$location','$rootScope','$modal',
	function($translate,$window,Auth,$cookieStore,$scope, User, $location,$rootScope,$modal,$dialogs){

	$translate.use('swe');
	$rootScope.loggedIn = $cookieStore.get('loggedin');
	$scope.drop = false;
	
	$scope.lang = function(lang){
		switch (lang){
			case 'swe':
				console.log("swe");
				$translate.use('swe');
			break;
			case 'en':
				console.log("en");
				$translate.use('en');
			break;
		}
		

	};

	$scope.authenticate = function(user){
		this.auth = {};
		var self = this;
		User.authenticate(user,function(data){
			if(data.authenticated){

				//set initial variables
				if($cookieStore.get('theme') === undefined) {
					$cookieStore.pus('theme','default');
					$rootScope.theme = 'default';
				}
				$cookieStore.put('loggedin',true);
				$rootScope.loggedIn = true;

				//change view
				$location.path('/products');
			} else {
				// wring username or password
				$scope.openAlert(data.msg);
			}
		});
		
	}

	$scope.logOut = function(){
		// Fetsch user info. Need to do this when page has been refreshed.
		$rootScope.currentUser = $cookieStore.get('userInfo');
		$cookieStore.put('loggedin',false);
		$rootScope.loggedin = false;
		$cookieStore.remove('userInfo');
		$cookieStore.remove('loggedin');
		$rootScope.currentUser = null;
		$location.path('/logout');
	}

	$scope.openAlert = function(msg){
			$scope.message = msg;
			modalInstance = $modal.open({
				templateUrl: 'views/login/loginmodal.html',
				windowClass: 'center-modal',
				controller: function($scope){
							$scope.message = msg;
							// Just closes the modal.
							$scope.ok = function(){
								modalInstance.close();
								modalInstance = null;
							}
						
				}
			});
		}

}]);
