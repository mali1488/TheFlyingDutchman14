angular.module('Dutchman')

.controller('UserCtrl',['$scope',function($scope){

	function addUser(fname, lname, username, password, email, phone){
		return $http.get(dbUrl + "&action=user_edit" + "&new_username=" + username + "&new_password="
			 + password + "&first_name=" + fname + "&last_name=" + lname + "&email=" + email + "&phone=" + phone);
		
	}
	
}]);
