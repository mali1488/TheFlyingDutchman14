angular.module('Dutchman')
.factory('Inventory', function InventoryFactory($http){
	var dbUrl = "http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod";
	return {
		reeStock: function(id,amount, price){
			return $http.post(dbUrl + "&action=inventory_append&beer_id=" + id + "&amount=" + amount + "&price=" + price, "");
		}
}});