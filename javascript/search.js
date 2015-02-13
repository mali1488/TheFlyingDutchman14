/*
  if Substring is a proper prefix of String, it is added to BeerList.
*/
function searchString(String,SubString,BeerList){
    var length = String.length;
    var bool = true;
    for(var i = 0; i<length;i++){
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
  This functions search the database API for a beer prefix that matches the String parameter.  
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
    });   
}
