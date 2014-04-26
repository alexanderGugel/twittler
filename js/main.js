$(document).ready(function(){
  var last = 0;
  var stream = streams.home;
  
  var changeStream = function (newStream) {
    $('.tweets').html('');
    last = 0;
    stream = newStream;
    displayTweets();
  }
  
  var displayTweets = function () {
    for (var i = last; i < stream.length; i++) {
      var tweet = stream[i];
      var $tweet = $('<article></article>');
      var msg ='<a class="user" data-user="' + tweet.user + '" href="#">@' + tweet.user + '</a>: ' + tweet.message;
      var time = '<br><small>' + moment(tweet.created_at).fromNow() + '</small>';
      $tweet.html(msg + time);
      $tweet.prependTo($('.tweets'));
    }
    last = i;
  }
  
  displayTweets();
  
  setInterval(function () {
    displayTweets();
  }, 60*60);
  
  $('.backHome').click(function () {
    changeStream(streams.home);
    $('h1').html('Home');
  });
  
  $('.tweets').on('click', 'a.user', function (event) {
    event.preventDefault();
    $('h1').html($(this).data('user'));
    changeStream(streams.users[$(this).data('user')]);
  });
  
  $('header .newTweet').click(function () {
    $('form').slideToggle();
  });
  
  $('form button').click(function (event) {
    event.preventDefault();
    visitor = $('input.visitor').val();
    if (!window.streams.users[visitor]) {
      window.streams.users[visitor] = [];      
    }
    var msg = $('input.msg').val();
    writeTweet(msg);
    displayTweets(); // update tweets
    $('input.msg').val('');
    $('form').slideToggle();
  });
  
});
