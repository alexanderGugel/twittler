$(document).ready(function(){
  var $body = $('body');
  $body.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<article></article>');
    $tweet.html('<a href="#">@' + tweet.user + '</a>: ' + tweet.message);
    $tweet.appendTo($body);
    index -= 1;
  }

});
