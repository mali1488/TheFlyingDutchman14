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

		var beerMod = 7;
		var beerRowNr = 0;

		var wineMod = 7;
		var wineRowNr = 0;

		var freeMod = 7;
		var freeRowNr = 0;

		var ciderMod = 7;
		var ciderRowNr = 0;

		var otherMod = 7;
		var otherRowNr = 0;
		// TODO, when the databse is reset we need too change i from 17 to 0
		for(var i = 17; i < length; i++) {
		    jQuery.get("http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=" + data.payload[i].beer_id,
			       function(data){
				   item = "";
				   if(data.payload[0] != null) {
				       item = data.payload[0].varugrupp.toLowerCase();
				       console.log(data.payload[0]);
				       string = "<div class=\"col-sm-2\"><a href=\"http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=beer_data_get&beer_id=" + data.payload[0].nr + "\" class=\"thumbnail\"><img src=\"../images/products/" + data.payload[0].nr +
					  "_thmb.jpg\"><p style=\"font-size:x-small\">" + data.payload[0].namn +"<br>" + data.payload[0].prisinklmoms + "</p></a></div>";
				   }
				   console.log( data.payload[0].namn.toLowerCase().split(' ').join(''));

				   if(item.search("öl") != -1){
				       if(beerMod === 7) {
					   $('#beerList').append("<div class=\"row\" id=\"beer" +beerRowNr + "\">");
					   beerMod = 0;
					   ++beerRowNr;
				       } else {
					   $('#beer' + (beerRowNr-1)).append(string);
					   if (beerMod === 6) {
					       $('#beerList').append("</div>")
					   }
				       }
				       ++beerMod;
				   } else if (item.search("alkoholfritt") != -1){
				       if(freeMod === 7) {
					   $('#alkoholfreeList').append("<div class=\"row\" id=\"alkoholfree" +freeRowNr + "\">");
					   freeMod = 0;
					   ++freeRowNr;
				       } else {
					   $('#alkoholfree' + (freeRowNr-1)).append(string);
					   if (freeMod === 6) {
					       $('#alkoholfreeList').append("</div>")
					   }
				       }
				       ++freeMod;
				   } else if(item.search("rött vin") != -1) {
				       if(wineMod === 7) {
					   $('#wineList').append("<div class=\"row\" id=\"wine" +wineRowNr + "\">");
					   wineMod = 0;
					   ++wineRowNr;
				       } else {
					   $('#wine' + (wineRowNr-1)).append(string);
					   if (wineMod === 6) {
					       $('#wineList').append("</div>")
					   }
				       }
				       ++wineMod;
				   } else if (item.search("vitt vin") != -1) {
				       if(wineMod === 7) {
					   $('#wineList').append("<div class=\"row\" id=\"wine" + wineRowNr + "\">");
					   wineMod = 0;
					   ++wineRowNr;
				       } else {
					   $('#wine' + (wineRowNr-1)).append(string);
					   if (wineMod === 6) {
					       $('#wineList').append("</div>")
					   }
				       }
				       ++wineMod;
				   } else if (item.search("cider")) {
				       if(ciderMod === 7) {
					   $('#ciderList').append("<div class=\"row\" id=\"cider" + ciderRowNr + "\">");
					   ciderMod = 0;
					   ++ciderRowNr;
				       } else {
					   $('#cider' + (ciderRowNr-1)).append(string);
					   if (ciderMod === 6) {
					       $('#ciderList').append("</div>")
					   }
				       }
				       ++ciderMod;
				   } else {
				        if(otherMod === 7) {
					   $('#otherList').append("<div class=\"row\" id=\"other" + otherRowNr + "\">");
					   otherMod = 0;
					   ++otherRowNr;
				       } else {
					   $('#other' + (otherRowNr-1)).append(string);
					   if (otherMod === 6) {
					       $('#otherList').append("</div>")
					   }
				       }
				       ++otherMod;
				   }
			       });
		}
	    });
	});
};


//This function displays all registered users and their balance. 


function reg_user(){//creates a table of registered users
	$("document").ready(function(data){
		reverse_user();
	});
}

function link_row(){//creates a link out of an entire table row, instead of just one cell
	$('tbody tr').click( function() {
    	window.location = $(this).find('a').attr('href');
	}).hover( function() {
    $(this).toggleClass('hover');
	});
}

function reverse_user(){//displays users in	reverse order, starting with highest balance then going down to negative balance
	var url="http://pub.jamaica-inn.net/fpdb/api.php?username=ervtod&password=ervtod&action=iou_get_all";
	jQuery.get(url, function(data){
		var num = data.payload.length;
		reverse = true;

		var i = num;
		while (i--){
			if(data.payload[i].username == null || data.payload[i].username == "") continue; //skips users that have no username, can be extended to skip if any of the fields are missing
			$(".user_list").append("<tr><td><a href=\"user_profile.html\">"
			 + data.payload[i].username + "</a></td><td>" + data.payload[i].first_name + "</td><td>"
			  + data.payload[i].last_name  + "</td><td>" + data.payload[i].assets  + " SEK</td><tr>");			
		}
		link_row();
	});
}

