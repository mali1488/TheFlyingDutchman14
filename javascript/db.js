function createColumn(mod, row, payload,type, string) {
    if(mod === 6) {
	$("#"+ type + "List").append("<div class=\"row\" id=\"" + type + "\"" + row + ">");
	mod = 0;
	row = row + 1;
    } else {
	$("#" + type + (row-1)).append(string);
	if (mod === 5) {
	    $("#"+ type + "List").append("</div>")
	}
    }
    return row,mod;
};

function inventory() {
    $(document).ready(
	function(){
	    var url = "http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=inventory_get";
	    var beerIdUrl = "<href=\"http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=";
	    jQuery.get(url, function(data){
		var length = data.payload.length;
		var item = "";
		var string = "";

		var beerMod = 6;
		var beerRowNr = 0;

		var wineMod = 6;
		var wineRowNr = 0;

		var freeMod = 6;
		var freeRowNr = 0;

		var ciderMod = 6;
		var ciderRowNr = 0;

		var otherMod = 6;
		var otherRowNr = 0;
		// TODO, when the databse is reset we need too change i from 17 to 0
		for(var i = 17; i < length; i++) {
		    jQuery.get("http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=" + data.payload[i].beer_id,
			       function(data){
				   item = "";
				   if(data.payload[0] != null) {
				       item = data.payload[0].varugrupp.toLowerCase();
				       string = "<div class=\"col-sm-2\"><a href=\"http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=" + data.payload[0].nr + "\" class=\"thumbnail\"><img src=\"../images/products/" + data.payload[0].namn.toLowerCase().split(' ').join('') +
					  "_thmb.jpg\"><p style=\"font-size:x-small\">" + data.payload[0].namn +"<br>" + data.payload[0].prisinklmoms + "</p></a></div>";
				   }
				   console.log( data.payload[0].namn.toLowerCase().split(' ').join(''));

				   if(item.search("öl") != -1){
				       if(beerMod === 6) {
					   $('#beerList').append("<div class=\"row\" id=\"beer" +beerRowNr + "\">");
					   beerMod = 0;
					   ++beerRowNr;
				       } else {
					   $('#beer' + (beerRowNr-1)).append(string);
					   if (beerMod === 5) {
					       $('#beerList').append("</div>")
					   }
				       }
				       ++beerMod;
				   } else if (item.search("alkoholfritt") != -1){

				   } else if(item.search("rött vin") != -1) {

				   } else if (item.search("vitt vin") != -1) {
				       
				   } else if (item.search("cider")) {
				       
				   } else {
				       
				   }
			       });
		}
	    });
	});
};

