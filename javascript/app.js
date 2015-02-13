


function getAll(callback){
  var database_url = "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get";
  $.getJSON(database_url).done(function(data){
      callback(data);
  });
}


  $(document).ready(function(){
      getAll(function(data){
          var tmpl = $('#listtmpl').html();
          console.log(tmpl);
          var html = Mustache.to_html(tmpl, data);
          $('#beerlist').html(html);
      });
  });
