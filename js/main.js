$(document).ready(function(){
  // See displayTweets() to understand how this variable is being used.
  var last = 0;

  // The current stream. Defaults to streams.home (home).
  var stream = streams.home;

  var changeStream = function(newStream) {
    // Remove old tweets from current timeline.
    $('.tweets').html('');
    last = 0;
    stream = newStream;
    displayTweets();
  }

  var displayTweets = function() {
    for (var i = last; i < stream.length; i++) {
      var tweet = stream[i];
      var $tweet = $('<article></article>');
      var msg ='<a class="user" data-user="' + tweet.user + '" href="#">@' + tweet.user + '</a>: ' + tweet.message;
      var time = '<br><small data-createdat="' + tweet.created_at + '">' + moment(tweet.created_at).fromNow() + '</small>';
      $tweet.html(msg + time);
      $tweet.prependTo($('.tweets'));
    }
    last = i;
  }

  displayTweets();

  setInterval(function() {
    displayTweets();
  }, 60);

  $('.backHome').click(function() {
    changeStream(streams.home);
    $('h1').html('Home');
  });

  $('.tweets').on('click', 'a.user', function(event) {
    event.preventDefault();
    var username = $(this).data('user');
    $('h1').html(username);
    changeStream(streams.users[username]);
  });

  $('header .newTweet').click(function() {
    $('form').slideToggle();
  });

  $('form button').click(function(event) {
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

  // Update the time dispalyed in the "* ago"-format.
  var updateAgo = function() {
    var agoTags = $('body').find('small');
    $.each(agoTags, function() {
      var createdAt = $(this).data('createdat');
      var updatedAgo = moment(createdAt, 'dddd, MMMM Do YYYY, h:mm:ss a').fromNow();
      $(this).text(updatedAgo);
    });
  };

  setInterval(updateAgo, 60);
});
