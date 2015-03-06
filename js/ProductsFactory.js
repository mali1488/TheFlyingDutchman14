// Data service for all users

angular.module('Dutchman')
.factory('Users', function ProductsFactory($http){
	var dbUrl = "http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod";
	return {
		all: function(){
			return $http.get(dbUrl + "&action=iou_get_all");
		}
}});