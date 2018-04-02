// Include the request npm package
require('dotenv').config()
var request = require("request");
var keys = require("./keys.js");
//Spotify info
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
const fs = require('fs');

var param1 = process.argv[2]
var param2 = process.argv[3]



if (param1 == 'spotify-this-song') {
  spotifyThis();
}

if (param1 == 'movie-this'){
  omdb();
}
if (param1 == 'my-tweets'){
tweet();
}
if (param1 == 'do-what-it-says'){
  command();
  }

function spotifyThis() {
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: param2, limit: 1}, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

      console.log("Artist: " + data.tracks.items[0].artists[0].name)
      console.log("Title: " + data.tracks.items[0].name)
      console.log("Preview: " + data.tracks.items[0].href)
      console.log("Album: " + data.tracks.items[0].album.name)
  });
  
}


function omdb() {

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + param2 + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Release Year: " + JSON.parse(body).Year);
      console.log("iMDB Rating: " + JSON.parse(body).imdbRating);

      // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).metacriticRating);

      console.log("Produced in: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
    }

  });
}


function tweet() {
 
var client = new Twitter(keys.twitter);

var params = {screen_name: 'ssonsteg', count:20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for(i=0; i<tweets.length ; i++){
    // console.log(tweets[0]);
    console.log(tweets[i].created_at);
    console.log(tweets[i].text);
  }
  }
});

}


///// I wasn't able to repeast the spotify search to pull in the text from random.txt file


function command() {
  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: "random.txt" , limit: 1}, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

      console.log("Artist: " + data.tracks.items[0].artists[0].name)
      console.log("Title: " + data.tracks.items[0].name)
      console.log("Preview: " + data.tracks.items[0].href)
      console.log("Album: " + data.tracks.items[0].album.name)
  });
  
}