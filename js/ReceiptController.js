angular.module('Dutchman')
.controller('ReceiptCtrl', ['$scope', '$rootScope', 'Order', function($scope, $rootScope, Order){
	$scope.receipt = Order.getReceipt();
}]);