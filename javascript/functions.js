function func(){
    var text = "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=162003";
    
    $.getJSON(text, function(data) {
        
        console.log(data.type);
        console.log("success");
    })
};

window.onload = func();