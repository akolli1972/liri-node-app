require("dotenv").config();
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
console.log(keys);

var spotify = new Spotify(keys.spotify);

let command = process.argv[2];
let query = process.argv[3];
decide();
function decide() {
  switch (command) {
    case "concert-this":
      console.log("CONCERTS");
      break;
    case "spotify-this-song":
      console.log("spot");
      spotIt();
      break;
    case "movie-this":
      console.log("flicks");
      break;
    case "do-what-it-says":
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
    console.log(JSON.stringify(data.tracks.items[0], null, 10));
    console.log(`The Artist is ${track.album.artists[0].name}`);
  });
}
//var spotify = new Spotify(keys.spotify);
