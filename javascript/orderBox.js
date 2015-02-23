$(document).ready(function(){
       $(window).scroll(function() { 
	var top = $('#beerListOffset').offset().top -  parseFloat($('#beerListOffset').css('margin-top').replace(/auto/,0));
	var y = $(this).scrollTop();

	if(y < top) {
	} else {
	    console.log("do something");
	    $('#orderlist').css('top', $(this).scrollTop() + 20);
	}
    });
});
