$(document).ready(function(){
  var $body = $('body');
  $body.html('');
  
  for (var i = 0; i < streams.home.length; i++) {
    var tweet = streams.home[i];
    var $tweet = $('<article></article>');
    $tweet.html('<a href="#">@' + tweet.user + '</a>: ' + tweet.message);
    $tweet.appendTo($body); 
  }
  
});
