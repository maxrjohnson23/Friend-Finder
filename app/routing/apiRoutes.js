const apiRoutes = require("express").Router();
const friendList = require("../data/friends");

apiRoutes.get("/friends", (req, res) => {
    res.send(friendList);
});

apiRoutes.post("/friends", (req, res) => {
    const userInfo = req.body;

    if (userInfo) {
        let closestFriend = findClosestMatch(userInfo);
        friendList.push(userInfo);
        res.send(closestFriend);

    } else {
        res.status(500).send("Invalid user data");
    }


});


function findClosestMatch(userInfo) {
    let userScores = userInfo.userScores;

    // Initialize closest match
    let closestMatch = friendList[0];
    let closestScore = Infinity;

    friendList.forEach(friend => {
        // Don't match returning user with themselves
        if (userInfo.name !== friend.name) {
            let totalDifference = calcScoreDifference(friend.scores, userScores);
            if (totalDifference < closestScore) {
                closestScore = totalDifference;
                closestMatch = friend;
            }
        }
    });

    return closestMatch;
}

function calcScoreDifference(friendScores, userScores) {
    // Map and reduce user scores to the total difference, lower is a closer friend match
    let scoreDifferences = friendScores.map((score, index) => {
        return Math.abs(score - userScores[index]);
    });
    return scoreDifferences.reduce((curr, next) => curr + next, 0);
}

module.exports = apiRoutes;