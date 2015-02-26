$(document).ready(function(){
    var url = window.location.href;
    var params = url.split("?");
    var drinkId = params[1].split("=")[1];
    url = "http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=" + drinkId;
    jQuery.get(url, function(data){
	var payload = data.payload;
	//TODO generate better html code
	var string = "namn: " + payload[0].namn + ", pris: " + payload[0].prisinklmoms + ", typ: " + payload[0].varugrupp + "\n" +
	    "land: " + payload[0].ursprungland + ", alkohol: " + payload[0].alkoholhalt;
	console.log(string);
	$('#test').html(string);
    });
});
