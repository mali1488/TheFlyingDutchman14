// Data service for products

angular.module('Dutchman')
.factory('Order', function ProductsFactory(){
	this.order = {items : [], total : 0};

	var self = this;
	return {
		all: function(){
			return self.order;
		},
		add: function(product){
			var i = exist(product.beer_id, self.order.items);
			if(i < 0){
				var newOrder = {id: product.beer_id, product: product, quantity : 1};
				self.order.items.push(newOrder);
			}
			else {
				var item = self.order.items[i];
				item.quantity++;
			}
			updateTotal(self.order);
		},
		update: function(item){
		},
		delete: function(item){
			var i = exist(item.id, self.order.items);
			if(i >= 0){
				self.order.items.splice(i, 1);
				updateTotal(self.order);
			}
		},

		dec: function(item){
			item.quantity--;
			if(item.quantity <= 0)
			{
				var i = exist(item.id, self.order.items);
				if(i >= 0){
					self.order.items.splice(i, 1);
				}
			}
			updateTotal(self.order);
		},
		inc: function(item){
			item.quantity++;
			updateTotal(self.order);
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


function updateTotal(order){
	var total = 0;
	for(var i = 0; i < order.items.length;i++){
		total += parseFloat(order.items[i].product.price)*parseFloat(order.items[i].quantity);
	}
	order.total = total;
}
