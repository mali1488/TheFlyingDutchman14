angular.module('Dutchman')
.factory('User',  function UserFactory($http){
	var dbUrl = "http://pub.jamaica-inn.net/fpdb/api.php?";
	return {
		authenticate: function(user, callback){
			$http.get(dbUrl + "username=" + user.name + "&password=" + user.password)
			.success(function(data){
				var result = data.payload[0];
				if(result.code === 1){
					callback({authenticated : false, msg: "Wrong username"});
				}
				else if(result.code === 2){
					callback({authenticated : false, msg: "Wrong password"});
				}
				else {
					callback({authenticated : true, msg: "Success!"});
				}
			});

		}
	};
});

