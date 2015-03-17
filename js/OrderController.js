
// This is the controller for the Order view.
angular.module('Dutchman')
.controller('OrderCtrl', ['$scope', 'Undo','$rootScope','Order', '$location' , '$cookieStore',
	function($scope, Undo ,$rootScope, Order, $location, $cookieStore){
	
	$scope.order = Order.all();
	this.commandoQueue = $rootScope.commandoQueue;

	$scope.addToOrder = function(product){
		Order.add(product);
		$scope.order = Order.all();
	};


	$scope.removeFromOrder = function(item){
		console.log(item);
		Undo.addCommando('remove',item.product);
		Order.delete(item);
	}

	$scope.dec = function(item){ 
		Order.dec(item);

	}
	$scope.inc = function(item){
		console.log("inc");
		Order.inc(item);
	}

	$scope.checkout = function(){
		Order.checkout(function(result){
			console.log("Redirect /receipt");
			$rootScope.loggedIn = false;
			$cookieStore.remove('loggedIn');

			$rootScope.currentUser = null;//$cookieStore.get('userInfo');
			$cookieStore.remove('userInfo');
			$location.path('/receipt');
		});

	}

	$scope.drop = function(ev, ui, item){
		console.log($rootScope.curDraggable);
		if($rootScope.curDraggable !== {}){
			Undo.addCommando('add',$rootScope.curDraggable);
			Order.add($rootScope.curDraggable);
		}
	}

	$scope.undo = function() {
		var commandoItem = Undo.popUndo();
		console.log("commando item: ", commandoItem);
		switch(commandoItem.type) {
			case 'add':
				Order.delete({id:commandoItem.product.beer_id});
				break;
			case 'remove':
				Order.add(commandoItem.product);
				break;
		}
	}

	$scope.redo = function() {
		var commandoItem = Undo.popRedo();
		console.log("redo: ", commandoItem);
		switch(commandoItem.type) {
			case 'add':
				Order.add(commandoItem.product);
				break;
			case 'remove':
				Order.remove({id:commandoItem.product.beer_id});
				break;
		}
	}
}]);


