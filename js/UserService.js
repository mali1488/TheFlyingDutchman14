angular.module('Dutchman')

.factory('User',['$cookieStore','$rootScope','$http',function UserFactory($cookieStore,$rootScope,$http){
	var dbUrl = "http://pub.jamaica-inn.net/fpdb/api.php?";
	var dbUrlwithCreds = "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass";
	var UserInfo;
	var self = this;

	/* We need this because there are no role field in the API database...
	   This is purely harcoded informations due to database impolementation.
	*/
	var admins = [
		'Ervin','Hiram','Jory','Sasa','Sasa'
	];

	/* Check if a person that loggs in is in the admins array.
	   This due to no field in the databaes that desribes a users
	   certain role.
	*/
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
				userObj.role = "vip";
				// Save user as a cookie and to rootscope
				$cookieStore.put('userInfo',userObj);
				callback({authenticated : true, msg: "Success!"});
				// See if user exists
				/*
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
				}*/

				callback({authenticated : true, msg: "Success!"});
			});

		}, 
		addUserPost: function(formData){
			var httpPostForm = $http.post(dbUrlwithCreds + "&action=user_edit&user_id=" + formData.userId + "&action=user_edit" + "&new_username=" + formData.username + "&new_password="
			 + formData.password + "&first_name=" + formData.fname + "&last_name=" + formData.lname + "&email="
			  + formData.email + "&phone=" + formData.phone + "&amount=" + formData.amount + "").success(function(data){alert("Success! You have added a new user: " + formData.username )});
			console.log(httpPostForm);
			return httpPostForm;
		},

		getAllOrders: function(callback){
			var user = $rootScope.user.user_name;
			$http.get(dbUrl + "username=" + user + "&password=" + user + "&action=purchases_get").
			success(function(data){
				callback(data.payload);
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

