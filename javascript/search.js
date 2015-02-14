/*
  This functions search the database API for a beer
  prefix that matches the String parameter.  
 */
function searchBar(String,Username,Password) {
    var url = "http://pub.jamaica-inn.net/fpdb/api.php?username=" + Username + "&password=" + Password + "&action=inventory_get";
    jQuery.get(url, function(data){
	var beerMatched = [];
	var length = data.payload.length;
	var subString;

	for(var i = 0; i<length; i++) {
	    subString = data.payload[i].namn;
	    
	    if(data.payload[i].namn === "" || data.payload[i].namn === []){
	    } else if(subString.toLowerCase().search(String.toLowerCase()) != -1) {
		beerMatched.push(subString);
	    }

	}

	var HTML = "";
	length = beerMatched.length;
	for(var i = 0; i<length; i++) {
	    // Ugly html code
	    HTML = HTML + "<a href=\"https://www.google.se\">" + beerMatched[i] +"</a><br>";
	}
	$('.ListOfBeers').html(HTML);
    });   
}

$(document).ready(function(){

    $('.form-control').keyup(function(Key){
	var String = $(this).val();
	searchBar(String,"ervtod","ervtod");
    }); 
});
