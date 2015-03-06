angular.module('Dutchman')

.factory('User',['$cookieStore','$rootScope','$http',function UserFactory($cookieStore,$rootScope,$http){
	var dbUrl = "http://pub.jamaica-inn.net/fpdb/api.php?";
	var UserInfo;
	var self = this;

	// We need this because there are no role field in the API database...
	var admins = [
		'Ervin','Hiram','Jory','Sasa','Sasa'
	];

	function checkAdmin(name){
		var length = admins.length;
		for(var i = 0; i < length; i++){
			if(admins[i].search(name) === 0) {
				return true;
			}
		}
		return false;
	}

	return {
		authenticate: function(user, callback){
			$http.get(dbUrl + "username=" + user.name + "&password=" + user.password + "&action=iou_get")
			.success(function(data){
				var result = data.payload[0];
				var userObj = {first_name  : result.first_name, last_name : result.last_name, user_name: user.name};

				// Check is user is admin or vip
				if(checkAdmin(result.first_name)) {
					userObj.role = "admin";
				} else {
					userObj.role = "vip";
				}

				// Save user as a cookie and to rootscope
				$cookieStore.put('userInfo',userObj);

				// See if user exists
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

		}, 
		addUser: function(user){
			return $http.post(dbUrl + "&action=user_edit" + "&new_username=" + addUser.username + "&new_password="
			 + addUser.password + "&first_name=" + addUser.fname + "&last_name=" + addUser.lname + "&email="
			  + addUser.email + "&phone=" + addUser.phone + "");
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

