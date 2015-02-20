


function getAll(callback){
  var database_url = "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get";
  $.getJSON(database_url).done(function(data){
      callback(data);
  });
}

function renderOrder(order){
  var list = order.orders;
  var tmpl = $('#ordertmpl').html();
  var html = Mustache.to_html(tmpl, order);
  console.log(tmpl);
  $('#order').html(html);
}

(function(){
    var order = {"orders" : []};

  function addToOrder(id, amount, price){
    if(id > 0)
      order.orders.push({"id" : id, "amount" : amount, "price" : price });
    console.log("Order content: ", order);
  };

  $('#inventory').delegate('.addorderbtn', 'click' , function(){
      //console.log("Order button pressed!");
      var itemDiv = $(this).closest('div');
      var item_id= parseInt(itemDiv.attr('id'));
      var item_price = parseFloat(itemDiv.find('#price').text());
      addToOrder(item_id, 1, item_price);
      console.log("Order button pressed!", item_id);
      renderOrder(order);
  });
    $(document).ready(function(){
      getAll(function(data){
          var tmpl = $('#listtmpl').html();
          var html = Mustache.to_html(tmpl, data);
          $('#beerlist').html(html);
      });
  });

}());