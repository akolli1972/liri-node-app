require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");

//console.log(keys);

var spotify = new Spotify(keys.spotify);
//take user input
let command = process.argv[2];
let query = process.argv[3];
decide();
//logic switch
function decide() {
  switch (command) {
    case "concert-this":
      bandsInTown();
      console.log("CONCERTS");
      break;
    case "spotify-this-song":
      console.log("spot");
      spotIt();
      break;
    case "movie-this":
      omdb();
      console.log("flicks");
      break;
    case "do-what-it-says":
      doIt();
      console.log("DOIT"); //use fs.readFile, then parse the file, and call decide with it
      break;
  }
}
function spotIt() {
  spotify.search({ type: "track", query: query || "Thriller" }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    let track = data.tracks.items[0];
    //console.log(JSON.stringify(track, null, 10));
    console.log(`The Artist is ${track.album.artists[0].name}`);
    console.log(`The Track's name is ${track.name}`);
    console.log(`The preview link is ${track.preview_url}`);
    console.log(`The album name is ${track.album.name}`);
  });
}
function doIt() {
  fs.readFile("random.txt", { encoding: "utf-8" }, function(err, data) {
    let array = data.split(","); //parse input
    command = array[0];
    query = array[1];
    decide();
  });
}
function bandsInTown() {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${query}/events?app_id=codingbootcamp`
    )
    .then(function(response) {
      // handle success
      concerts = response.data;
      //console.log(concerts);
      concerts.forEach(function(info) {
        console.log("------------------");
        console.log(info.venue.name);
        console.log(`${info.venue.city}, ${info.venue.country}`);
        console.log(moment(info.datetime).format("MM/DD/YYYY"));
      });
    });
}
// function omdb() {
//   axios
//     .get(`http://www.omdbapi.com/?apikey=trilogy&t=${query || "mr nobody"}`)
//     .then(function(response) {
//       // console.log(response.data);
//       console.log(response.data.Title);
//       console.log(response.data.Actors);
//       console.log(response.data.Rated);
//       console.log(response.data.Language);
//       console.log(response.data.Country);
//       console.log(response.data.imdbRating);
//       console.log(response.data.Plot);
//       console.log(response.data.Year);
//       //   console.log(response.data);
//     });
// }
