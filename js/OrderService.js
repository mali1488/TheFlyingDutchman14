	// Data service for products

angular.module('Dutchman')
.factory('Order', ['$rootScope','$http', function OrderFactory($rootScope, $http){
	this.order = {items : [], total : 0};
	this.receipt = {};


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

		checkout: function(callback){
			var dbUrl = "http://pub.jamaica-inn.net/fpdb/api.php?";
			var user = $rootScope.user.user_name;
			self.receipt.time = new Date();
			self.receipt.total = 0;
			self.receipt.items = self.order.items.slice();
			updateTotal(self.receipt);

			if(self.order.items.length > 0){
				for (var i = 0; i < self.order.items.length; i++) {
					var item = self.order.items[i];
					var url = dbUrl + "username=" + user + "&password=" + user +
							 "&action=purchases_append&beer_id=" + item.id; 
				
					$http.post(url, "").success(function(data){
						console.log("purchases success!", data);
					});
				};
			}
			callback();
			console.log("Receipt", self.receipt);
			self.order.items = [];
			updateTotal(self.order);
		},


		getReceipt: function(){
			return self.receipt;
		}
	}
}]);


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
		total +=parseFloat(order.items[i].product.price)*parseFloat(order.items[i].quantity);
	}
	order.total = total;
}
