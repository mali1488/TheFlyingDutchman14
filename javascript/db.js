function inventory() {
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
     
  }

});
});
}