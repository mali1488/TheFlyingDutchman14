// Data service for products

angular.module('Dutchman')
.factory('Order', function ProductsFactory(){
	this.order = [];
	var self = this;
	return {
		all: function(){
			return self.order;
		},
		add: function(id){
			self.order.push({id : id, quantity: 1});
		},
		update: function(id){},
		delete: function(id){}
	}
});