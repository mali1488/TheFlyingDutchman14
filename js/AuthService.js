angular.module('Dutchman')

.factory('Auth', function AuthFactory(){
	var loggedIn = "";
	return {
		getStatus: function () {
			return loggedIn;	
		},
		setStatus: function (value) {
			loggedIn = value;
		}
}});