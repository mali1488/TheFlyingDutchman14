angular.module('Dutchman')

.factory('User',['$cookieStore','$rootScope','$http',function UserFactory($cookieStore,$rootScope,$http){
	var dbUrl = "http://pub.jamaica-inn.net/fpdb/api.php?";
	var UserInfo;
	var self = this;
	return {
		authenticate: function(user, callback){
			$http.get(dbUrl + "username=" + user.name + "&password=" + user.password + "&action=iou_get")
			.success(function(data){
				var result = data.payload[0];
				// Set toorscope so we can access it
				$rootScope.currentUser = data.payload[0];
				// Save user as a cookie
				$cookieStore.put('userInfo',result);

				// test cookie
				console.log("coockie: " + $cookieStore.get('userInfo'));
				if(data.type.search('error') === 0){
					if(result.code.search('1') === 0) {
						callback({authenticated : false, msg: "Wrong username"});
					} else if (result.code.search('2') === 0){
						callback({authenticated : false, msg: "Wrong password"});
					} else {
						callback({authenticated : false, msg: "Unknown error"});
					}
				}
				else if(data.type.search('iou_get') === 0){
					callback({authenticated : true, msg: "Success!"});
				}
			});

		}
	};


	function init() {
		if ($window.sessionStorage["userInfo"]) {
			userInfo = JSON.parse($window.sessionStorage["userInfo"]);
		}
	}
		 
	init();

	function getUserInfo() {
		return UserInfo;
	}
}]);

