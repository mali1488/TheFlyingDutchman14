angular.module('Dutchman')

.factory('Undo',['$rootScope',function UserFactory($rootScope){
	this.commandoUndoQueue = [];
	this.commandoRedoQueue = [];
	this.keys = [];
	var self = this;
	return {
		addCommando: function(type,product){
			if(self.commandoUndoQueue.length < 5) {
				self.commandoUndoQueue.push({type:type,product:product});
			} else {
				self.commandoUndoQueue.splice(0,1);
				self.commandoUndoQueue.push({type:type,product:product});
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
				self.commandoUndoQueue.splice(0,1);
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
				self.commandoRedoQueue.splice(0,1);
				return commandoItem;
			} else {
				return [];
			}
		}
	};

}]);