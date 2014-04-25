$(document).ready(function(){
  var last = 0;
  var stream = streams.home;
  
  var changeStream = function (newStream) {
    last = 0;
    stream = newStream;
  }
  
  var displayTweets = function () {
    for (var i = last; i < stream.length; i++) {
      var tweet = streams.home[i];
      var $tweet = $('<article></article>');
      var msg ='<a data-user="' + tweet.user + '" href="#">@' + tweet.user + '</a>: ' + tweet.message;
      var time = '<br><small>' + moment(tweet.created_at).fromNow() + '</small>';
      $tweet.html(msg + time);
      $tweet.prependTo($('.tweets'));
    }
    last = i;
  }
  
  setInterval(function () {
    displayTweets();
  }, 60);
  
});
