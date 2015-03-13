//This service controlls the undo redo functionalities on the order (OrderController.js and views/order/index.html)
angular.module('Dutchman')
.factory('Undo',['$rootScope',function UserFactory($rootScope){
	this.commandoUndoQueue = [];
	this.commandoRedoQueue = [];
	this.undoKeys = [];
	var self = this;
	return {
		addCommando: function(type,product){
			if(inArray(product,type, self.undoKeys) === 0){
				if(self.commandoUndoQueue.length < 5) {			
					self.commandoUndoQueue.push({type:type,product:product});
					self.undoKeys.push({type: type, id:product.beer_id});	
				} else {
					self.commandoUndoQueue.splice(0,1);
					self.commandoUndoQueue.push({type:type,product:product});
				}
			} else {
				console.log("Do nothing");
				console.log('This is commandoQueue: ',self.commandoUndoQueue);
			}
			//console.log(self.commandoQueue);
		},
		getUndo: function() {
			return self.commandoUndoQueue;
		},
		popUndo: function() {
			var length = self.commandoUndoQueue.length;
			if(length > 0) {
				var commandoItem = self.commandoUndoQueue[length-1];
				self.commandoRedoQueue.push(commandoItem);
				removeKey(commandoItem.type,commandoItem.product.beer_id,self.undoKeys);
				self.commandoUndoQueue.splice(length - 1 ,1);

				return commandoItem;
			} else {
				return [];
			}
		},
		popRedo: function() {
			var length = self.commandoRedoQueue.length;
			if(length > 0) {
				var commandoItem = self.commandoRedoQueue[length-1];
				self.commandoUndoQueue.push(commandoItem);
				self.commandoRedoQueue.splice(length - 1,1);
				return commandoItem;
			} else {
				return [];
			}
		}
	};

	// remove a object from the array.
	function removeKey(type, id, array) {
		var length = array.length;
		for(var i = 0; i < length; i++) {
			if(array[i].type.search(type) != -1) {
				if(array[i].id.search(id) != -1) {
					console.log('remove item from key: ', array[i]);
					array.splice(i,1);
				}
			} 
		}
	}

	// Check if object is in array array
	function inArray(product,type, array) {
		var length = array.length;
		for(var i = 0; i < length; i++) {
			if(array[i].type.search(type) != -1) {
				if(array[i].id.search(product.beer_id) != -1) {
					return 1;
				} else {
					return 0;
				}
			}
		}
		return 0;
	}

}]);