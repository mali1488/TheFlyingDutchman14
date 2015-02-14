/*
  If Substring is a proper prefix of String, it is added to BeerList.
*/
function searchString(String,SubString,BeerList){
    var length = String.length;
    var bool = true;
    String = String.toLowerCase();
    SubString = SubString.toLowerCase();
    for(var i = 0; i<length;i++){
	if(String == []) {
	    return;
	}
	if(String[i] === SubString[i]) {
	    continue;
	} else {
	    bool = false
	    break;
	}
    }
    if(bool === true) {
	BeerList.push(SubString);
    }
    return;
}

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
	    searchString(String, data.payload[i].namn,beerMatched);
	}
	var HTML = "";
	length = beerMatched.length;
	for(var i = 0; i<length; i++) {
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
