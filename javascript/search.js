function getBeersFromFlicr(){
    var url = "http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=inventory_get";
    jQuery.get(url, function(data){
	var beerList = [];
	var length = data.payload.length;
	for(var i = 0; i<length; i++) {
	    beerList.push(data.payload[i].namn);
	}
	length = data.payload.length;
	console.log(length);

	var string = "";
	for(var i = 0; i<length;i++) {
	    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags="+ beerList[i] + "&format=json&tagmode=all&jsoncallback=?",
		      function(data){
			  if (data.items.length != 0 ){
			      $("#images").hide().html(data).fadeIn('fast');
			      string = string + "<a href=\"" +
				  data.items[0].media.m +
				  "\" download><img class=\"resize\" src=\"" +
				  data.items[0].media.m + "\"></a>";
			      $('.flicrPics').html(string);
			  }
		      });
	}
    });
}

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
	    // Ugly html code with link to google :S
	    HTML = HTML + "<li><a tabindex=\"-1\" href=\"https://www.google.se\"><div class=\"addorderbtn\"id=\"" + data.payload[i].beer_id + "\">" + beerMatched[i] +"</div></a><li>";
	}

	$('.dropdown-menu').html(HTML);
	if(HTML.length > 0) {
	    $('.dropdown-menu').show();
	} else {
	    $('.dropdown-menu').hide();
	}
    });   
}

$(document).ready(function(){

    $('.form-control').keyup(function(Key){
	var String = $(this).val();
	searchBar(String,"ervtod","ervtod");
    });
});
