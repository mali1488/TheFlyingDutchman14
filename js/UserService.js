angular.module('Dutchman')
.factory('User',  function UserFactory($http){
	var dbUrl = "http://pub.jamaica-inn.net/fpdb/api.php?";
	return {
		authenticate: function(username, password){
			var auth = {authenticated : false, code: -1};
			$http.get(dbUrl + "username=" + username + "&password=" + password)
			.success(function(data){
				var result = data.payload[0];
				if(result.code === 1){
					auth = {authenticated : false, msg: "Wrong username"};
				}
				else if(result.code === 2){
					auth = {authenticated : false, msg: "Wrong password"};
				}
				else {
					auth = {authenticated : true, msg: "Success!"};
				}
				return auth;
			});

		}
	};
});