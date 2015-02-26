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
		HTML = HTML + "<li id=\"" + data.payload[i].beer_id +"\" data-price=\"" + data.payload[i].pub_price + "\"><a data-id=\""+ data.payload[i].beer_id +"\" onclick=\"generateDrinkInfo(this)\" tabindex=\"-1\" href=\"#\"><div class=\"\" id=\"" + data.payload[i].beer_id + "\">" + subString +"</a><small id=\"price\"> : " + data.payload[i].pub_price + " kr</small><button class=\"btn btn-primary addorderbtn btn-sm pull-right\" >Add to chart</button></span></div><li>";
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
/*
function toString(payload){
    var string = "namn: " + payload[0].namn + ", pris: " + payload[0].prisinkmoms + ", typ: " + payload[0].varugrupp + "\n" +
	"land: " + payload[0].ursprungland + ", alkohol: " + payload[0].alkoholhalt;
    console.log("done");
    return string;
}
*/
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

