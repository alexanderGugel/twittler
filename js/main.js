$(document).ready(function(){
  var $body = $('body');
  $body.html('');
  
  
  for (var i = 0; i < streams.home.length; i++) {
    var tweet = streams.home[i];
    var $tweet = $('<article></article>');
    var tweet ='<a href="#">@' + tweet.user + '</a>: ' + tweet.message;
    var time = '<br><small>' + moment(tweet.created_at).fromNow() + '</small>';
    $tweet.html(tweet + time);
    $tweet.appendTo($body);
  }
  
});
