/*function inventory() {
  $(document).ready(function(){
  var url = "http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=inventory_get";
  jQuery.get(url, function(data){
  var i = 17;
  
  while ( i) {
  if (i%2==0){
  $('#beerList').append('<a href="http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=' + data.payload[i].beer_id + '"><li id="li'+ i +'" /></a>');
  $("#li"+ i).append(data.payload[i].namn + " " +  " " +data.payload[i].price + " SEK"  ).css({"background-color" : "#DEDEDE"}); 
  ++i;
  } else {
  $('#beerList').append('<a href="http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=' + data.payload[i].beer_id + '"><li id="li'+ i +'" /></a>');
  $("#li"+ i).append(data.payload[i].namn + ", " +  " " +data.payload[i].price + " SEK"  ); 
  ++i;
  }               
  };
  });
  });
  }*/

function inventory() {
    $(document).ready(
	function(){
	    var url = "http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=inventory_get";
	    jQuery.get(url, function(data){
		var length = data.payload.length;
		var item = "";
		var string = "";
		// TODO, when the databse is reset we need too change i from 17 to 0
		for(var i = 17; i < length; i++) {
		    jQuery.get("http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=" + data.payload[i].beer_id,
			       function(data){
				   item = "";
				   if(data.payload[0] != null) {
				       item = data.payload[0].varugrupp.toLowerCase();
				       string ="<a href=\"http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=" +
					   data.payload[0].nr + "\">" + data.payload[0].namn + "</a><br>";
				   }
				   if (item.search("alkoholfritt") != -1) {
				       $('#alkoholfreeList').append(string);
				   } else if(item.search("rött vin") != -1) {
				       $('#wineList').append(string);
				   } else  if (item.search("öl") != -1) {
				       $('#beerList').append(string);
				   } else if (item.search("vitt vin") != -1) {
				       $('#wineList').append(string);	    
				   } else if (item.search("cider")) {
				       $('#ciderList').append(string);	   
				   } else {
				       $('#otherList').append(string);
				   }
			       });
		}
	    });
	});
};

