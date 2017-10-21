console.log(`
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|thanks for checking out my node liri app      |
|----------------------------------------------|
|please npm install the following dependencies:|
|----------------------------------------------|
|twitter                                       |
|-------                                       |
|spotify                                       |
|-------                                       |
|request                                       |
|-------                                       |
|ENJOY!                                        |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
`);
// dependencies
var dataKeys = require("./keys.js");
var fs = require('fs'); 
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request')

// write to log
var writeLog = function(data) {
  fs.appendFile("log.txt", '\r\n\r\n');
  fs.appendFile("log.txt", JSON.stringify(data), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("wrote to log!");
  });
}

// twitter
var myTweets = function() {
var client = new twitter(dataKeys.twitterKeys);
var params = { screen_name: 'jkmacman', count: 10 };
client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      var data = []; 
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



var pick = function(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      myTweets();
      break;
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    case 'movie-this':
      getMeMovie(functionData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('LIRI doesn\'t know that');
  }
}



var run = function(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      myTweets();
      break;
    case 'spotify-this-song':
      getMeSpotify(functionData);
      break;
    case 'movie-this':
      getMeMovie(functionData);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.log('Liri not sure, please try again');
  }
}

//run
var runLiri = function(argOne, argTwo) {
  run(argOne, argTwo);
};
runLiri(process.argv[2], process.argv[3]);