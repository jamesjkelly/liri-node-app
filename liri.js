var dataKeys = require("./.gitignore.js");
var fs = require('fs'); //file system
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request')

// twitter
var getTweets = function() {
var client = new twitter(dataKeys.twitterKeys);
var params = { screen_name: 'jkmacman', count: 10 };

client.get('statuses/user_timeline', params, function(error, tweets, response) {

    if (!error) {
      var data = []; //empty array to hold data
      for (var i = 0; i < tweets.length; i++) {
        data.push({
            'created at: ' : tweets[i].created_at,
            'Tweets: ' : tweets[i].text,
        });
      }
      console.log(data);
      }
  });
};
const myTweets=  getTweets();
