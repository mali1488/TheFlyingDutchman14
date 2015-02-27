function searchBar(String,Username,Password) {
    var url = "http://pub.jamaica-inn.net/fpdb/api.php?username=" + Username + "&password=" + Password + "&action=inventory_get";
    jQuery.get(url, function(data){
	var beerMatched = [];
	var length = data.payload.length;
	var subString;
	var HTML = "";
	var drinkHtml = "drink_info.html";
	for(var i = 0; i<length; i++) {
	    subString = data.payload[i].namn;
	    if(subString === "" || subString === []){
	    } else if(subString.toLowerCase().search(String.toLowerCase()) != -1) {
		HTML = HTML + "<li id=\"" + data.payload[i].beer_id +"\" data-price=\"" + data.payload[i].pub_price + "\"><a data-id=\""+ data.payload[i].beer_id +"\" onclick=\"generateDrinkInfo(this)\" tabindex=\"-1\" href=\"#\">\
<img style=\"height:60px;width:30px\" src=\"../images/products/" + data.payload[i].beer_id + "_thmb.jpg\"></a>\
<div class=\"\" id=\"" + data.payload[i].beer_id + "\">" + subString +"<small id=\"price\"> : " + data.payload[i].pub_price + " kr<button class=\"btn  addorderbtn btn-sm pull-right\" >Add to chart</button></small></span></div><li>";
	    }

	}
	$('.dropdown-menu').html(HTML);
	if(HTML.length > 0) {
	    $('.dropdown-menu').show();
	} else {
	    $('.dropdown-menu').hide();
	}
    });   
}

function generateDrinkInfo(id){
    var idx = $(id);
    var drinkID = idx.attr('data-id');
    jQuery.get("http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=" + drinkID,function(data){
	// open new page for the specific beer
	window.location.href = "file:///Users/mattiaslinder/Desktop/Datavetenskap/Gra%CC%88nnsnittsprogramering%201/project/TheFlyingDutchman14/html/drink_info.html?id=" + drinkID;
    });
}

$(document).ready(function(){

    $('.form-control').keyup(function(Key){
	var String = $(this).val();
	searchBar(String,"ervtod","ervtod");
    });
});

