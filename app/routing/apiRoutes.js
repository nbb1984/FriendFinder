
var friendsData = require("../data/friends.js");
var friendMatch = require("../data/friendMatch.js");


module.exports = function(app) {
    
    var finalFriend;
    var finalFriendPhoto;
    app.get("/api/newfriend", function(req, res) {
      res.json(friendsData);
    });

    app.post("/api/newfriend", function(req, res) {
      console.log("running");
      var numCompare = 0;
      var scoreDiff = 0;
      var newFriend = req.body;
      var closestMatch = 100;
      var closestFriend;
      console.log(newFriend);
      console.log('posted')

      var newScores = newFriend.scores
      friendsData.forEach(function(friend) {
        var user1 = [];
        var user2 = [];        
        numCompare++;
      	var totalDifference = 0;

      	for (i = 0; i < newScores.length; i++) {
      		var diff = Math.abs(newScores[i] - friend.scores[i]);
          user1.push(newScores[i]);
          user2.push(friend.scores[i]);
      		totalDifference += diff;
      	}
        
        console.log(user1);
        console.log(user2);
        console.log(totalDifference);

    	  if (totalDifference < closestMatch) {
    	  	closestMatch = totalDifference;
    	  	closestFriend = friend;
    	  }

        if (numCompare === friendsData.length) {
          finalFriend = closestFriend.name;
          finalFriendPhoto = closestFriend.photo;
          console.log("found match");
          console.log(finalFriend);
        }


      });

      friendsData.push(newFriend);
      friendMatch = {
        'name' : finalFriend,
        'photo' : finalFriendPhoto
      }
      console.log(friendsData);
    });
    
    app.get("/api/friendMatch", function(req, res) {
      res.json(friendMatch);
    });
}