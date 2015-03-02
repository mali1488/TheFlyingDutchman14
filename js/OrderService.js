// Data service for products

angular.module('Dutchman')
.factory('Order', function ProductsFactory(){
	this.order = [];
	var self = this;
	return {
		all: function(){
			return self.order;
		},
		add: function(product){
			var i = exist(product.beer_id, self.order);
			if(i < 0){
				var newOrder = {id: product.beer_id, product: product, quantity : 1};
				self.order.push(newOrder);
			}
			else {
				self.order[i].quantity++;
			}
		},
		update: function(id){},
		delete: function(item){
			var i = exist(item.id, self.order);
			if(i >= 0){
				self.order.splice(i, 1);
			}
		},

		checkout: function(){
			if(self.order.lenght > 0){
				$http.post();
			}
		}
	}
});


function exist(id, list){
	var idx = -1;
	for(var i = 0; i < list.length;i++){
		if(id === list[i].id){
			idx = i;
			break;
		}
	}
	return idx;
}


