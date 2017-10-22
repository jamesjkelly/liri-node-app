console.log(` 
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
|thanks for checking out my node liri app      |
|----------------------------------------------|
|please npm install the following dependencies:|
|----------------------------------------------|
|twitter                                       |
|----------------------------------------------|
|spotify                                       |
|----------------------------------------------|                    
|request                                       |
|----------------------------------------------|    
|To run Liri please enter one of the following:|
|++++++++++++++++++++++++++++++++++++++++++++++|
|node liri.js my-tweets                        |
|----------------------------------------------|
|node liri.js spotify-this-song 'song title'   |
|----------------------------------------------|
|node liri.js movie-this 'movie title'         |
|----------------------------------------------|
|node liri.js do-what-it-says                  |
===============================================|
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
      writeLog(data);
      }
  });
};

// twitter
var spotify = function() {
      console.log( 'Sorry I cannot find this song:'  + process.argv[3]);
   
      }
   
var movie = function() { 
// Grab the movieName which will always be the third node argument.
var movieName = process.argv[3];

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {
   if (!error && response.statusCode === 200) {

       var data = []; 
        data.push({
            "Release Year: " : JSON.parse(body).Year,
            "Rated:" : JSON.parse(body).Rated,
            "Plot:" : JSON.parse(body).Plot,
            "Genre:" : JSON.parse(body).Genre,
            "Actors:" : JSON.parse(body).Actors,
            "Writer:" : JSON.parse(body).Writer,
            "Language:" : JSON.parse(body).Language,
            "Country:" : JSON.parse(body).Country,
           "Awards:" : JSON.parse(body).Awards,
           "Poster:" : JSON.parse(body).Poster,


        });
      }
      console.log(data);
      writeLog(data);
      
  });
};
   
function doWhatItSays(){
    fs.readFile('random.txt','utf8', function(err,data){
      if (err) { console.log(err) }
      else {
        console.log(data)
      }
    })
}

// 
var run = function(caseData, functionData) {
  switch (caseData) {
    case 'my-tweets':
      myTweets();
      break;
    case 'spotify-this-song':
      spotify(functionData);
      break;
    case 'movie-this':
      movie(functionData);
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
