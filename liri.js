var keys = require('./keys.js');

var userRequest = process.argv[2]; 

var Twitter = require('twitter');

var Spotify = require('node-spotify-api');

var fs = require('fs');

var request = require('request');


function twittyTwenty() {
	var client = new Twitter(keys.twitterKeys);
	var params = {
		screen_name: 'jesus'
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error && response.statusCode === 200) {
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].text);
			} 
		} 

	})
}

function spotifyPlay() {

	var spotify = new Spotify({
    	id: "43d784cfcc0545e398298a658026dc49",
  		secret: "ef4e408c593443a2937a4312f7156cd6"
	}); 

	var params = '';

	if (process.argv[3] === undefined) {
 		params = "the sign";
 	} else {
 		var params = process.argv.slice(3).join(" ");
 		console.log(params);
 	}

 	// var params = process.argv.slice(3).join(" ");
 	// console.log(params);



 	
	spotify.search({ type: 'track', query: params, limit: 3 }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;  
    }
    else{
    var songInfo = data.tracks.items;
    
    for (var i = 0; i < songInfo.length; i++) {
    	for (var j = 0; j < songInfo[i].artists.length; j++) {
    		console.log("");
    		console.log("artist: ", JSON.stringify(songInfo[i].artists[j].name, null, 2));
	    	console.log("")
	    	console.log("------------------------------")
    	}
    	
    	
    	console.log("song: ", JSON.stringify(songInfo[i].name, null, 2));
    	console.log("")
    	console.log("------------------------------")
    	console.log("album: ", JSON.stringify(songInfo[i].album.name, null, 2));
    	console.log("")
    	console.log("------------------------------")
    	console.log("preview: ", JSON.stringify(songInfo[i].preview_url, null, 2));
    	console.log("")
    }
    } 
  	});

};

function movieInfo() {

	var movieName = '';

	if (process.argv[3] === undefined) {
		movieName = "Mr Nobody";
	} else {
		movieName = process.argv.slice(3).join(" ");
	}

	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			console.log('');
			console.log(JSON.parse(body).Title);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Year);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).imdbRating);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Ratings[0].Value);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Country);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Language);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Plot);
			console.log('');
			console.log('----------------');
			console.log(JSON.parse(body).Actors);
			console.log('');
			console.log('----------------');
		} else if (error) {
			console.log(error);
		}
	});
}

function doinIt() {
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
			return console.log(error);
		}

		console.log(data);

		var dataArr = data.split(",");

		// console.log(dataArr);
	})
}
 

switch (userRequest) {

	case "my-tweets":
		twittyTwenty();
		break;

	case "spotify-this-song":
		spotifyPlay();
		break;

	case "movie-this":
		movieInfo();
		break;

	case "do-what-it-says":
		doinIt();
		break;

	default:
		console.log("Please choose from your options: 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'");
}


