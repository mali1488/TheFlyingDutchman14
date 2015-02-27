$(document).ready(function(){
    var url = window.location.href;
    var params = url.split("?");
    var drinkId = params[1].split("=")[1];
    url = "http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=" + drinkId;
    jQuery.get(url, function(data){
	var payload = data.payload;
	//TODO generate better html code
	var itemInfo = "<div style=\"position: relative;top:100px;\"><h2>" + payload[0].namn + "</h2><b>pris: </b>" + payload[0].prisinklmoms + "<br><b>typ: </b>" + payload[0].varugrupp +
	    "<br><b>land: </b>" + payload[0].ursprunglandnamn + "<br><b>alkohol: </b>" + payload[0].alkoholhalt + "<br><br>\
            <b>Om: </b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud</div>";
	
	var img = "<img src=\"../images/products/" + data.payload[0].nr + ".jpg\">";
	$('#itemPic').html(img);
	$('#itemInfo').html(itemInfo);
    });
});
