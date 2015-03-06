angular.module('Dutchman')
.factory('Products', function ProductsFactory($http){
	var dbUrl = "http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod";
	return {
		all: function(){
			return $http.get(dbUrl + "&action=inventory_get");
		},
		get: function(id){
			return $http.get(dbUrl + "&action=beer_data_get&beer_id=" + id);
			}
		}
});