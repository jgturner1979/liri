require("dotenv").config();

var keys = require("./keys")
// console.log(keys);

var fs = require("fs");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require('moment');

function getConcert(singerName) {

    console.log(singerName);

    var query = "https://rest.bandsintown.com/artists/" + singerName + "/events?app_id=codingbootcamp";

    var request = require("request");

    request(query, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body));
            var data = JSON.parse(body);
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].venue.name + ", " + data[i].venue.city + ", " + moment(data[i].datetime).format("MM/DD/YYYY"));
            }
        };
    });
};

function getSong(songName) {

    if (!songName) {
        songName = "The Sign";

        spotify.search({
            type: 'track',
            query: songName
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            // console.log(data.tracks.items[0]);
            console.log("Artist(s): " + (data).tracks.items[0].album.artists[0].name);
            console.log("Song name: " + (data).tracks.items[0].name);
            console.log("Preview: " + (data).tracks.items[0].album.external_urls.spotify);
            console.log("Album: " + (data).tracks.items[0].album.name);

        });

    } else if (songName) {
        spotify.search({
            type: 'track',
            query: songName
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            // console.log(data.tracks.items[0]);
            console.log("Artist(s): " + (data).tracks.items[0].album.artists[0].name);
            console.log("Song name: " + (data).tracks.items[0].name);
            console.log("Preview: " + (data).tracks.items[0].album.external_urls.spotify);
            console.log("Album: " + (data).tracks.items[0].album.name);
        });
    };
};

function getMovie(movieName) {
    //Movie Request

    // console.log(movieName);

    if (!movieName) {
        movieName = "Mr. Nobody";
        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb.apikey;

        // Then create a request to the queryUrl

        var request = require("request");

        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // console.log(body);
                console.log("Title: " + JSON.parse(body).Title + "\n");
                console.log("Release Year: " + JSON.parse(body).Released + "\n");
                console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value + "\n");
                console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\n");
                console.log("Language: " + JSON.parse(body).Language + "\n");
                console.log("Plot: " + JSON.parse(body).Plot + "\n");
                console.log("Actors: " + JSON.parse(body).Actors + "\n");
            }
        });

    } else if (movieName) {

        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + keys.omdb.apikey;

        // Then create a request to the queryUrl

        var request = require("request");

        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // console.log(body);
                console.log("Title: " + JSON.parse(body).Title + "\n");
                console.log("Release Year: " + JSON.parse(body).Released + "\n");
                console.log("IMDB rating: " + JSON.parse(body).Ratings[0].Value + "\n");
                console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value + "\n");
                console.log("Country: " + JSON.parse(body).Country + "\n");
                console.log("Language: " + JSON.parse(body).Language + "\n");
                console.log("Plot: " + JSON.parse(body).Plot + "\n");
                console.log("Actors: " + JSON.parse(body).Actors + "\n");
            }
        });
    };

};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error){
            return console.log(error);
        }
        var command = data.split(", ");
        console.log(command);
        getCommand(command[0], command[1]);
    });
};

function getCommand(one, two) {
    if (one === "movie-this") {
        getMovie(two);
    } else if (one === "concert-this") {
        getConcert(two);
    } else if (one === "spotify-this-song") {
        getSong(two);
    } else if (one === "do-what-it-says") {
        doWhatItSays();
    };
};

getCommand(process.argv[2], process.argv[3])